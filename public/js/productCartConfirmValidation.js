window.onload = function(){
    const envio = document.querySelector("#delivery_method");
    const envioForm = document.querySelector("#envio-form");

    const pago = document.querySelector("#payment_method");
    const cardForm = document.querySelector("#card-form");

    const createForm = document.querySelector("#createForm");


    envio.value == "envio" ? envioForm.style.display = "flex" :  envioForm.style.display = "none";
    pago.value == "tarjeta" ? cardForm.style.display = "flex" :  cardForm.style.display = "none" ;

    envio.addEventListener("change", ()=>{
        envio.value == "envio" ? envioForm.style.display = "flex" : envioForm.style.display = "none" ;
    })

    pago.addEventListener("change", ()=>{
        if (pago.value == "tarjeta") {
            cardForm.style.display = "flex"
        }
        else if (pago.value == 'mercadoPago') {
            createForm.action = '/cart/checkoutMP'
        } else {
            cardForm.style.display = "none";
        }
    })


    // map

    // const calle = document.querySelector("#calle");
    // const numero = document.querySelector("#numero");
    // const localidad = document.querySelector("#localidad");

    // localidad.addEventListener("change",()=>{
    //     let selected = 0;
    //     calle && numero && localidad ? selected = 1 : selected = 0;
 
    //     if(selected){

    //         let apiKey = "AIzaSyA3IaMXNU-OsZnaEOxgrPwqR9s18vQoDMM"

    //         localidad.insertAdjacentHTML("afterend",
    //         `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13140.004924816438!2d-58.57921956044924!3d-34.57883539999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9da1f7ec595%3A0xfa308d8e4210c155!2sInstituto%20La%20Salle%20San%20Mart%C3%ADn%20Nivel%20Secundario!5e0!3m2!1ses-419!2sar!4v1662506628759!5m2!1ses-419!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`)
    //     }
    // })
    

};