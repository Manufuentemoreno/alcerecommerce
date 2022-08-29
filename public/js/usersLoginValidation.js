window.onload = function() {
    let form = document.querySelector('#loginForm');
    let inputEmail = document.querySelector('#email');
    let inputPassword = document.querySelector('#password');

    let errores = [];

    inputEmail.addEventListener('blur', function() {
        
        function emailIsValid(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        let email = inputEmail.value;
        if (!emailIsValid(email)) {
            errores.push('Debe escribir un email válido.')
        } else {
          errores = [];
        }

        if (errores.length > 0) {

          let ulErrores = document.querySelector("div.errores ul");

          for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML =
              "<li>" +
              "<i class='fa-solid fa-triangle-exclamation'></i>" +
              errores[i] +
              "</li>";
          }
        }
    })

    form.addEventListener('submit', function(e) {
      //Validaciones email
      if (inputEmail.value == "") {
        errores.push("Debe escribir un email.");
      }

      //Validaciones password
      if (inputPassword.value == "") {
        errores.push("Debe escribir una constraseña.");
      }

      if (errores.length > 0) {
        e.preventDefault();

        let ulErrores = document.querySelector('div.errores ul');
        
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML +=
              "<li>" +
              "<i class='fa-solid fa-triangle-exclamation'></i>" +
              errores[i] +
              "</li>";
        }
      }
    })
}