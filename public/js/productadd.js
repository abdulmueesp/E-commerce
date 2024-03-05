
function handleimg(){
    const imageInput = document.getElementById("productimgf");
    const previewImage = document.getElementById("previewimg");
  
    const file = imageInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    } else {
      previewImage.src = "";
    }
  }
