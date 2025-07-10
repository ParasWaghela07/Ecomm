const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    address:{
        type:String
    },
    cart: [
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }
    ]
,
    order:[{type:mongoose.Schema.Types.ObjectId, ref:'Order'}],
})

const User=mongoose.model('User',userschema);
module.exports=User;