const express=require("express")

const { Client } = require("twilio/lib/base/BaseTwilio");
const smtpTransport=require("nodemailer-smtp-transport")
const nodemailer=require("nodemailer")

const signupdatabase=require("../model/signup")
const bannerdatabase=require("../model/banner")
const productdatabase=require("../model/product")
const wishlistdatabase=require("../model/wishlist")
require("dotenv").config()

// const{body,validationResult}=require("express-validator")
const AccountSID="AC8ce275b17a798e58d9f11078e20ea4b1"
const AuthToken="0cbf29d086e42ad840e7c7efe519defe";
const verifySid = "VAb457c2b12a4621b7941e060282c1a1a3"
const client=require("twilio")(AccountSID,AuthToken)
var phonerare;

const sendResetPassemail=async(email,otp)=>{
  const user=await signupdatabase.findOne({email})

if(!user){
  return;
}

const transporter=nodemailer.createTransport(
  smtpTransport({
    service:"gmail",
    auth: {
      user: process.env.email_user,
      pass:process.env.password_user,
    },
  })
)
const mailOptions={
  from:process.env.email_user,
  to:email,
  subject:"Reset your password",
  html:`<p>You requested a password reset.Your OTP is ${otp}`
};
await transporter.sendMail(mailOptions);
};
const generateOTP=()=>{
  return `${Math.floor(1000 + Math.random() *9000)}`
};



module.exports={
    signupGET:(req,res)=>{
        res.render("signup")
    },
  
     signupPOST:async(req,res)=>{
        
        console.log("entered signuppost");
        const{fullname,email,number,password}=req.body
        phonerare=req.body.number
        console.log(phonerare);
        signupdatabase.create({
            fullname,
            email,
            number,
            password,
            role:"user"

        })
     
    verification= await client.verify.v2
    .services(verifySid)
    .verifications.create({
        to:`+91${phonerare}`,
        channel:"sms",
    });
    
       res.redirect("/otp")
        
     },
     otpGET:(req,res)=>{
        res.render("otp")
        
     },
     otpPOST:async(req,res)=>{
      
          const{otp}=req.body
          console.log(req.body)
          
          const verification_check = await client.verify.v2
          .services(verifySid)
          .verificationChecks.create({to:`+91${phonerare}`, code:otp});

          if(verification_check.status=="approved"){
            res.redirect("/login")
          }else{
            console.log("otp not corrected");
            res.redirect("/signup")
          }


     },
     loginGET:async(req,res)=>{

      
        res.render("login")
    
     },
     loginPOST:async(req,res)=>{
           
         const{email,password}=req.body
          const data=await signupdatabase.findOne({email:email})
              req.session.email=data
          if(!data){
               res.send("user not found")
          }else{
              if(data.password==password){
                res.redirect("/userhome")
              }else{
                res.send("wrong password")
              }
          }

     },
     forgetpsGET:(req,res)=>{
      res.render("forgetps")
     },
     forgetpsPOST:async(req,res)=>{
   const {email}=req.body
   try{
       const otp=generateOTP();

       const user=await signupdatabase.findOne({email})
   
        if(!user){
          console.log("not take email");
          res.redirect("/forgetps")

        }
        await sendResetPassemail(email,otp);
        req.session.otp=otp
        req.session.email1=email
        
    
        res.redirect("/forgetotp")
      }catch(error){
        console.log("error is forget section:",error);
      }

     },
     forgetotpGET:(req,res)=>{
      res.render("forgetotp")
     },
     forgetotpPOST:async(req,res)=>{
        const otps=req.session.otp
      const{otp}=req.body
     
      if(otps==otp){
        res.redirect("/resetpass")
        console.log("email otp verified"); 
      }else{
        res.redirect("/forgetotp")
        console.log("not correct email otp")
      }

     },
     resetpassGET:(req,res)=>{
      res.render("resetpass")
     },
     resetpassPOST:async(req,res)=>{
          const{password,password2}=req.body
          const email=req.session.email1
          console.log(email)
          if(password==password2){
              console.log("entered update section");

            await signupdatabase.updateOne({email},{$set:{password:password}});
        console.log("finshed update");
        res.redirect("/login")

          }else{
                  console.log("not corrected password");
                  res.redirect("/resetpass")
          }
     },
        userhomeGET:async(req,res)=>{
          if(req.session.email){
            const productdata=await productdatabase.find().limit(3)
            const bandata=await bannerdatabase.find()
            
            res.render("userHomePage",{bandata,productdata})
          }else{
            res.redirect("/login")
          }
         
         

        },
        productdeaileGET:async(req,res)=>{
          const id=req.params.id
         const userid=req.session.email._id
         let existingproduct=false;
          const datas=await productdatabase.findById(id)
         const wishdata=await wishlistdatabase.findOne({userId:userid})
        const existproduct=wishdata?.productId.find(productId=>productId.equals(id))
        if(existproduct!==undefined){
              existingproduct=true
        }
         

          res.render("productdeatilepage",{datas,existingproduct})
        },
       productsHomeGET:async(req,res)=>{
            try{
              let products;
              const search=req.query.search?.toString() || ''
             
           products=await productdatabase.find(
            {productname:{$regex:search,$options:"i"},}
           )
           res.render("producthome",{products})


            }catch(error){
              console.log(`error is productshome${error}`);
            }
       }
}
