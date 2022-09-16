window.onload = function(){
    const loginPop = document.querySelector("#back-login");
    const loginForm = document.querySelector("#loginFormTop")
    const loginButton = document.getElementById("select-login");
    const leaveForm = document.getElementById("leave-form");


    loginButton.addEventListener("click", (e)=>{
        e.preventDefault()
        console.log("login");

        loginPop.classList.add("mostrar-login-container-topbar");
        loginForm.classList.add("mostrar-login-topbar");
    })

    leaveForm.addEventListener("click", ()=>{
        loginPop.classList.remove("mostrar-login-container-topbar");
        loginForm.classList.remove("mostrar-login-topbar");
    })    
};