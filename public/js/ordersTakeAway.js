window.onload = function () {
    let ordenListaForm = document.querySelector('#ordenListaForm');
    let ordenesListasSection = document.querySelector("#ordenesListasSection");
    const trs = document.querySelectorAll("tr");

    let selectedForm
    
    ordenesListasSection.addEventListener('dragover', (e) => {
        e.preventDefault();
    })
    ordenesListasSection.addEventListener('drop', (e) => {
        console.log('drop')
        selectedForm.submit();
    })

    trs.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    })
    trs.forEach(item => {
        item.addEventListener('dragend', dragEnd);
    })

    function dragStart () {
        this.classList.add("trShadow", "fade-out");
        selectedForm = this.querySelector("form");
    }
    function dragEnd () {
        this.classList.remove("trShadow", "fade-out");
    }
}