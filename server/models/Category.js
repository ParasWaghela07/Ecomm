const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Product'
    }],
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

const Category=mongoose.model('Category',categorySchema);
module.exports=Category;