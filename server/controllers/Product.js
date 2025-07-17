const Product = require('../models/Product');
const Category = require('../models/Category');

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, category} = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
            category
        });

        await newProduct.save();

        const exist=await Category.findOne({ name: category });
        if (!exist) {
            const newCategory = new Category({
                name: category,
                products: [newProduct._id],
                imageUrl: "default_image_url.jpg"
            });
            await newCategory.save();
        }
        else {
            exist.products.push(newProduct._id);
            await exist.save();
        }

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while adding product"
        });
    }
}

exports.editProduct = async (req, res) => {
    try{
        const { productId, name, description, price, imageUrl, category,quantity,offer } = req.body;

        
        const oldProduct = await Product.findById(productId);
        const oldCategoryName = oldProduct.category;

        const product = await Product.findByIdAndUpdate(productId, {name, description, price, imageUrl, category, quantity, offer}, { new: true });

    // If category has changed, remove product from old category
        if (oldCategoryName && oldCategoryName !== category) {
            const oldCategory = await Category.findOne({ name: oldCategoryName }).populate('products');
            if (oldCategory) {
                oldCategory.products = oldCategory.products.filter(
                    (id) => id.toString() !== productId
                );
                await oldCategory.save();
            }
        }
        if(category){
            const exist = await Category.findOne({ name: category }).populate('products');
            if (!exist) {
                const newCategory = new Category({
                    name: category,
                    products: [product._id],
                    imageUrl: "default_image_url.jpg"
                });
                await newCategory.save();
            } else {
                if (!exist.products.includes(product._id)) {
                    exist.products.push(product._id);
                    await exist.save();
                }
            }
        }

        return res.status(200).json({
            success: true,
            message: "Product edited successfully",
            product: product
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error while editing product"
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const { productId } = req.body;

        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        const category = await Category.findOne({ name: product.category }).populate('products');
        if (category) {
            category.products = category.products.filter(id => id.toString() !== productId);
            await category.save();

            if (category.products.length === 0) {
                await Category.findByIdAndDelete(category._id);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting product"
        });
    }
}