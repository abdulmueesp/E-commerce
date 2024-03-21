const mongoose=require("mongoose")

const orderschema=mongoose.Schema({

     userid:{
        type:mongoose.Schema.Types.ObjectId
     },
     products:[{
        id:{type:mongoose.Schema.Types.ObjectId,ref:"productsdata"},quantity:{type:Number}
     }],
     totalprice:Number,
     address:String,
     paymentMethod:String,
     status:{type:String,default:'pending'}

},{timestamps:true})

const ordermodel=mongoose.model("orders",orderschema);
module.exports=ordermodel