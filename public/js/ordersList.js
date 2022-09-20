window.onload = function () {
    let ordenesEnPreparacionSection = document.querySelector('#ordenesenPreparacionSection');
    let ordenesListasSection = document.querySelector("#ordenesListasSection");
    let ordenesRetiradasSection = document.querySelector('#ordenesRetiradasSection');
    
    const trsEnPreparacion = document.querySelectorAll("#ordenesenPreparacionSection tr");
    const trsListas = document.querySelectorAll('#ordenesListasSection tr');
    const trsRetiradas = document.querySelectorAll("#ordenesRetiradasSection tr");

    let enPrepCheck
    let listasCheck
    let listasBack
    let retiradasBack

    // --- Sections ---

    ordenesEnPreparacionSection.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    ordenesEnPreparacionSection.addEventListener("drop", (e) => {
      console.log("drop");

      if(enPrepCheck) {
        enPrepCheck = ''
      }

      listasBack.submit();
    });
    
    ordenesListasSection.addEventListener('dragover', (e) => {
        e.preventDefault();
    })
    ordenesListasSection.addEventListener('drop', (e) => {
        console.log('drop')
        
        if(enPrepCheck) {
          enPrepCheck.submit();
        }
        if(retiradasBack) {
          retiradasBack.submit();
        }

        if(listasBack) {
          listasBack = ''
        }
        if(listasCheck) {
          listasCheck = ''
        }
    })

    ordenesRetiradasSection.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    ordenesRetiradasSection.addEventListener("drop", (e) => {
      console.log("drop");

      if(retiradasBack) {
        retiradasBack = ''
      }
      
      listasCheck.submit();
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
        enPrepCheck = this.querySelector("#ordenEnPrepForm");
    }
    function dragStart2() {
      this.classList.add("trShadow", "fade-out-dd");
      listasBack = this.querySelector("#ordenListaForm");
      listasCheck = this.querySelector("#ordenListaFormCheck");
    }
    function dragStart3() {
      this.classList.add("trShadow", "fade-out-dd");
      retiradasBack = this.querySelector("#ordenRetiradaForm");
    }
    function dragEnd () {
        this.classList.remove("trShadow", "fade-out-dd");
    }
}