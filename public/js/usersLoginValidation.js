window.onload = function() {
    let form = document.querySelector('#loginForm');
    let mail = document.querySelector('#email');
    let emailField = document.querySelector("#emailField")

    let inputPassword = document.querySelector('#password');
    let passwordField = document.querySelector("#passwordField")
    let button = document.querySelector("#buttonSubmit")

    let errores = {
      email: 0,
      password: 0
    };

    // Email:
    mail.addEventListener("blur",(e)=>{
        const email = mail.value;
        
        const validateEmail = (input) => {
            return String(input)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };

        if(!email){
          emailField.classList.add("danger");
          errores.email = 1;
          return
        }
        else if (email && !validateEmail(email)) {
            if (!errorEmail){
                emailField.insertAdjacentHTML("afterend",
                "<div id=errorEmail class=danger-text><p>* Dirección de mail inválida</p></div>")
                errorEmail = document.getElementById("errorEmail");
                emailField.classList.add("danger");
                errores.email = 1;
                return errorEmail;
            }
            errorEmail.style.display = "block"
            emailField.classList.add("danger")
            errores.email = 1;
            return
        }

        emailField.classList.remove("danger");
        errores.email = 0;
        
    });

    // Password
    inputPassword.addEventListener("blur",()=>{
      if(!inputPassword.value){
        passwordField.classList.add("danger");
        errores.password = 1;
      }
    })

    inputPassword.addEventListener("keypress",()=>{
      if(!inputPassword.value){
        passwordField.classList.add("danger");
        errores.password = 1;
        return
      }
      else if(inputPassword.value.length < 7){
        passwordField.classList.add("danger");
        errores.password = 1;
        return
      }
      passwordField.classList.remove("danger");
      errores.password = 0;
    });

    button.addEventListener("click", (e)=>{
      e.preventDefault();

      if ( errores.password == 0 && errores.email == 0 ){
        form.submit();
      }
      
    });

}