const categorydata=require("../model/category")

module.exports={
    categoryGET:async(req,res)=>{
        const categories= await categorydata.find()
        res.render("categories",{categories})
    },
    categoryPOST:async(req,res)=>{
        const{categoryname,subcategoryname}=req.body;

        const category= await categorydata.findOne({ category:categoryname})
     
          if(!category){
             categorydata.create({

                category: categoryname,
                subcategory: [subcategoryname]
            });
          }else{
            category.subcategory.push(subcategoryname)
            await category.save()
          }
         
          res.redirect("/category")

    },
     deletesubDELETE:async(req,res)=>{
       try{
       const{subcategoryid,categoryid}=req.query
       await categorydata.findOneAndUpdate(
        {category:categoryid},
        {$pull:{subcategory:subcategoryid}},
        {new:true}
        
       )
       res.status(203).json({success:true,message:"subcategory removed list"})
       }catch(error){
       console.log("error in removing sub category",error);
       res.status(400).json({success:false,message:"something wrong"})
       }
   
},
    categoryDELETE:async(req,res)=>{
      try{
          const id=req.query.id;
          await categorydata.deleteOne({_id:id})
          res.status(200).json({success:true,message:"category removed list"})

      }catch(error){
        console.log("error in removing category",error);
        res.status(500).json({success:false,message:"something wrong"})
      }
    }

}