// Variables para la paginación
const table = document.querySelector(".table");
const tableBody = table.querySelector("tbody");
const itemsPerPage = 25;
let currentPage = 1;
let originalData = [];
let currentData = [];

// Función para renderizar los datos de la página actual
function renderPage() {
  // Limpiar el cuerpo de la tabla
  tableBody.innerHTML = "";

  // Obtener los datos correspondientes a la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = currentData.slice(startIndex, endIndex);

  // Iterar sobre los datos de los consultas de la página actual
  pageData.forEach((consulta) => {
    // Crear una nueva fila de la tabla
    const row = document.createElement("tr");

    // Agregar las celdas con los datos de la consulta a la fila
    const idCell = document.createElement("td");
    idCell.textContent = consulta[0].id;
    row.appendChild(idCell);


    let letraCedula = consulta[0].nacionalidad.charAt(0);
    const cedulaCell = document.createElement("td");
    cedulaCell.textContent = letraCedula +  "" + consulta[0].cedula;
    row.appendChild(cedulaCell);

    const nombreCompletoCell = document.createElement("td");
    nombreCompletoCell.textContent = consulta[0].paciente;
    row.appendChild(nombreCompletoCell);

    const pesoCell = document.createElement("td");
    pesoCell.textContent = consulta[0].peso;
    row.appendChild(pesoCell);

    const fechaCell = document.createElement("td");
    const fecha = new Date(consulta[0].fecha);
    const fechaFormateada = fecha.toISOString().split("T")[0];
    fechaCell.textContent = fechaFormateada;
    row.appendChild(fechaCell);

    //Ver Nota Evolutiva
    const accionNE = document.createElement("td");
    const seeLink = document.createElement("a");
    seeLink.className = "see";
    seeLink.style.cursor = "pointer";
    seeLink.innerHTML = '<i class="material-icons color-m">&#xe8f4;</i>';

    seeLink.addEventListener("click", () => {
      const idConsulta = seeLink.closest("tr").firstElementChild.textContent;
      mostrarModalNotaEvolutiva(idConsulta); // Llamada a la función para mostrar el modal
    });

    accionNE.appendChild(seeLink);
    row.appendChild(accionNE);

    //Ver Indicaciones y Recipe
    const accionesCell = document.createElement("td");
    const seeLink2 = document.createElement("a");
    seeLink2.className = "see";
    seeLink2.style.cursor = "pointer";
    seeLink2.innerHTML = '<i class="material-icons color-m">&#xe8f4;</i>';

    seeLink2.addEventListener("click", () => {
      const idConsulta = seeLink2.closest("tr").firstElementChild.textContent;
      mostrarModalDocumentos(idConsulta); // Llamada a la función para mostrar el modal
    });

    accionesCell.appendChild(seeLink2);
    row.appendChild(accionesCell);
    tableBody.appendChild(row);
  });

  updatePagination();
}

// Función para actualizar los enlaces de paginación
function updatePagination() {
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginationContainer = document.querySelector(".pagination");

  paginationContainer.innerHTML = "";

  const maxVisiblePages = 20;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage = currentPage - halfVisiblePages;
  let endPage = currentPage + halfVisiblePages;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(maxVisiblePages, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  // Botón anterior
  const prevButton = document.createElement("li");
  prevButton.className = "page-item";
  const prevLink = document.createElement("a");
  prevLink.className = "page-link";
  prevLink.href = "#";
  prevLink.textContent = "Anterior";
  prevLink.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
      updatePagination();
    }
  });

  prevButton.appendChild(prevLink);
  paginationContainer.appendChild(prevButton);

  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement("li");
    pageLink.className = "page-item";

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    const pageButton = document.createElement("a");
    pageButton.className = "page-link";
    pageButton.href = "#";
    pageButton.textContent = i;

    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderPage();
      updatePagination();
    });

    pageLink.appendChild(pageButton);
    paginationContainer.appendChild(pageLink);
  }

  // Botón siguiente
  const nextButton = document.createElement("li");
  nextButton.className = "page-item";
  const nextLink = document.createElement("a");
  nextLink.className = "page-link";
  nextLink.href = "#";
  nextLink.textContent = "Siguiente";

  nextLink.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
      updatePagination();
    }
  });

  nextButton.appendChild(nextLink);
  paginationContainer.appendChild(nextButton);
}

// Realizar la llamada fetch al endpoint api/consultas
fetch("http://localhost:8080/api/consultas", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json(); // Parsear la respuesta JSON
    } else {
      throw new Error("Error al obtener los consultas");
    }
  })
  .then((data) => {
    // Guardar los datos obtenidos en originalData y currentData
    originalData = data;
    currentData = data;

    // Renderizar la página inicial
    renderPage();
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const consultaInput = document.querySelector(
  'input[aria-label="Text input with checkbox"]'
);

consultaInput.addEventListener("input", () => {
  filtrarconsultas();
});

consultaInput.addEventListener("change", () => {
  filtrarconsultas();
});

function filtrarconsultas() {
  const filtro = consultaInput.value.toLowerCase(); // Obtener el filtro en minúsculas

  if (filtro === "") {
    // Si el filtro está vacío, restaurar los datos originales
    currentData = originalData;
  } else {
    // Filtrar los consultas según el filtro
    currentData = originalData.filter((consulta) => {
      const nombreCompleto = consulta[0].paciente.toLowerCase();
      const cedula = consulta[0].cedula.toLowerCase();
      return nombreCompleto.includes(filtro) || cedula.includes(filtro);
    });
  }

  // Renderizar la página y actualizar la paginación
  renderPage();
  updatePagination();
}


//Métdo para mostrar el modal de la nota evolutiva
function mostrarModalNotaEvolutiva(idConsulta) {

  fetch(`http://localhost:8080/api/consultas/nota/${idConsulta}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parsear la respuesta JSON
      } else {
        throw new Error("Error al obtener la nota evolutiva de la consulta");
      }
    })
    .then((data) => {
      
      if (data.length > 0) {
        // Obtener el modal y los elementos del modal
        const modal = document.getElementById("modalNota");
        const nota = modal.querySelector(".nota-modal");

        // Mostrar los datos en el modal con formato (usar innerHTML directamente)
        nota.textContent = data[0] || "No hay datos disponibles";

        // Mostrar el modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Agregar evento para cerrar el modal al hacer clic en el botón de cerrar
        const closeButton = modal.querySelector(".btn-close");
        closeButton.addEventListener("click", () => {
          bsModal.hide();
        });
      } else {
        alert("No se encontraron datos para esta consulta.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Métdo para mostrar el modal de recipe e indicaciones
function mostrarModalDocumentos(idConsulta) {

  fetch(`http://localhost:8080/api/consultas/detalle/${idConsulta}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parsear la respuesta JSON
      } else {
        throw new Error("Error al obtener los detalles de la consulta");
      }
    })
    .then((data) => {
      
      if (data.length > 0) {
        // Obtener el modal y los elementos del modal
        const modal = document.getElementById("modalDocumentos");
        const recipe = modal.querySelector(".recipe-modal");
        const indicaciones = modal.querySelector(".indicaciones-modal");

        // Mostrar los datos en el modal con formato (usar innerHTML directamente)
        recipe.innerHTML = data[0][0] || "No hay datos disponibles";
        indicaciones.innerHTML = data[0][1] || "No hay datos disponibles";

        // Mostrar el modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Agregar evento para cerrar el modal al hacer clic en el botón de cerrar
        const closeButton = modal.querySelector(".btn-close");
        closeButton.addEventListener("click", () => {
          bsModal.hide();
        });
      } else {
        alert("No se encontraron datos para esta consulta.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
