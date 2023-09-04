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

  let letra = data.nacionalidad;
  letra = letra.charAt(0);
  nombreElement.textContent = data.paciente;
  cedulaElement.textContent = letra + "" + data.cedula;

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

//CREAR CONSULTA

// Obtén una referencia al botón de guardar
const guardarBtn = document.querySelector("#btn_guardar");

// Agrega un event listener al botón de guardar
guardarBtn.addEventListener("click", async function (event) {

  const cedula = urlParams.get("cedula");
  const fecha = document.getElementById("i_fcon").value;
  const notaEvolutiva = document.getElementById("ta_notaEvolutiva").value;
  const recipe = document.getElementById("text-recipe").innerText;
  const indicaciones = document.getElementById("text-indicaciones").innerText;
  const pesoInput = document.getElementById("i_peso");
  const peso = parseFloat(pesoInput.value.replace(",", "."));

  // Verificar si algún campo está vacío
  if (!cedula || isNaN(peso) || !fecha || !notaEvolutiva || !recipe.trim() || !indicaciones.trim()) {
    Swal.fire(
      "¡Campos vacíos!",
      "Por favor completa todos los campos para crear la consulta.",
      "warning"
    );
    return; 
  }

  if (isNaN(peso) || peso <= 0) {
    Swal.fire("¡Peso inválido!", "Por favor ingresa un peso válido mayor a 0.", "error");
    return; 
  }

  // Crea un objeto con los datos de la consulta en formato JSON
  const nuevaConsulta = {
    cedula,
    peso,
    fecha,
    nota_evolutiva: notaEvolutiva,
    recipe,
    indicaciones,
  };

  try {
    // Realiza una solicitud POST al servidor con los datos de la consulta
    const response = await fetch("http://localhost:8080/api/consultas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(nuevaConsulta),
    });

    if (response.ok) {
      // Si la respuesta es exitosa, muestra un mensaje con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Consulta creada exitosamente.",
        showCancelButton: true, // Muestra el botón de cancelar
        confirmButtonText: "Imprimir Documentos", // Texto del botón de confirmación
        cancelButtonText: "Finalizar", // Texto del botón de cancelar

      }).then((result) => {

        if (result.isConfirmed) {
          imprimirPDF(document.getElementById("span_ci").innerHTML, document.getElementById("i_fcon").value, document.getElementById("h3_nombre").textContent, document.getElementById("text-recipe").textContent, document.getElementById("text-indicaciones").textContent);
        } 
        else {
          const urlParams = new URLSearchParams(window.location.search);
          const cedula = urlParams.get("cedula");
          window.location.href = `/paciente.html?cedula=${cedula}`;
        }
      });
    } else {
      // Si la respuesta no es exitosa, mostrar SweetAlert 2 de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear la consulta.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al crear la consulta.",
    });
  }
});

