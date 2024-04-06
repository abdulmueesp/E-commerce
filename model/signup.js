const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://abdulmuees55:wee7KoE3nQ13yuCF@cluster0.a61zxo7.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
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