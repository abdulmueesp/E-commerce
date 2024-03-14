const { default: mongoose } = require("mongoose");
const addressdatabase=require("../model/address")
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
            hno:req.body.hno,
            pin:req.body.pin
          }
          const newdata=await addressdatabase.findOneAndUpdate(
               {user:userid},
               {$push:{address:datas}},
               {upsert:true,new:true}
          )
              res.redirect("/addaddress");
              console.log(`hooonkkeee`);      
           }catch(error){
            console.log(`error is add${error}`);
           }
    },
    userprofileGET:(req,res)=>{
        res.render("userprofile")
    }
}