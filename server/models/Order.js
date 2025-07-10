const mongoose= require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Preparing' },
    shippingAddress: { type: String, required: true },
    expectedDeliveryDate: { type: Date , default: () => new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;