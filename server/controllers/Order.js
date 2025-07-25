const User=require('../models/User');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try{
        const {address}= req.body;
        const userid=req.payload.uid;

        const user=await User.findOne({firebaseUid:userid}).populate('cart.product');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order=await Order.create({
            userId: user._id,
            products: user.cart,
            totalAmount: user.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
            shippingAddress: address || user.address,
        })

        user.order.push(order._id);
        user.cart = [];
        await user.save();

        res.status(201).json({ success:true,message: 'Order created successfully', order });
    }
    catch(e){
        console.error("Error creating order:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.payload.uid;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orderIndex = user.order.findIndex(id => id.toString() === orderId.toString());
        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
        }

        user.order.splice(orderIndex, 1);
        await user.save();

        // Fix: Pass orderId directly instead of an object
        await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' });

        res.status(200).json({ success: true, message: 'Order cancelled successfully' });
    } catch (e) {
        console.error("Error cancelling order:", e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
exports.getMyOrders=async(req,res)=>{
    try{
        const userId = req.payload.uid;

        const user = await User.findOne({ firebaseUid: userId })
            .populate({
                path: 'order',  // assuming your user schema has an 'orders' array field
                populate: {
                path: 'products.product',  // assuming your Order schema has 'products' array with 'product' references
                model: 'Product'  // name of your Product model
                }
            });

        if (!user) {
            return res.status(404).json({ success:false,message: 'User not found' });
        }

        if (user.order.length === 0) {
            return res.status(200).json({ success:true,message: 'No orders found', orders: [] });
        }

        res.status(200).json({ success:true,message: 'Orders fetched successfully', orders: user.order });
    }
    catch(e){
        console.error("Error fetching orders:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username email').populate('products.product');

        if (orders.length === 0) {
            return res.status(200).json({ success:true,message: 'No orders found', orders: [] });
        }

        res.status(200).json({ success:true,message: 'Orders fetched successfully', orders });
    } catch (e) {
        console.error("Error fetching all orders:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.approveOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ success:false,message: 'Order ID is required' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success:false,message: 'Order not found' });
        }

        order.status = 'Out for delivery';
        await order.save();

        setTimeout(async () => {
            order.status = 'Delivered';
            await order.save();
        }, 30*60 * 1000);

        res.status(200).json({ success:true,message: 'Order approved successfully', order });
    } catch (e) {
        console.error("Error approving order:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.getAddress=async(req,res)=>{
    try{
        const userId = req.payload.uid;

        const user = await User.findOne({firebaseUid:userId});
        if (!user) {
            return res.status(404).json({ success:false,message: 'User not found' });
        }

        if (!user.address) {
            return res.status(404).json({ success:false,message: 'Address not found' });
        }
        res.status(200).json({ success:true,message: 'Address fetched successfully', address: user.address });
    }
    catch(e){
        console.error("Error fetching address:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.saveAddress=async(req,res)=>{
    try{
        const {address} = req.body;
        const userId = req.payload.uid;

        if (!address) {
            return res.status(400).json({ success:false,message: 'Address is required' });
        }

        const user = await User.findOne({firebaseUid:userId});
        if (!user) {
            return res.status(404).json({ success:false,message: 'User not found' });
        }

        user.address = address;
        await user.save();

        res.status(200).json({ success:true,message: 'Address saved successfully', address: user.address });
    }
    catch(e){
        console.error("Error saving address:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.getOrderById=async(req,res)=>{
    try{
        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({ success:false,message: 'Order ID is required' });
        }

        const order = await Order.findById(orderId).populate('userId', 'username email').populate('products.product');

        if (!order) {
            return res.status(404).json({ success:false,message: 'Order not found' });
        }

        res.status(200).json({ success:true,message: 'Order fetched successfully', order });
    }
    catch(e){
        console.error("Error fetching order by ID:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}