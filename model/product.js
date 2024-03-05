const { default: mongoose } = require("mongoose");

const productschema=new mongoose.Schema({
    productname:{
        type:String,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    Discount:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
       type:String,
    },
    subcategory:{
        type:String,
    },
    productimgf:{
        type:Array
    
    }
})

module.exports=mongoose.model("productsdata",productschema);