const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})


const signupschema=new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    number:{type:String,required:true},
    role:{type:String}

})

module.exports=mongoose.model("signupdata",signupschema)