  const productdatabase=require("../model/product")
  const categorydata=require("../model/category")
  const fs=require("fs")


module.exports={
    adminproductsGET:async(req,res)=>{
        const products=await productdatabase.find()
        res.render("adminproducts",{products})
    },
    addproductGET:async(req,res)=>{
        const categories=await categorydata.find()
        res.render("addproduct",{categories})
    },
    addproductPOST:async(req,res)=>{
        const{productname,quantity,price,Discount,description,category,subcategory}=req.body
        if (!req.files || req.files.length >4) {
            return res
              .status(230)
              .json({ ERR: "Please provide a image", success: false });
          }
    
        
     const productimgf= req.files.map(file => file.filename);
          console.log(req.files.filename)
          const newdata=new productdatabase({
            productname,
            quantity,
            price,
            Discount,
            description,
            category,
            subcategory,
            productimgf
          })
          await newdata.save();
          res.redirect("/adminproducts")

    },
    editproductGET:async(req,res)=>{
      const id=req.params.productid
      const product=await productdatabase.findById(id)
      const cats=await categorydata.find()
           res.render("editproduct",{product,cats})
    },
    editproductPOST:async(req,res)=>{
      const id=req.params.productid
       const productimgf=req.files.map(file=>file.filename)
       const{productname,quantity,price,Discount,description,category,subcategory}=req.body
       try{
       await productdatabase.updateOne({_id:id},{$set:{productname,quantity,price,Discount,description,category,subcategory,productimgf}})
       }catch(error){
        console.log(`update section error:${error}`)
       }
           res.redirect("/adminproducts")

    },
    deleteproduct:async(req,res)=>{
          try{
            const id=req.query.id
            await productdatabase.deleteOne({_id:id})
            res.status(200).json({success:true,message:"category removed list"})
          }catch(error){
            console.log("error in delete product",error);
            res.status(500).json({success:false,message:"something wrong"})
          }
    },
    filterpriceGET:async(req,res)=>{
     const min= req.query.minPrice
     const max= req.query.maxPrice

     const products= await productdatabase.find({

          price:{$gte:min,$lte:max}
     })
     res.render("producthome",{products})

    },
    highlowsortGET:async(req,res)=>{
      try{

        const sorts=JSON.parse(req.query.sort)
       
        const products=await productdatabase.find().sort({price:sorts})

        res.render("producthome",{products})
      


      }catch(error){
        console.log(`error is highlow`);
      }
    }
}
