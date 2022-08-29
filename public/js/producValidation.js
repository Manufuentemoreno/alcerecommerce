window.onload = function(){
    const form = document.querySelector("#createForm");
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const category = document.querySelector("#category");
    const descrip = document.querySelector("#description");
    const image = document.querySelector("#product_photo");
    
    let errores = {
        productName:0,
        productPrice:0,
        productCategory:0,
        productDescription:0,
        productImage:0
    };

    // Name:
    let enam = "";
    name.addEventListener("focus",(e)=>{
        if(enam==""){
            name.insertAdjacentHTML("afterend",
            "<div id=ename class=danger-text><p>* El nombre debe tener más de 5 caracteres</p></div>")
            enam = document.getElementById("ename");
            return enam;
        };
    })

    name.addEventListener("keyup",(e)=>{
        let pname = name.value;
        if (pname.length < 5){
            enam.style.display = "block"
            name.classList.remove("acepted");
            name.classList.add("danger");
            errores.productName=1;
            return
        }
        enam.style.display = "none";
        name.classList.remove("danger");
        name.classList.add("acepted");
        errores.productName=0;
    })

    name.addEventListener("blur",(e)=>{
        let pname = name.value;
        if (pname.length<5){
            name.classList.remove("acepted");
            name.classList.add("danger");
            errores.productName=1;
            return
        }
        enam.style.display = "none";
        name.classList.remove("danger");
        name.classList.add("acepted");
        errores.productName=0;
    })

    // Pirce:
    let eprice = "";
    price.addEventListener("keyup",()=>{
        let pprice = price.value;
        if(!pprice){
            if(eprice==""){
                price.insertAdjacentHTML("afterend",
                "<div id=eprice class=danger-text><p>* Valor no aceptado</p></div>")
                eprice = document.getElementById("eprice");
                price.classList.add("danger");
                errores.productPrice = 1;
                return eprice
            }
            price.classList.remove("acepted");
            price.classList.add("danger");
            eprice.style.display = "block";
            errores.productPrice = 1;
            return eprice
        }
        price.classList.add("acepted");
        errores.productPrice = 0;
        eprice ? eprice.style.display = "none":null;
    });
    price.addEventListener("blur",()=>{
        if(!price.value){
            price.classList.remove("acepted");
            price.classList.add("danger");
            errores.productPrice = 1;
            return
        }
        errores.productPrice = 0;

    })

    // Category
    category.addEventListener("change",()=>{
        if(!category.value){
            category.classList.add("danger");
            errores.productCategory = 1;
            return
        }
        category.classList.remove("danger");
        category.classList.add("acepted");
        errores.productCategory = 0;
    })
  
    // Description:
    let edesc = "";
    descrip.addEventListener("focus",(e)=>{
        if(edesc==""){
            descrip.insertAdjacentHTML("afterend",
            "<div id=edesc class=danger-text><p>* La descripción debe tener más de 20 caracteres</p></div>")
            edesc = document.getElementById("edesc");
            errores.productDescription = 1;
            return edesc;
        }       
    })

    descrip.addEventListener("keyup",(e)=>{
        let desc = descrip.value
        if (desc.length<20){
            edesc.style.display = "block"
            descrip.classList.remove("acepted");
            descrip.classList.add("danger");
            errores.productDescription = 1;
            return
        }
        edesc.style.display = "none";
        descrip.classList.remove("danger");
        descrip.classList.add("acepted");
        errores.productDescription = 0;
    })

    descrip.addEventListener("blur",(e)=>{
        let desc = descrip.value
        if (desc.length<5){
            descrip.classList.remove("acepted");
            descrip.classList.add("danger");
            errores.productDescription = 1;
            return
        }
        
        descrip.classList.remove("danger");
        descrip.classList.add("acepted");
        errores.productDescription = 0;
    })

    // Image
    let eimageFormat = "";
    image.addEventListener("change",()=>{
        if(eimage){
            eimage.remove();
        }

        let imagen = image.value;
        let imageExtension = imagen.substring(imagen.lastIndexOf(".")+1,imagen.length);

        if(imageExtension != "jpg" && 
            imageExtension != "jpeg" &&
            imageExtension != "png" &&
            imageExtension != "webp" ){
                if(!eimageFormat){
                    image.insertAdjacentHTML("afterend",
                    "<div id=eimageFormat class=danger-text><p>* Los formatos válidos de imagen son: .jpg .jpeg .png o .webp</p></div>")
                    eimageFormat = document.getElementById("eimageFormat");
                    errores.productImage = 1;
                    return eimageFormat
                }
                eimageFormat.style.display="block";
                errores.productImage = 1;
                return
            }
            else{
                if(eimageFormat){
                    eimageFormat.style.display="none";
                }
            }
            errores.productImage = 0;
    })



    // SUBMIT
    let eimage = "";
    form.addEventListener("submit", (event)=>{
        event.preventDefault();

        // Image
        if(!errores.productImage){
            let imagen = image.value;
            if(!imagen){
                if(eimage==""){
                    image.insertAdjacentHTML("afterend",
                    "<div id=eimage class=danger-text><p>* Es necesasrio seleccionar una imagen para el producto</p></div>")
                    eimage = document.getElementById("eimage");
                    errores.productImage = 1;
                }else{
                    eimage.style.display = "block";
                    errores.productImage = 1;
                }
            }else{
                eimage ? eimage.style.display = "none" : null;
                errores.productImage = 0;
            }
        }

        

        // Name
        if(!errores.productName){
            if(!name.value){
                name.classList.add("danger");
                errores.productName=1;
            }else{
                name.classList.remove("danger");
                name.classList.add("acepted");
                errores.productName=0;
            }
        }

        // Price
        if(!errores.productPrice){
            if(!price.value){
                price.classList.add("danger");
                errores.productPrice = 1;
            }else{
                price.classList.remove("danger");
                price.classList.add("acepted");
                errores.productPrice = 0;
            }
        }

        // Category
        if(!errores.productCategory){
            if(!category.value){
                category.classList.add("danger");
                errores.productCategory = 1;
            }else{
                category.classList.remove("danger");
                category.classList.add("acepted");
                errores.productCategory = 0;
            }
        }

        // Description
        if(!errores.productDescription){
            if(!descrip.value){
                descrip.classList.add("danger");
                errores.productDescription = 1;
            }else{
                descrip.classList.remove("danger");
                descrip.classList.add("acepted");
                errores.productDescription = 0;
            }
        }


        let rtado = []
        for(const key in errores){
            errores[key]!=0 ? rtado.push(key) : null;
        }

        !rtado.length ? form.submit() : null;
    })
};