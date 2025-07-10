const mongoose=require('mongoose');

const otpschema=new mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    expiresAt: { type: Date, required: true, default: () => Date.now() + 2 * 60 * 1000 }    
})

otpschema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Otp', otpschema);