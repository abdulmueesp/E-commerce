const mongoose=require("mongoose");


const addressschema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"signupdata",
        required:true
    },
address:[{
    locality:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    housename:{
         type:String,
         required:true
    },
    pin:{
         type:Number,
         required:true
    },
}]

})

module.exports=mongoose.model("addressdata",addressschema);