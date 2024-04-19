const { default: mongoose } = require("mongoose");
const addressdatabase=require("../model/address")
const signupdatabase=require("../model/signup")
module.exports={
    addadressGET:(req,res)=>{
        res.render("addaddress");
    },
    addadressPOST:async(req,res)=>{
           try{
          const id=req.session.email._id
          const userid=new mongoose.Types.ObjectId(id)
          const datas={
            locality:req.body.locality,
            country:req.body.country,
            district:req.body.district,
            state:req.body.state,
            city:req.body.city,
            housename:req.body.housename,
            pin:req.body.pin
          }
          const newdata=await addressdatabase.findOneAndUpdate(
               {user:userid},
               {$push:{address:datas}},
               {upsert:true,new:true}
          )
          const userdata=await signupdatabase.findOne({_id:id})
          res.render("userprofile",{userdata})
          
           }catch(error){
            console.log(`error is add${error}`);
           }
    },
    userprofileGET:async(req,res)=>{
        if(req.session.email){
       const id= req.session.email._id
        const userdata=await signupdatabase.findOne({_id:id})
        res.render("userprofile",{userdata})
        }else{
            res.redirect("/login")
        }
    },
    
}