const mongoose=require("mongoose")

const bannerschema=new mongoose.Schema({
     
    Title:{
        type:String,
        required:true
    },
    expirydate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    bannerimage:{
        type:String
    }

})
module.exports=mongoose.model("bannerdata",bannerschema)