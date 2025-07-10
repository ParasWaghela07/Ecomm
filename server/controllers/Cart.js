const User=require('../models/User');

exports.addToCart=async(req,res)=>{
    try{
        const {productId,quantity}=req.body;

        if(!productId || !quantity){
            return res.status(400).json({
                success:false,
                message:"Please provide productId and quantity",
            });
        }

        const user=await User.findById(req.payload.id).populate('cart.product');

        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }


        const existingProductIndex = user.cart.findIndex(item => item.product._id.toString() === productId);

        if(existingProductIndex > -1){
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            user.cart.push({product: productId, quantity: quantity});
        }

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Product added to cart successfully",
            cart:user.cart,
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal server error while adding to cart",
        });
    }
}

exports.deleteFromCart=async(req,res)=>{
    try{
        const {productId,quantity}=req.body;

        if(!productId || !quantity){
            return res.status(400).json({
                success:false,
                message:"Please provide productId",
            });
        }

        const user=await User.findById(req.payload.id).populate('cart.product');
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        const existingProductIndex = user.cart.findIndex(item => item.product._id.toString() === productId);


        if (user.cart[existingProductIndex].quantity <= quantity) {
            user.cart.splice(existingProductIndex, 1);
        } else {
            user.cart[existingProductIndex].quantity -= quantity;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product updated in cart",
            cart: user.cart
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal server error while deleting from cart",
        });
    }
}

exports.getCartItems=async(req,res)=>{
    try{
        const user=await User.findById(req.payload.id).populate('cart.product');

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