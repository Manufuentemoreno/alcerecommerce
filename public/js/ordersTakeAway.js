window.onload = function () {
    let ordenesEnPreparacionSection = document.querySelector('#ordenesenPreparacionSection');
    let ordenesListasSection = document.querySelector("#ordenesListasSection");
    let ordenesRetiradasSection = document.querySelector('#ordenesRetiradasSection');
    
    const trsEnPreparacion = document.querySelectorAll("#ordenesenPreparacionSection tr");
    const trsListas = document.querySelectorAll('#ordenesListasSection tr');
    const trsRetiradas = document.querySelectorAll("#ordenesRetiradasSection tr");

    let selectedForm
    let selectedForm2
    let selectedForm3

    // --- Sections ---

    ordenesEnPreparacionSection.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    ordenesEnPreparacionSection.addEventListener("drop", (e) => {
      console.log("drop");
      selectedForm.submit();
    });
    
    ordenesListasSection.addEventListener('dragover', (e) => {
        e.preventDefault();
    })
    ordenesListasSection.addEventListener('drop', (e) => {
        console.log('drop')
        
        if(selectedForm) {
            selectedForm.submit();
        }
        if(selectedForm3) {
            selectedForm3.submit();
        }
    })

    ordenesRetiradasSection.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    ordenesRetiradasSection.addEventListener("drop", (e) => {
      console.log("drop");
      selectedForm2.submit();
    });

    // --- TRs ---

    trsEnPreparacion.forEach(item => {
        item.addEventListener('dragstart', dragStart1);
    })
    trsEnPreparacion.forEach(item => {
        item.addEventListener('dragend', dragEnd);
    })

    trsListas.forEach((item) => {
      item.addEventListener("dragstart", dragStart2);
    });
    trsListas.forEach((item) => {
      item.addEventListener("dragend", dragEnd);
    });

    trsRetiradas.forEach((item) => {
      item.addEventListener("dragstart", dragStart3);
    });
    trsRetiradas.forEach((item) => {
      item.addEventListener("dragend", dragEnd);
    });

    // --- Funciones ---

    function dragStart1 () {
        this.classList.add("trShadow", "fade-out-dd");
        selectedForm = this.querySelector("#ordenEnPrepForm");
    }
    function dragStart2() {
      this.classList.add("trShadow", "fade-out-dd");
      selectedForm = this.querySelector("#ordenListaForm");
      selectedForm2 = this.querySelector("#ordenListaFormCheck");
    }
    function dragStart3() {
      this.classList.add("trShadow", "fade-out-dd");
      selectedForm3 = this.querySelector("#ordenRetiradaForm");
    }
    function dragEnd () {
        this.classList.remove("trShadow", "fade-out-dd");
    }
}