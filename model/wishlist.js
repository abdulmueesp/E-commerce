const mongoose=require("mongoose");
  

const wishlistschema=mongoose.Schema({
    productId:[{type:mongoose.Schema.Types.ObjectId,ref:"productsdata"}],
    userId:{type:mongoose.Schema.Types.ObjectId}
})


module.exports=mongoose.model("wishlist",wishlistschema)