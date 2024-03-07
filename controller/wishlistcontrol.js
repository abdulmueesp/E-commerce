const { default: mongoose } = require("mongoose");
const wishlistdatabase=require("../model/wishlist");
const { json } = require("body-parser");


module.exports={
    addwishlistGET:async(req,res)=>{
        try{
             const productid=req.query.id
             console.log(`wishproduct${productid}`);
             const id=req.session.email._id
             console.log(`wishid${id}`);
             
             const userobjid=new mongoose.Types.ObjectId(id)
             const productobjid=new mongoose.Types.ObjectId(productid)
             const wishlist=await wishlistdatabase.findOne({userId:id})

             if(!wishlist){
                 const newdata=new wishlistdatabase({
                    productId:[productobjid],
                    userId:userobjid
                 })
                 await newdata.save();
                 res.status(200).json({success:true})
             }else{
                if(!wishlist.productId.includes(productobjid)){
                    await wishlistdatabase.updateOne(
                        {userId:id},
                        {$push:{productId:productobjid}}
                    );
                       res.status(200).json({success:true})
                }if(wishlist.productId.includes(productobjid)){
                    await wishlistdatabase.updateOne(
                        {userId:id},
                        {$pull:{productId:productobjid}}
                    )
                    res.status(200).json({success:false})
                }
             }



        }catch(error){

        }
    },
    removewishlistGET:(req,res)=>{
        
    }
}