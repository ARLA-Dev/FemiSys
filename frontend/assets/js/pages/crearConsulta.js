// Obtén una referencia al elemento HTML donde se mostrarán los datos del paciente
const nombreElement = document.getElementById("h3_nombre");
const cedulaElement = document.getElementById("span_ci");
const numConsultaElement = document.getElementById("h6_numConsulta");

// Función para obtener los datos del paciente
async function obtenerDatosPaciente(cedula) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/pacientes/${cedula}/consulta`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      llenarDatosPaciente(data);
    } else {
      alert("Error al obtener los datos del paciente");
    }
  } catch (error) {
    alert("Error:", error);
  }
}

// Función para llenar los datos del paciente en el HTML
function llenarDatosPaciente(data) {
  nombreElement.textContent = data.paciente;
  cedulaElement.textContent = data.cedula;
  numConsultaElement.textContent = `Esta es mi consulta N°${
    data.cantidadConsultas + 1
  }`;
}

// Obtén la cédula del paciente de la URL
const urlParams = new URLSearchParams(window.location.search);
const cedula = urlParams.get("cedula");

if (/^\d+$/.test(cedula) && cedula.trim() !== "") {
  obtenerDatosPaciente(cedula);
  const fechaConsultaElement = document.getElementById("i_fcon");

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  function obtenerFechaActual() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    let month = fechaActual.getMonth() + 1;
    let day = fechaActual.getDate();

    // Añade un cero al mes y al día si son menores que 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  // Establece la fecha actual como valor por defecto en el campo de fecha de la consulta
  fechaConsultaElement.value = obtenerFechaActual();
} else {
  window.location.href = "pacientes.html";
}