function imprimirPDF(cedula, fecha, nombre_paciente, recipe, indicaciones) {
  window.jsPDF = window.jspdf.jsPDF;
  const pdf = new jsPDF({
    unit: 'in',
    format: [8.5, 5.5],
    orientation: 'landscape',
    margin: 0.25,
  });

  const imageUrl = "./assets/images/recipe/header.jpg";
  const footerImageUrl = "./assets/images/recipe/footer.jpg";
  const imageWidth = pdf.internal.pageSize.getWidth() / 2 - 0.5;
  const img = new Image();
  img.src = imageUrl;

  img.onload = function () {
    const imageHeight = (img.height * imageWidth) / img.width;
    const cedulaNacionalidad = cedula;
    const nombrePaciente = nombre_paciente;
    const fechaConsulta = fecha;
    const indicacionesPaciente = indicaciones;
    const recipePaciente = recipe;

    // Columna izquierda (Recipe)
    pdf.addImage(imageUrl, 'JPEG', 0.25, 0.25, imageWidth, imageHeight);
    let y = imageHeight + 0.4;

    pdf.setFontSize(8); // Tamaño de letra más pequeño
    pdf.text(`Nombre: ${nombrePaciente}`, 0.25, y);
    y += 0.2;
    pdf.text(`Cedula: ${cedulaNacionalidad}`, 0.25, y);
    y += 0.2;
    pdf.text(`Fecha: ${fechaConsulta}`, 0.25, y);

    y += 0.4;

    pdf.setFontSize(10); // Restaurar el tamaño de letra para el título
    pdf.text('RECIPE', 0.25, y);
    y += 0.05;
    pdf.setLineWidth(0.01);
    pdf.line(0.25, y, 3.75, y);
    y += 0.1;

    // Texto del Recipe
    pdf.setFontSize(8); // Tamaño de letra más pequeño
    const recipePlainText = stripHtml(recipe);
    const splitRecipe = pdf.splitTextToSize(recipePlainText, 3.5);
    pdf.text(0.25, y, splitRecipe);

    // Agregar imagen de footer en la columna izquierda (Recipe)
    const footerImgWidth = 4;
    const footerImgHeight = (.5 * footerImgWidth) / 4;
    pdf.addImage(footerImageUrl, 'JPEG', 0.25, pdf.internal.pageSize.getHeight() - footerImgHeight - 0.25, footerImgWidth, footerImgHeight);

    // Columna derecha (Indicaciones)
    pdf.addImage(imageUrl, 'JPEG', pdf.internal.pageSize.getWidth() / 2 + 0.25, 0.25, imageWidth, imageHeight);
    y = imageHeight + 0.4;

    pdf.setFontSize(8); // Tamaño de letra más pequeño
    pdf.text(`Nombre: ${nombrePaciente}`, pdf.internal.pageSize.getWidth() / 2 + 0.25, y);
    y += 0.2;
    pdf.text(`Cedula: ${cedulaNacionalidad}`, pdf.internal.pageSize.getWidth() / 2 + 0.25, y);
    y += 0.2;
    pdf.text(`Fecha: ${fechaConsulta}`, pdf.internal.pageSize.getWidth() / 2 + 0.25, y);

    y += 0.4;

    pdf.setFontSize(10); // Restaurar el tamaño de letra para el título
    pdf.text('INDICACIONES', pdf.internal.pageSize.getWidth() / 2 + 0.25, y);
    y += 0.05;
    pdf.setLineWidth(0.01);
    pdf.line(pdf.internal.pageSize.getWidth() / 2 + 0.25, y, pdf.internal.pageSize.getWidth() - 0.25, y);
    y += 0.1;

    // Texto de las Indicaciones
    pdf.setFontSize(8); // Tamaño de letra más pequeño
    const indicacionesPlainText = stripHtml(indicaciones);
    const splitIndicaciones = pdf.splitTextToSize(indicacionesPlainText, 3.5);
    pdf.text(pdf.internal.pageSize.getWidth() / 2 + 0.25, y, splitIndicaciones);

    // Agregar imagen de footer en la columna derecha (Indicaciones)
    pdf.addImage(footerImageUrl, 'JPEG', pdf.internal.pageSize.getWidth() / 2 + 0.25, pdf.internal.pageSize.getHeight() - footerImgHeight - 0.25, footerImgWidth, footerImgHeight);

    // Abrir el PDF en una nueva ventana sin opción de guardar
    pdf.output('dataurlnewwindow');

    setTimeout(function () {
      const urlParams = new URLSearchParams(window.location.search);
      const cedula = urlParams.get("cedula");
      window.location.href = `/paciente.html?cedula=${cedula}`;
    }, 1000); // Cambia el valor del retraso según tus necesidades
  };
}

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;

  // Reemplaza las etiquetas de salto de línea <br> con saltos de línea reales
  tmp.querySelectorAll('br').forEach((br) => {
    const newline = document.createTextNode('\n');
    br.parentNode.replaceChild(newline, br);
  });

  return tmp.textContent || tmp.innerText || "";
}


