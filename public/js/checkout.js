// const { default: axios } = require("axios");


const hamburgerBtn = document.querySelector(".hamburger");
const mobilenavigationList = document.querySelector(".mobilenavigationList");
const mobilenavigation = document.querySelector(".mobilenavigation");
const logo = document.querySelector(".logo");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mobilenavigationList.classList.toggle("active");
  mobilenavigation.classList.toggle("active");
  logo.classList.toggle("active");
});

const decBtn = document.querySelectorAll(".dec");
const incBtn = document.querySelectorAll(".inc");
const qty = document.querySelectorAll(".qtyOne");
const lPrice = document.querySelectorAll(".lPrice");
const fPrice = document.querySelectorAll(".fPrice");
const sTotal = document.querySelector("#sTotal");
const dPrice = document.querySelector("#dPrice");
const tPrice = document.querySelector("#tPrice");



const creditCard = document.querySelector('#creditCard');
const credit = document.querySelector('.credit');
const COD = document.querySelector('#COD');

creditCard.addEventListener('click', () => {
  credit.classList.add('togggle');
});

COD.addEventListener('click', () => {
  credit.classList.remove('togggle');
})

const radio = document.querySelectorAll('.radio');
const addressu=document.getElementById('adreses')

radio.forEach((element) => {
  element.addEventListener('change', () => {
    const data = element.value;
    console.log(`huiiiii${data}`);
    addressu.innerHTML=data  


  })
}); 

async function applycoupon(event,totalamount){
      event.preventDefault()

      try{
           console.log("hiiiiiiiii iam muees");
           const couponcode=document.querySelector('.couponinp').value;
           console.log(`coponcode${couponcode}`);

           const discount=document.getElementById('.cDPrice')

           const response= await axios.post('/applycoupon',{
             couponcodes:couponcode,
             total:totalamount
           })
            
           const result=response.data.amount
           const discountper=response.data.discount 

           if(result&&discountper){
                document.getElementById('tPrice').innerHTML=result
                document.getElementById('cDPrice').innerHTML=discountper +'%'
           }



      }catch(error){
            console.log(error);
      }

}

let payment;
async function payselect(val){
     
        payment=val

}
   const okbtn=document.querySelector('.okbtn')
   okbtn.addEventListener('click',async(event)=>{

        event.preventDefault()
        if(!payment){
              document.querySelector('.error').innerHTML="please select payment method"
              setTimeout(()=>{
                document.querySelector('.error').innerHTML=''
              },3000)
        }

       const phoneno=document.querySelector('.phone').innerHTML
       const paymentaddress=document.querySelector('.paymentadress').innerHTML
        const response=await axios.post("/checkout",{
          phoneno:phoneno,
          paymentadress:paymentaddress,
          paymentmethod:payment
        })
          const result=response.data
          if(result.COD==true){
            window.location.href='/success'
          }else{
            console.log("abdulmueees");
            const razorpayorder=response.data.razorpayorder
            console.log(razorpayorder);
          //   const options={
          //     key:'rzp_test_t5Vo2gETad7Zur',
          // amount:razorpayorder.amount,
          // currency:razorpayorder.currency,
          // name:'Your Company Name',
          // description:'Test Payment',
          // order_id:razorpayorder.id,
          // handler:async function(response){
          //   const orderresponse=await axios.post()
          // }
          //   }
             

          }

})