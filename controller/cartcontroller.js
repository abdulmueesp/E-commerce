const { default: mongoose } = require("mongoose")
const cartdatabase=require("../model/cart")
const axios=require("axios")


module.exports={
    usercartGET:async(req,res)=>{
        try{
            if(req.session.email){
        const userid=req.session.email._id
       console.log(userid);
        let datas=await cartdatabase.findOne({userId:userid})
       
        
                let discountTotal,subtotal;
        if(datas) {
        
       datas= await cartdatabase.findOne({userId:userid}).populate('productId.id');

        subtotal=datas.productId.reduce((acc,index)=>{
        return(acc += index.id.price * index.quantity)
         
        },0)
        discountTotal=datas.productId.reduce((acc,index)=>{
            return(acc += index.id.price * index.quantity);
        },0);
            
          
        
    }
    res.render("userCart",{datas:datas?datas:"",discountTotal:discountTotal?discountTotal:"",subtotal:subtotal?subtotal:""})
        }
        else{
            res.redirect("/login")
        }
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
        quantitycon:async(req,res)=>{
            console.log("hi")
            try{
            const userid=req.session.email._id
            console.log('ggfhf');
            const userId=new mongoose.Types.ObjectId(userid);
            const productid=req.body.productid;
            console.log(`axio${productid}`);
            const id=new mongoose.Types.ObjectId(productid)
            const qty=req.body.qty

            const abc=await cartdatabase.updateOne(
                {userId:userId, "productId.id":id},
                {$set:{"productId.$.quantity":qty}}
            );


            const datas=await cartdatabase.findOne({userId:userid}).populate('productId.id');
            const subtotal=datas.productId.reduce((acc,index)=>{
                return(acc += index.id.price * index.quantity)
            },0)
           

            res.status(200).json({success:true,total:subtotal})
            
        }catch(error){
           console.log(`error is quan up${error}`);
        }
    }
    }
    