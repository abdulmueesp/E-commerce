const express=require("express")
const mongoose=require("mongoose")

const { Client } = require("twilio/lib/base/BaseTwilio");
const smtpTransport=require("nodemailer-smtp-transport")
const nodemailer=require("nodemailer")

const signupdatabase=require("../model/signup")
const bannerdatabase=require("../model/banner")
const productdatabase=require("../model/product")
const wishlistdatabase=require("../model/wishlist")
const reviewdatabase=require("../model/review")
const addressdatabase=require("../model/address")

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
  subject:"Shoprey",
  html:`<p>Your OTP is ${otp}`
};
await transporter.sendMail(mailOptions);
};
const generateOTP=()=>{
  return `${Math.floor(1000 + Math.random() *9000)}`
};



module.exports={
  userRedirect:(req,res)=>{
    res.redirect('/login')
  },
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
      

    // verification= await client.verify.v2
    // .services(verifySid)
    // .verifications.create({
    //     to:`+91${phonerare}`,
    //     channel:"sms",
    // });
         const signotp=generateOTP();


         await sendResetPassemail(email,signotp);
         req.session.signotp=signotp

       res.redirect("/otp")
        
     },
     otpGET:(req,res)=>{
        res.render("otp",{ errorMessage: null })
        
     },
     otpPOST:async(req,res)=>{
      
          const{otp}=req.body
          console.log(req.body)
        const signuotp =req.session.signotp

        if(signuotp==otp){
          res.redirect("/login")
        }else{
          return res.render('otp', { errorMessage: "please enter valid otp" });
        }
          
          // const verification_check = await client.verify.v2
          // .services(verifySid)
          // .verificationChecks.create({to:`+91${phonerare}`, code:otp});

          // if(verification_check.status=="approved"){
          //   res.redirect("/login")
          // }else{
          //   console.log("otp not corrected");
           
          // }


     },
     loginGET:async(req,res)=>{

      res.render('login', { errorMessage: null }); 
    
     },
     loginPOST:async(req,res)=>{
           
         const{email,password}=req.body
          const data=await signupdatabase.findOne({email:email})
              req.session.email=data
          if(!data){
            return res.render('login', { errorMessage: "User not found" });
          }else{
              if(data.password==password){

                const id=req.session.email._id
                const userid=new mongoose.Types.ObjectId(id)

                const datas={
                  locality:"nill",
                  country:"nill",
                  district:"nill",
                  state:"nill",
                  city:"nill",
                  housename:"nill",
                  pin:1234
                }
                const newdata=await addressdatabase.findOneAndUpdate(
                     {user:userid},
                     {$push:{address:datas}},
                     {upsert:true,new:true}
                )


                res.redirect("/userhome")
              }else{
                return res.render('login', { errorMessage: "incorrect password" });
              }
          }

     },
     forgetpsGET:(req,res)=>{
      res.render("forgetps",{ errorMessage: null })
     },
     forgetpsPOST:async(req,res)=>{
   const {email}=req.body
   try{
       const otp=generateOTP();

       const user=await signupdatabase.findOne({email})
   
        if(!user){
          return res.render('forgetps', { errorMessage: "not found email" });
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
      res.render("forgetotp",{ errorMessage: null })
     },
     forgetotpPOST:async(req,res)=>{
        const otps=req.session.otp
      const{otp}=req.body
     
      if(otps==otp){
        res.redirect("/resetpass")
        console.log("email otp verified"); 
      }else{
        return res.render('forgetotp', { errorMessage: "please enter valid otp" });
      }

     },
     resetpassGET:(req,res)=>{
      res.render("resetpass",{ errorMessage: null })
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
            return res.render('resetpass', { errorMessage: "passwords no matched" });
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
          if(req.session.email){
          const id=req.params.id
         const userid=req.session.email._id
         let existingproduct=false;
          const datas=await productdatabase.findById(id)
         const wishdata=await wishlistdatabase.findOne({userId:userid})
        const existproduct=wishdata?.productId.find(productId=>productId.equals(id))
       const review=await reviewdatabase.findOne({productID:id}).populate('review.userid')

        if(existproduct!==undefined){
              existingproduct=true
        }
         

          res.render("productdeatilepage",{datas,existingproduct,review})
      }else{
        res.redirect("/login")
      }
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
       },
       userEDitGET:async(req,res)=>{
        if(req.session.email){

          const id=req.session.email._id

          const data=await signupdatabase.findOne({_id:id})
          
          res.render("useredit",{data})
        }else{
          res.redirect("/login")
        }
          
       },
      userEDitPOST:async(req,res)=>{

        const {fName,email,phone,cPass}=req.body
        const id=req.session.email._id
        await signupdatabase.updateOne({_id:id},{$set:{
          fullname:fName,
          email:email,
          number:phone,
          password:cPass
        }})
        res.redirect("/userprofile");


      },
      userlogoutGET:(req,res)=>{
        try{
          req.session.destroy((err)=>{
            if(err){
              console.error("Error destroying session ",err)
            }else{
              console.log("session destroy ")
              res.redirect('/login')
            }
          })

        }catch(error){
          console.log(`error is logout${error}`);
        }
      }
}
