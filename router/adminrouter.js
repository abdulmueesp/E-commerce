const express=require("express")
const router=express.Router();
const admincontrol=require("../controller/admincontrol")
const categorycontrol=require("../controller/categorycontrol")

router.get("/adminlogin",admincontrol.adminloginGET);
router.post("/adminlogin",admincontrol.adminloginPOST);
router.get("/adminHome",admincontrol.adminHomeGET);
router.get("/userslist",admincontrol.userslistGET);


router.get("/category",categorycontrol.categoryGET);
router.post("/category",categorycontrol.categoryPOST);

router.delete("/deletesubcat",categorycontrol.deletesubDELETE)
router.delete("/fullcatdelete",categorycontrol.categoryDELETE)









module.exports=router