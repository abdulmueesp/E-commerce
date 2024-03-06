const express=require("express");
const router=express.Router();
const{body,validationResult}=require("express-validator")
// const usercontroller=require("../controller/usercontroller")
const cartcontroller=require("../controller/cartcontroller")


const{
    signupGET,
    signupPOST,
    otpGET,
    otpPOST,
    loginGET,
    forgetpsGET,
    forgetotpGET,
    resetpassGET,
    forgetpsPOST,
    forgetotpPOST,
    resetpassPOST,
    loginPOST,
    userhomeGET,
    productdeaileGET,
    productsHomeGET
}=require("../controller/usercontroller");

router.get("/signup",signupGET)
router.post("/signup",signupPOST)
router.get("/otp",otpGET)
router.post("/otp",otpPOST)
router.get("/forgetps",forgetpsGET)
router.post("/forgetps",forgetpsPOST)
router.get("/forgetotp",forgetotpGET)
router.post("/forgetotp",forgetotpPOST)
router.get("/resetpass",resetpassGET)
router.post("/resetpass",resetpassPOST)

router.get("/login",loginGET)
router.post("/login",loginPOST)

router.get("/userhome",userhomeGET)
router.get("/productdeatile/:id",productdeaileGET)



router.get("/usercart",cartcontroller.usercartGET)
router.get("/addcart",cartcontroller.addcartGET)
router.delete("/deletecart",cartcontroller.cartDELETE)


router.get("/productshome",productsHomeGET)




module.exports=router;