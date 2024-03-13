// const axios=require("axios")

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



async function deletecart(event,id){
       try{
        event.preventDefault();
           const response=await fetch(`/deletecart?id=${id}`,{method:`DELETE`})
           if(!response.ok){
            throw new Error(`error is delete cart section`+response.statusText)
        }
        const result=await response.json()
        if(result.success==true){
          Swal.fire({
        title: "Deleted!",
      text: "Your file has been deleted.",
       icon: "success"
       });
       document.querySelector('.cartItems').remove()
      }else{
          message.innerHTML=result.Error || "unknown error"
      }

       }catch(error){
           
       }
}

const fprice=document.querySelectorAll(".fPrice");
const sTotal=document.querySelector("#sTotal");
const dprice=document.querySelector("#dPrice");
const tprice=document.querySelector("#tPrice");




async function decrement(id,price,stock,discount){
        
        const qty=document.querySelector(`.qtyOne${id}`)
  
        
        if(qty.innerHTML > 1){
          const lprice=document.querySelector(`.lPrice${id}`);
          const fprice=document.querySelector(`.fPrice${id}`)
          const initialprice= parseFloat(lprice.innerHTML.replace("₹", ""))
          qty.innerHTML = +qty.innerHTML -1;
           const newprice=qty.innerHTML * price;
           const newdiscount=qty.innerHTML*discount
          const qtyval= parseInt(qty.innerHTML);
          const stockval =parseInt(stock)
          
          const response=await axios.post("/quantitycon",{
            productid:id,
            qty:qtyval
          });
            if(qtyval <= stockval){
              // lprice.classList.remove("red");
              lprice.innerHTML=`₹${newprice}`;
            }else{
              // lprice.classList.add("red");
              lprice.innerHTML="out of stock";
            }
              const total1=total(price * -1);
              sTotal.innerHTML=`₹${total1}`;
              tprice.innerHTML=`₹${total1}`
              
        }


}


async function increment(id,price,stock,discount){
       const qty=document.querySelector(`.qtyOne${id}`)

       const lprice=document.querySelector(`.lPrice${id}`);
       const fprice=document.querySelector(`.fPrice${id}`)
       const initialprice= parseFloat(lprice.innerHTML.replace("₹", ""))
       qty.innerHTML= +qty.innerHTML + 1;
       const newprice= qty.innerHTML*price;
       console.log(newprice);
       const newdiscount=qty.innerHTML*discount;
       const qtyval= parseInt(qty.innerHTML);
       const stockval =parseInt(stock)

       const response= await axios.post("/quantitycon",{
             productid:id,
             qty:qtyval
      
       })
      //  lprice.innerHTML=`₹${newprice}`;
      //  console.log(lprice);
      //  fprice.innerHTML=`₹${newdiscount}`;
      //  const total1=total(price);
      //  const totaldis=total(discount);
      //  fprice.innerHTML=`${totaldis}`;
      //  sTotal.innerHTML=`${total1}`;
      //  tprice.innerHTML=`${total1}`;

     if(qtyval <= stockval){
      lprice.innerHTML=`₹${newprice}`;
     }else{
      lprice.innerHTML="out of stock";
     }




}

function total(price) {
  const subtoal = sTotal.innerHTML.replace("₹", "");
  const grantTotal = parseInt(subtoal) + parseInt(price);
  return grantTotal;
}
function total(discount) {
  const discounttotal = fprice.innerHTML.replace("₹", "");
  const Total = parseInt(discounttotal) + parseInt(discount);
  return Total;
}




