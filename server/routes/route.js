const express = require('express');
const router = express.Router();
const { SendOtp ,register,login,AdminSignup, AdminLogin} = require('../controllers/Auth');
const {addProduct, editProduct,deleteProduct}=require('../controllers/Product');
const { isUser, isAdmin } = require('../middlewares/Auth');
const {addToCart,deleteFromCart,getCartItems}= require('../controllers/Cart');
const {createOrder,cancelOrder,getMyOrders,getAllOrders,approveOrder} = require('../controllers/Order');

router.post('/SendOtp', SendOtp);
router.post('/register', register);
router.post('/login', login);
router.post('/AdminLogin', AdminLogin); // Assuming AdminLogin uses the same login function
// router.post('/AdminSignup', AdminSignup);

router.post('/addProduct', isAdmin,addProduct);
router.post('/editProduct',isAdmin, editProduct); 
router.post('/deleteProduct', isAdmin, deleteProduct);

router.post('/addtoCart', isUser,addToCart);
router.post('/deleteFromCart', isUser,deleteFromCart);
router.get('/getCartItems', isUser,getCartItems);

router.post('/createOrder', isUser, createOrder);
router.post('/cancelOrder', isUser, cancelOrder);
router.get('/getMyOrders', isUser, getMyOrders);
router.get('/getAllOrders', isAdmin,getAllOrders);
router.post('/approveOrder', isAdmin, approveOrder);


module.exports = router;