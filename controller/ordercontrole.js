const addressdatabase=require("../model/address")
const signupdatabase=require("../model/signup")
const cartdatabase=require("../model/cart")
const productdatabase=require("../model/product")
const coupondatabase=require("../model/coupon")
const Razorpay = require("razorpay")
require("dotenv").config()

const razorpay_key=process.env.KEY_ID;
const razor_sec=process.env.key_secret

var instance= new Razorpay({
   key_id:razorpay_key,
   key_secret:razor_sec
})


module.exports={

     checkoutGET:async(req,res)=>{

        const id=req.session.email._id
     const addrdata=await addressdatabase.findOne({user:id})
     const userdata=await signupdatabase.findOne({_id:id})


     let totalprice;
     const productid=req.query.id
     req.session.pyproductid= productid
     console.log(`buynow${productid}`);

          if(!req.session.pyproductid){
               const cart=await cartdatabase.findOne({userId:id}).populate('productId.id')
               

               totalprice = cart.productId.reduce((acc,data)=>{
                  return(acc += data.id.price * data.quantity)
               },0)

                console.log(`total${totalprice}`);
               
               
          }else{
                     const productID = req.session.pyproductid 
                     const productdataq=await productdatabase.findById(productID);

                     totalprice=productdataq.price

          }
          const coupondata=await coupondatabase.findOne({
             
            upto:{$lte:totalprice},
            updown:{$gte:totalprice}

          })
         
        res.render("checkout",{addrdata,userdata,totalprice,coupondata})
     },
     applycouponPOST:async(req,res)=>{
  
      const couponcode=req.body.couponcodes
      const total=req.body.total;

        const coupong=await coupondatabase.findOne({couponcode:couponcode});
        const newtotal=total-total*parseInt(coupong.discount)/100
        const amount=Math.round(newtotal)
        req.session.totalprice=amount
    
           res.status(200).json({success:true,amount,discount:coupong.discount})


     },
     successGET:(req,res)=>{
         res.render("success")
     },

     checkoutPOST:async(req,res)=>{
              const{phoneno,paymentadress,paymentmethod}=req.body

            if(paymentmethod=='COD'){
               req.session.paymentmethod=paymentmethod;
               req.session.paymentadress=paymentadress;

               res.status(200).json({success:true,COD:true})
            }else{
               req.session.paymentmethod=paymentmethod;
               req.session.paymentadress=paymentadress;
              const totalprice= req.session.totalprice  
              console.log(`hhiiihhhu${totalprice}`);     
                 
              const options={
               amount:totalprice *100,
               currency:"INR"
              };
              const razorpayorder=await instance.orders.create(options)
               console.log(`razopay33 order${razorpayorder}`);  
                    res.status(200).json({success:true,razorpayorder})
            }            

            
         }
     

   }