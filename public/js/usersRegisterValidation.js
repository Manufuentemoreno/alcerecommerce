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
    const photo = document.querySelector("profil_photo");

    
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
                // errores.mail = 1;
                return errorEmail;
            }
            errorEmail.style.display = "block"
            emailField.classList.remove("acepted")
            emailField.classList.add("danger")
            return
        }

        errorEmail ? errorEmail.style.display = "none" : null;
        emailField.classList.remove("danger");
        emailField.classList.add("acepted");
        
    });

    // Password:
    let errorPass = "";
    password.addEventListener("keyup",()=>{
        userPass = password.value;

        if(userPass.length < 8){
            if(!errorPass){
                passwordField.insertAdjacentHTML("afterend",
                "<div id=errorPass class=danger-text><p>* La contraseña debe tener más de 8 caracteres</p></div>")
                errorPass = document.getElementById("errorPass");
                passwordField.classList.add("danger");
                // errores.mail = 1;
                return errorPass;
            }
            errorPass.style.display = "block"
            passwordField.classList.remove("acepted")
            passwordField.classList.add("danger")
            return
        }

        errorPass ? errorPass.style.display = "none" : null;
        passwordField.classList.remove("danger");
        passwordField.classList.add("acepted");
    });

    // Confirm Password:
    let errorRePass = "";
    rePassword.addEventListener("blur",()=>{
        userRePass = rePassword.value;

        if(userRePass != password.value){
            if(!errorRePass){
                rePasswordField.insertAdjacentHTML("afterend",
                "<div id=errorRePass class=danger-text><p>* Las contraseñas no coinciden</p></div>")
                errorRePass = document.getElementById("errorRePass");
                rePasswordField.classList.add("danger");
                // errores.mail = 1;
                return errorRePass;
            }
            errorRePass.style.display = "block"
            rePasswordField.classList.remove("acepted")
            rePasswordField.classList.add("danger")
            return
        }

        errorRePass ? errorRePass.style.display = "none" : null;
        rePasswordField.classList.remove("danger");
        rePasswordField.classList.add("acepted");
    });

    // Submit
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        
        if (!mail.value){
            emailField.classList.add("danger");
        }
    })

}