const multer=require("multer");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
          cb(null,'public/productimg')
    },
    filename:(req,file,cb)=>{
        const unique=Date.now()+ '-' + file.originalname
        cb(null,unique)
    }
})

module.exports=storage