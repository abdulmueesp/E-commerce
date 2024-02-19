const express=require("express");
const app=express();

const mongoose=require("mongoose");
const signupdatabase=require("./model/signup");
const path=require("path")
const userside=require("./router/userrouter")
const adminside=require("./router/adminrouter")
require("dotenv").config()
const session=require("express-session")

app.use(session({
    secret:"muhees",
    resave:false,
    saveUninitialized:false,
}))



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.set("views",path.join(__dirname,"views"))
// app.set("views","views")
app.set("view engine","ejs")



app.use("/",userside)
app.use("/",adminside)


app.listen(3000,()=>{
    console.log("server is starting");
})
