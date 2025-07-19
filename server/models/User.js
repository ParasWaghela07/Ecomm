
const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    firebaseUid:{
        type:String,
        required:true,
    },
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
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
        quantity: { type: Number, default: 1 },
        size:{type:String}
    }
    ]
,
    order:[{type:mongoose.Schema.Types.ObjectId, ref:'Order'}],
})

const User=mongoose.model('User',userschema);
module.exports=User;