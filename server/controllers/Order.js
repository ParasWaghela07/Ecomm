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
            userId: userid,
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

exports.cancelOrder=async(req,res)=>{
    try{
        const {orderId} = req.body;
        const userId = req.payload.id;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const user = await User.findOne({firebaseUid:userid});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orderIndex = user.order.indexOf(orderId);
        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
        }

        user.order.splice(orderIndex, 1);
        await user.save();

        await Order.findByIdAndUpdate({orderId}, { status: 'Cancelled' });

        res.status(200).json({ success:true,message: 'Order cancelled successfully' });
    }
    catch(e){
        console.error("Error cancelling order:", e);
        res.status(500).json({ success:false,message: "Internal server error" });
    }
}

exports.getMyOrders=async(req,res)=>{
    try{
        const userId = req.payload.id;

        const user = await User.findOne({firebaseUid:userId}).populate('order');
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
        const orders = await Order.find().populate('userId', 'username email').populate('products.product', 'name price');

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