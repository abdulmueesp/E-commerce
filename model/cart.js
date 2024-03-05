 const mongoose=require("mongoose")

 const cartschema=new mongoose.Schema({
    userId:{
     type:mongoose.Schema.Types.ObjectId
    },
    productId:[{
      id:{type:mongoose.Schema.Types.ObjectId,
      ref: "productsdata" },
      quantity:Number,
    }]
 });

 const cartsmodel=mongoose.model("cartdata",cartschema)
 module.exports=cartsmodel
