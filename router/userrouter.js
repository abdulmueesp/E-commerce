const express=require("express");
const router=express.Router();
const{body,validationResult}=require("express-validator")
// const usercontroller=require("../controller/usercontroller")



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
    resetpassPOST
}=require("../controller/usercontroller");

router.get("/signup",signupGET)
router.post("/signup",signupPOST)
router.get("/otp",otpGET)
router.post("/otp",otpPOST)
router.get("/login",loginGET)
router.get("/forgetps",forgetpsGET)
router.post("/forgetps",forgetpsPOST)
router.get("/forgetotp",forgetotpGET)
router.post("/forgetotp",forgetotpPOST)
router.get("/resetpass",resetpassGET)
router.post("/resetpass",resetpassPOST)



module.exports=router;