const express=require("express")
const router=express.Router();
const admincontrol=require("../controller/admincontrol")
const categorycontrol=require("../controller/categorycontrol")
const productcontrol=require("../controller/productcontrol")
const bannercontrol=require("../controller/bannercontrol")
const couponcontrol=require("../controller/couponcontrol")
const multer=require("multer")
const storage=require("../utilities/multer")

router.get("/adminlogin",admincontrol.adminloginGET);
router.post("/adminlogin",admincontrol.adminloginPOST);
router.get("/adminHome",admincontrol.adminHomeGET);
router.get("/userslist",admincontrol.userslistGET);
router.get("/adoders",admincontrol.adminordersGET);
router.get("/deliv/:id",admincontrol.orderdeliveredGET);



router.get("/category",categorycontrol.categoryGET);
router.post("/category",categorycontrol.categoryPOST);

router.delete("/deletesubcat",categorycontrol.deletesubDELETE)
router.delete("/fullcatdelete",categorycontrol.categoryDELETE)




const upload=multer({storage})
router.get("/adminproducts",productcontrol.adminproductsGET)

router.get("/addproduct",productcontrol.addproductGET)
router.post("/addproduct",upload.array("productimgf",20),productcontrol.addproductPOST)

router.get("/editproduct/:productid",productcontrol.editproductGET)
router.post("/editproduct/:productid",upload.array("productimgf",20),productcontrol.editproductPOST)
router.delete("/productdelete",productcontrol.deleteproduct)



router.get("/banner",bannercontrol.bannerGET)

router.get("/addbanner",bannercontrol.addbannerGET)
router.post("/addbanner",upload.single("bannerimage"),bannercontrol.addbannerPOST)

router.get("/editbanner/:id",bannercontrol.editbannerGET)
router.post("/editbanner/:id",upload.single("bannerimage"),bannercontrol.editbannerPOST)

router.delete("/dltbanner",bannercontrol.bannerDELETE)



router.get("/coupon",couponcontrol.couponGET)
router.get("/addcoupon",couponcontrol.addcouponGET)
router.post("/addcoupon",couponcontrol.addcouponPOST)
router.delete("/coupondlt",couponcontrol.couponDELETE)





module.exports=router