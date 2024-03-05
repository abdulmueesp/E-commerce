const bannerdatabase=require("../model/banner")

module.exports={
    bannerGET:async(req,res)=>{
        const banner=await bannerdatabase.find()
        res.render("banner",{banner})
    },
    addbannerGET:(req,res)=>{
        res.render("addbanner")
    },
    addbannerPOST:async(req,res)=>{
        const{Title,expirydate,description}=req.body
        const bannerimage=req.file.filename
        const newdata=new bannerdatabase({
            Title,
            expirydate,
            description,
            bannerimage
        })
        await newdata.save();
        res.redirect("/banner")
    },
    editbannerGET:async(req,res)=>{
        const id=req.params.id
        const datas=await bannerdatabase.findById(id)
        res.render("editbanner",{datas})
    },
    editbannerPOST:async(req,res)=>{
           const id=req.params.id
           const data=await bannerdatabase.findById(id)
           const{Title,expirydate,description}=req.body
           const photo=req?.file?.filename
           const image=data.bannerimage
           if(!photo){
             await bannerdatabase.updateOne({_id:data},{$set:{Title,expirydate,description,bannerimage:image}})
           }else{
            await bannerdatabase.updateOne({_id:data},{$set:{Title,expirydate,description,bannerimage:photo}})
           }
           res.redirect("/banner")
    },
      bannerDELETE:async(req,res)=>{
           
           try{
            const id=req.query.id
           await bannerdatabase.deleteOne({_id:id})
           res.status(200).json({success:true,message:"category removed list"})
           }catch(error){
            console.log("error in delete banner",error);
            res.status(500).json({success:false,message:"something wrong"})
           }
      },
    
}