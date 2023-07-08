// Obtener la URL actual
let currentUrl = window.location.href;

// Verificar si la URL no sigue el patrón "/paciente.html?cedula=..."
if (!currentUrl.match(/\/paciente.html\?cedula=\d+/)) {
  // Redireccionar a "pacientes.html"
  window.location.href = "pacientes.html";
} else {
  // Obtener el valor de la cédula de la URL
  let urlParams = new URLSearchParams(window.location.search);
  let cedula = urlParams.get("cedula");

  // Validar que la cédula solo contenga números y no esté en blanco
  if (/^\d+$/.test(cedula) && cedula.trim() !== "") {
    // Llamar a la función para obtener los datos del paciente
    obtenerDatosPaciente(cedula);
  } else {
    // Redireccionar a "pacientes.html" si la cédula no es válida
    window.location.href = "pacientes.html";
  }
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
      // Llenar los campos del formulario con los datos del paciente
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

      // Aquí puedes realizar cualquier otra acción necesaria con los datos del paciente
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
