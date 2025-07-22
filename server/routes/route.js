const express = require('express');
const router = express.Router();
const { SendOtp ,register,login,MatchOtp, AdminLogin} = require('../controllers/Auth');
const {addProduct, editProduct,deleteProduct,getAllProducts,getAllCategories}=require('../controllers/Product');
const { isUser, isAdmin } = require('../middlewares/Auth');
const {addToCart,deleteFromCart,getCartItems}= require('../controllers/Cart');
const {createOrder,cancelOrder,getMyOrders,getAllOrders,approveOrder, getAddress, saveAddress} = require('../controllers/Order');

router.post('/SendOtp', SendOtp);
router.post('/MatchOtp', MatchOtp);
router.post('/register', register);
router.post('/login', login);
router.post('/AdminLogin', AdminLogin);


router.post('/addProduct', isAdmin,addProduct);
router.post('/editProduct',isAdmin, editProduct); 
router.post('/deleteProduct', isAdmin, deleteProduct);
router.get('/getAllProducts',getAllProducts);
router.get('/getAllCategories', getAllCategories);

router.post('/addtoCart', isUser,addToCart);
router.post('/deleteFromCart', isUser,deleteFromCart);
router.get('/getCartItems', isUser,getCartItems);

router.post('/createOrder', isUser, createOrder);
router.post('/cancelOrder', isUser, cancelOrder);
router.get('/getMyOrders', isUser, getMyOrders);
router.get('/getAllOrders', isAdmin,getAllOrders);
router.post('/approveOrder', isAdmin, approveOrder);

router.get('/getAddress',isUser,getAddress);
router.post('/saveAddress',isUser,saveAddress);

router.get('/test', isUser,(req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully' });
});


module.exports = router;