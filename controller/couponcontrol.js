
const coupondatabase=require("../model/coupon")
const moment=require("moment")

module.exports={
    couponGET:async(req,res)=>{
        const datas=await coupondatabase.find()
        res.render("coupon",{datas})
    },
    addcouponGET:(req,res)=>{
        res.render("addcoupon")
    },
    addcouponPOST:async(req,res)=>{
        try{
        const{couponcode,upto,updown,validfrom,validto,discount}=req.body

        const validfromformt=moment(validfrom).format("MM-DD-YYYY");
        const validtoformt=moment(validto).format("MM-DD-YYYY");

        const newdata=new coupondatabase({
            couponcode:couponcode.toUpperCase(),
            upto,
            updown,
            discount,
            validfrom:validfromformt,
            validto:validtoformt
        })
        await newdata.save()
        res.redirect("/coupon")

    }catch(error){
           console.log(`error is addcoupon${error}`);
           res.status(500).send("internal server error")
    }
},
    couponDELETE:async(req,res)=>{
        try{
        const id=req.query.id
        await coupondatabase.deleteOne({_id:id})
        res.status(200).json({success:true,message:"coupon deleted"})
        }catch(error){
           console.log(`error is coupon delete${error}`)
        }
    }



}