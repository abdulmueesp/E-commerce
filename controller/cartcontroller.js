const { default: mongoose } = require("mongoose")
const cartdatabase=require("../model/cart")


module.exports={
    usercartGET:async(req,res)=>{
        try{
        const userid=req.session.email._id
       console.log(userid);
        const datas=await cartdatabase.findOne({userId:userid}).populate('productId.id');
        res.render("userCart",{datas})
        }catch(error){
            console.log(`error is a${error}`);
        }
    },
    addcartGET:async(req,res)=>{
        try{
            const userid=req.session.email._id
            console.log(userid)
            if(!userid){
                return res.status(401).json({error:"unauthorized",message:'user is not logged in'})
            }else{
                const productid=req.query.id
                const id=new mongoose.Types.ObjectId(productid);
                const cart=await cartdatabase.findOne({userId:userid})
                if(!cart){
                    const cartNew=new cartdatabase({userId:userid,productId:[{id,quantity:1}]})
                    console.log(cartNew)
                    await cartNew.save();
                    res.json({success:true,count:1})
                }else{
                    const existproduct=cart.productId.find(productId => productId.id.equals(id))
                    if(existproduct){
                        existproduct.quantity +=1;
                    }else{
                        cart.productId.push({id,quantity:1})
                    }
                    await cart.save()
                    return res.json({success:true,count:cart.productId.length})
                }
            }
        }catch(error){
           console.log(error);
        }
    },
    cartDELETE:async(req,res)=>{
        try{
            const userid=req.session.email._id
              const id=req.query.id
              console.log(`product id${id}`);
             await cartdatabase.updateOne(
                {userId:userid},
                {$pull:{productId:{id}}}
             )
             res
             .status(200)
             .json({success:true,message:"product deleted"})

        }catch(error){
             console.log(`error is deletecart${error}`);  
        }
    },
    }