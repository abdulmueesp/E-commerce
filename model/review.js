const mongoose=require("mongoose")

const reviewschema=new mongoose.Schema({

     productID:{type:mongoose.Schema.ObjectId,ref:"productsdata",required:true},
     review:[{userid:{type:mongoose.Schema.ObjectId,ref:"signupdata"},comment:{type:String}}]


})

const reviewmodel=mongoose.model("reviews",reviewschema);
module.exports=reviewmodel