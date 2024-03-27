const express=require("express")
const signupdatabase=require("../model/signup")
const productsdatabase=require("../model/product")


module.exports={
    adminloginGET:(req,res)=>{
        res.render("adminlogin")
    },
    adminloginPOST:(req,res)=>{
        const{password}=req.body
        if(password==456){
            res.redirect("/adminHome")
        }else{
            res.redirect("/adminlogin");
            console.log("password not connected");
        }
    },
    adminHomeGET:async(req,res)=>{
        const products=await productsdatabase.find()
   
        res.render("adminHome",{products})
    },
    userslistGET:async(req,res)=>{
       const signup=await signupdatabase.find({})
        res.render("ussrslist",{signup})
    }
}
