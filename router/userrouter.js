const express=require("express");
const router=express.Router();
const{body,validationResult}=require("express-validator")
// const usercontroller=require("../controller/usercontroller")
const cartcontroller=require("../controller/cartcontroller")
const wishlistcontroler=require("../controller/wishlistcontrol")
const addresscontroler=require("../controller/addresscontrol")
const ordercontroler=require("../controller/ordercontrole")

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
router.post("/quantitycon",cartcontroller.quantitycon)

router.get("/productshome",productsHomeGET)

router.get("/addwishlist",wishlistcontroler.addwishlistGET)
router.get("/wishlist",wishlistcontroler.wishlistGET)

// address section and profile

router.get("/addaddress",addresscontroler.addadressGET)
router.post("/addaddress",addresscontroler.addadressPOST)

router.get("/userprofile",addresscontroler.userprofileGET)

// checkout 
router.get("/checkout",ordercontroler.checkoutGET)
router.post("/checkout",ordercontroler.checkoutPOST)

router.post("/applycoupon",ordercontroler.applycouponPOST)

router.get("/success",ordercontroler.successGET)

router.post("/razorpay",ordercontroler.razorpayPOST)

router.get("/useroders",ordercontroler.userordersGET)

router.patch("/ordercancel",ordercontroler.ordercancelPATCH)


module.exports=router;