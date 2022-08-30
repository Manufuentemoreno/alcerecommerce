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
          let pErrorEmail = document.querySelector('div.error-email ul');
          pErrorEmail.innerHTML =
            "<li>" +
            "<i class='fa-solid fa-triangle-exclamation'></i>" +
            'Email inválido' +
            "</li>";
        }
    })

    inputEmail.addEventListener('focus', function() {
      let pErrorEmail = document.querySelector('div.error-email ul');
      pErrorEmail.innerHTML = ''
    })

    form.addEventListener('submit', function(e) {
      //Validaciones email
      if (inputEmail.value == "") {
        e.preventDefault();
        let pErrorEmail = document.querySelector("div.error-email ul");
        pErrorEmail.innerHTML =
          "<li>" +
          "<i class='fa-solid fa-triangle-exclamation'></i>" +
          "Debe escribir su email" +
          "</li>";
      }

      //Validaciones password
      if (inputPassword.value == "") {
        e.preventDefault();
        let pErrorPassword = document.querySelector('div.error-password ul');
        pErrorPassword.innerHTML =
          "<li>" +
          "<i class='fa-solid fa-triangle-exclamation'></i>" +
          "Debe ingresar una contraseña" +
          "</li>";
      }

    })

    inputPassword.addEventListener('focus', function() {
      let pErrorPassword = document.querySelector('div.error-password ul');
      pErrorPassword.innerHTML = ''
    })
}