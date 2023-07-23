let currentUrl = window.location.href;

if (!currentUrl.match(/\/paciente.html\?cedula=\d+/)) {
  window.location.href = "pacientes.html";
} else {
  let urlParams = new URLSearchParams(window.location.search);
  let cedula = urlParams.get("cedula");

  if (/^\d+$/.test(cedula) && cedula.trim() !== "") {
    obtenerDatosPaciente(cedula);
    obtenerConsultasPaciente(cedula);
  } else {
    window.location.href = "pacientes.html";
  }
}

function obtenerConsultasPaciente(cedula) {
  fetch(`http://localhost:8080/api/consultas/${cedula}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parsear la respuesta JSON
      } else {
        throw new Error("Error al obtener las consultas del paciente");
      }
    })
    .then((data) => {
      // Obtener la tabla de consultas
      let tablaConsultas = document.querySelector(".table tbody");

      // Limpiar el contenido actual de la tabla
      tablaConsultas.innerHTML = "";

      // Ordenar las consultas por fecha en orden descendente
      data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      // Variables para la paginación
      const itemsPerPage = 10;
      let currentPage = 1;
      let currentData = data;

      // Función para renderizar los datos de la página actual
      function renderPage() {
        // Limpiar el cuerpo de la tabla
        tablaConsultas.innerHTML = "";

        // Obtener los datos correspondientes a la página actual
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = currentData.slice(startIndex, endIndex);

        // Iterar sobre los datos de las consultas de la página actual
        pageData.forEach((consulta, index) => {
          let fila = document.createElement("tr");

          let numeroConsulta = document.createElement("td");
          numeroConsulta.textContent = currentData.length - startIndex - index;
          fila.appendChild(numeroConsulta);

          let fecha = document.createElement("td");
          let fechaConsulta = new Date(consulta.fecha);
          let fechaFormateada = fechaConsulta.toISOString().split("T")[0];
          fecha.textContent = fechaFormateada;
          fila.appendChild(fecha);

          let peso = document.createElement("td");
          peso.textContent = consulta.peso;
          fila.appendChild(peso);

          let notaEvolutiva = document.createElement("td");
          notaEvolutiva.textContent = consulta.nota_evolutiva;
          fila.appendChild(notaEvolutiva);

          let documentos = document.createElement("td");
          let verDocumentos = document.createElement("a");
          verDocumentos.className = "see";
          verDocumentos.style.cursor = "pointer";
          verDocumentos.setAttribute("data-toggle", "modal");
          verDocumentos.setAttribute("data-target", "#modalDocumentos");
          verDocumentos.innerHTML =
            '<i class="material-icons color-m">&#xe8f4;</i>';
          documentos.appendChild(verDocumentos);
          fila.appendChild(documentos);

          tablaConsultas.appendChild(fila);
        });

        // Actualizar la paginación
        updatePagination();
      }

      // Función para actualizar los enlaces de paginación
      function updatePagination() {
        const totalPages = Math.ceil(currentData.length / itemsPerPage);
        const paginationContainer = document.querySelector(".pagination");

        paginationContainer.innerHTML = "";

        const maxVisiblePages = 5;
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

      // Renderizar la página inicial
      renderPage();

      const filtradoInput = document.getElementById("filtrado");

      filtradoInput.addEventListener("input", () => {
        const filtro = filtradoInput.value.trim().toLowerCase();
        currentData = data.filter((consulta) => {
          const fecha = consulta.fecha.toLowerCase();
          return fecha.includes(filtro);
        });

        // Actualizar la página y la paginación con los nuevos datos filtrados
        currentPage = 1;
        renderPage();
        updatePagination();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function obtenerDatosPaciente(cedula) {
  fetch(`http://localhost:8080/api/pacientes/${cedula}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parsear la respuesta JSON
      } else {
        throw new Error("Error al obtener los datos del paciente");
      }
    })
    .then((data) => {
      document.getElementById("i_cedula").value = data.cedula;
      document.getElementById("i_fnac").value = formatDate(
        data.fecha_nacimiento
      );
      document.getElementById("i_nombre").value = data.paciente;
      document.getElementById("s_nacionalidad").value = data.nacionalidad;
      document.getElementById("i_lnac").value = data.lugar_nacimiento;
      document.getElementById("i_direccion").value = data.direccion;
      document.getElementById("i_telefono").value = data.telefono;
      document.getElementById("i_email").value = data.email;
      document.getElementById("s_edocivil").value = data.estado_civil;
      document.getElementById("ta_antecedentes").value = data.antecedentes;

      const agregarConsultaLink = document.querySelector(
        "#agregarConsultaEnlace"
      );
      agregarConsultaLink.href = `crearConsulta.html?cedula=${cedula}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const modificarBtn = document.querySelector("#btn_modificar");

modificarBtn.addEventListener("click", () => {
  const cedula = document.getElementById("i_cedula").value;
  const paciente = document.getElementById("i_nombre").value;
  const direccion = document.getElementById("i_direccion").value;
  const telefono = document.getElementById("i_telefono").value;
  const fechaNacimiento = document.getElementById("i_fnac").value;
  const lugarNacimiento = document.getElementById("i_lnac").value;
  const estadoCivil = document.getElementById("s_edocivil").value;
  const nacionalidad = document.getElementById("s_nacionalidad").value;
  const antecedentes = document.getElementById("ta_antecedentes").value;
  const sexo = "Femenino";
  const email = document.getElementById("i_email").value;

  fetch(`http://localhost:8080/api/pacientes/${cedula}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      paciente,
      direccion,
      telefono,
      fecha_nacimiento: fechaNacimiento,
      lugar_nacimiento: lugarNacimiento,
      estado_civil: estadoCivil,
      nacionalidad,
      antecedentes,
      sexo,
      email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Los datos del paciente se actualizaron correctamente.");
      } else {
        throw new Error("Error al modificar los datos del paciente.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
