const mongoose=require("mongoose")

const couponschema=new mongoose.Schema({
    couponcode:{
        type:String,
        required:true
    },
    discount:{
       type:String,
       required:true
    },
    upto:{
        type:Number,
        required:true
    },
    updown:{
       type:Number,
       required:true
    },
    validfrom:{
        type:Date,
        required:true
    },
    validto:{
        type:Date,
        required:true
    }

})

module.exports=mongoose.model("coupondata",couponschema)