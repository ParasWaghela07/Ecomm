const User=require('../models/User');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Please provide productId and quantity",
            });
        }

        // First find the user without populating
        let user = await User.findOne({ firebaseUid: req.payload.uid });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const existingProductIndex = user.cart.findIndex(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingProductIndex > -1) {
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity: quantity, size: size });
        }

        // Save the user first
        await user.save();

        // Then find the user again with populated cart
        user = await User.findOne({ firebaseUid: req.payload.uid })
            .populate('cart.product');

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart: user.cart,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error while adding to cart",
        });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;

        // Input validation
        if (!productId || !quantity || !size) {
            return res.status(400).json({
                success: false,
                message: "Please provide productId, quantity, and size",
            });
        }

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive number",
            });
        }

        // Find user without populating cart for better performance
        const user = await User.findOne({ firebaseUid: req.payload.uid });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Find item in cart
        const existingProductIndex = user.cart.findIndex(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        // Update or remove item
        if (user.cart[existingProductIndex].quantity <= quantity) {
            user.cart.splice(existingProductIndex, 1);
        } else {
            user.cart[existingProductIndex].quantity -= quantity;
        }

        await user.save();

        // Optionally populate here if you need product details in response
        const updatedUser = await User.findById(user._id).populate('cart.product');

        return res.status(200).json({
            success: true,
            message: "Product updated in cart",
            cart: updatedUser.cart
        });
    } catch (e) {
        console.error("Error deleting from cart:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting from cart",
        });
    }
}

exports.getCartItems=async(req,res)=>{
    try{
        const user=await User.findOne({firebaseUid:req.payload.uid}).populate('cart.product');

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        if(user.cart.length === 0){
            return res.status(200).json({
                success:true,
                message:"Cart is empty",
                cart: [],
            });
        }

        return res.status(200).json({
            success:true,
            message:"Cart items fetched successfully",
            cart:user.cart,
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal server error while fetching cart items",
        });
    }
}