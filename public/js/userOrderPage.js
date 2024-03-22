const { patch } = require("../../router/userrouter");

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

// async function ordercancel(event,orderid){
//   event.preventDefault();
//   try{
//       //  const cancelBtn = document.querySelector('.margin'+orderid)
//        const response=await fetch(`/ordercancel?id=${orderid}`,{

//        method:'PATCH',
//        headers:{
//         'content-type':'application/json'
//        }

//        })
//        const result=response.json()
//        if(result.success==true){
//         document.querySelector('.margin' + orderid).classList.add('cancellProduct')
//        }
        

//   }catch(error){
//     console.log(`odercancel${error}`);
//   }
// }

