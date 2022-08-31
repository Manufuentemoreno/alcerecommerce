window.onload = function(){
    const form = document.querySelector("#register-form");

    const emailField =  document.querySelector("#emailField");
    const mail = document.querySelector("#email");

    const passwordField = document.querySelector("#passwordField")
    const password = document.querySelector("#password")

    const rePasswordField = document.querySelector("#rePasswordField");
    const rePassword = document.querySelector("#confirmPassword");

    const category = document.querySelector("#category");
    const name =  document.querySelector("#name");
    const lName =  document.querySelector("#last_name");
    const bDate =  document.querySelector("#birth_date"); 
    const photo = document.querySelector("#profil_photo");
    const formButtons = document.querySelector("#formButtons")

    let errors = {
        email: 0,
        password: 0,
        rePassword: 0,
        category: 0,
        name: 0,
        lName: 0,
        bDate: 0,
        photo: 0
    };

    // Email:
    let errorEmail = "";
    mail.addEventListener("blur",(e)=>{
        const email = mail.value;

        const emailIsValid = function (input) {
            return /\S+@\S+\.\S+/.test(input);
        };
        
        const validateEmail = (input) => {
            return String(input)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };

        if (!validateEmail(email)) {
            if (!errorEmail){
                emailField.insertAdjacentHTML("afterend",
                "<div id=errorEmail class=danger-text><p>* Dirección de mail inválida</p></div>")
                errorEmail = document.getElementById("errorEmail");
                emailField.classList.add("danger");
                errors.email = 1;
                return errorEmail;
            }
            errorEmail.style.display = "block"
            emailField.classList.remove("acepted")
            emailField.classList.add("danger")
            errors.email = 1;
            return
        }

        errorEmail ? errorEmail.style.display = "none" : null;
        emailField.classList.remove("danger");
        emailField.classList.add("acepted");
        errors.email = 0;
        
    });

    // Password:
    let errorPass = "";
    password.addEventListener("blur",()=>{
        userPass = password.value;

        if(userPass.length < 8){
            if(!errorPass){
                passwordField.insertAdjacentHTML("afterend",
                "<div id=errorPass class=danger-text><p>* La contraseña debe tener más de 8 caracteres</p></div>")
                errorPass = document.getElementById("errorPass");
                passwordField.classList.add("danger");
                errors.password = 1;
                return errorPass;
            }
            errorPass.style.display = "block";
            passwordField.classList.remove("acepted");
            passwordField.classList.add("danger");
            errors.password = 1;
            return
        }

        errorPass ? errorPass.style.display = "none" : null;
        passwordField.classList.remove("danger");
        passwordField.classList.add("acepted");
        errors.password = 0;
    });

    // Confirm Password:
    let errorRePass = "";
    rePassword.addEventListener("blur",()=>{
        userRePass = rePassword.value;

        if(userRePass != password.value || userRePass.length < 8){
            if(!errorRePass){
                rePasswordField.insertAdjacentHTML("afterend",
                "<div id=errorRePass class=danger-text><p>* Las contraseñas no coinciden</p></div>")
                errorRePass = document.getElementById("errorRePass");
                rePasswordField.classList.remove("acepted");
                rePasswordField.classList.add("danger");
                errors.rePassword = 1;
                return errorRePass;
            }
            errorRePass.style.display = "block";
            rePasswordField.classList.remove("acepted");
            rePasswordField.classList.add("danger");
            errors.rePassword = 1;
            return
        }

        errorRePass ? errorRePass.style.display = "none" : null;
        rePasswordField.classList.remove("danger");
        rePasswordField.classList.add("acepted");
        errors.rePassword = 0;
    });

    password.addEventListener("change",()=>{
        userRePass = rePassword.value;

        if(userRePass != password.value || userRePass.length < 8){
            if(!errorRePass){
                rePasswordField.insertAdjacentHTML("afterend",
                "<div id=errorRePass class=danger-text><p>* Las contraseñas no coinciden</p></div>")
                errorRePass = document.getElementById("errorRePass");
                rePasswordField.classList.add("danger");
                errors.rePassword = 1;
                return errorRePass;
            }
            errorRePass.style.display = "block";
            rePasswordField.classList.remove("acepted");
            rePasswordField.classList.add("danger");
            errors.rePassword = 1;
            return
        }

        errorRePass ? errorRePass.style.display = "none" : null;
        rePasswordField.classList.remove("danger");
        rePasswordField.classList.add("acepted");
        errors.rePassword = 0;
    });

    // Category:
    category.addEventListener("change",()=>{
        category.classList.remove("danger");
        category.classList.add("acepted");
        errors.category = 0;
    })

    // Name:
    name.addEventListener("keyup",()=>{
        name.classList.remove("danger");
        name.classList.add("acepted");
        errors.name = 0;
    });

    // LastName:
    lName.addEventListener("keyup",()=>{
        if(lName.value.length > 2){
            lName.classList.remove("danger");
            lName.classList.add("acepted");
            errors.lName = 0;
            return
        }
        lName.classList.remove("acepted");
        lName.classList.add("danger");
        
    });

    // BDate:
    bDate.addEventListener("change",()=>{
        if ( errors.bDate ){
            bDate.classList.remove("danger");
            bDate.classList.add("acepted");
            errors.bDate = 0;
        }
    });

    // Photo:
    let eimageFormat = "";
    photo.addEventListener("change",()=>{

        let image = photo.value;
        let imageExtension = image.substring(image.lastIndexOf(".")+1,image.length);

        if(imageExtension != "jpg" && 
            imageExtension != "jpeg" &&
            imageExtension != "png" &&
            imageExtension != "webp" ){
                if(!eimageFormat){
                    photo.insertAdjacentHTML("afterend",
                    "<div id=eimageFormat class=danger-text><p>* Los formatos válidos de imagen son: .jpg .jpeg .png o .webp</p></div>")
                    eimageFormat = document.getElementById("eimageFormat");
                    errors.photo = 1;
                    return eimageFormat
                }
                eimageFormat.style.display="block";
                errors.photo = 1;
                return
            }
            else{
                if(eimageFormat){
                    eimageFormat.style.display="none";
                }
                errors.photo = 0;
                photo.classList.remove("danger");
            }

        if ( errors.photo ){
            photo.classList.remove("danger");
            errors.photo = 0;
        }
    });

    // Submit
    let submitError = ""
    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        let result = []
        for(const key in errors){
            errors[key]!=0 ? result.push(key) : null;
        }

        if(result.length){
            submitError ? submitError.remove() : null;
            formButtons.insertAdjacentHTML("beforebegin",
                "<div id=submitError class=danger-text><p>* Hay campos con errores</p></div>");
            submitError = document.querySelector("#submitError")
            return submitError;
        }
        
        // EMail
        if (!mail.value || errors.email){
            emailField.classList.add("danger");
            errors.email = 1;
        }else{
            emailField.classList.remove("danger");
            errors.email = 0;
        }

        // Password
        if (!password.value || errors.password){
            passwordField.classList.add("danger");
            errors.password = 1;
        }else{
            passwordField.classList.remove("danger");
            passwordField.classList.add("acepted");
            errors.password = 0;
        }

        // Confirm Password
        if (!rePassword.value || errors.rePassword){
            rePasswordField.classList.remove("acepted");
            rePasswordField.classList.add("danger");
            errors.rePassword = 1;
        }else{
            rePasswordField.classList.remove("danger");
            rePasswordField.classList.add("acepted");
            errors.rePassword = 0;
        }

        // Category
        if (!category.value){
            category.classList.add("danger");
            errors.category = 1;
        }else{
            category.classList.remove("danger");
            category.classList.add("acepted");
            errors.category = 0;
        }

        // Name
        if (!name.value){
            name.classList.add("danger");
            errors.name = 1;
        }else{
            name.classList.remove("danger");
            name.classList.add("acepted");
            errors.name = 0;
        }

        // Last Name
        if (!lName.value){
            lName.classList.add("danger");
            errors.lName = 1;
        }else{
            lName.classList.remove("danger");
            lName.classList.add("acepted");
            errors.lName = 0;
        }

        // B Date
        if (!bDate.value){
            bDate.classList.add("danger");
            errors.lName = 1;
            
        }else{
            bDate.classList.remove("danger");
            bDate.classList.add("acepted");
            errors.lName = 0;
        }

        // // Image
        // if (!photo.value){
        //     photo.classList.add("danger");
        //     errors.photo = 1;
            
        // }else{
        //     photo.classList.remove("danger");
        //     photo.classList.add("acepted");
        //     errors.photo = 0;
        // }

        result = []
        for(const key in errors){
            errors[key]!=0 ? result.push(key) : null;
        };

        if(result.length){
            formButtons.insertAdjacentHTML("beforebegin",
                "<div id=submitError class=danger-text><p>* Completá los campos obligatorios</p></div>");
            submitError = document.querySelector("#submitError")
            return submitError;
        }

        submitError ? submitError.remove() : null;
        form.submit();

    })

}