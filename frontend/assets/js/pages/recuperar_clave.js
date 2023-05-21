const lupa = document.getElementById('lupa');
const segundoFormulario = document.querySelector('form.d-none');

lupa.addEventListener('click', function (event) {
  const username = document.getElementById('username').value;

  fetch('http://localhost:8080/api/usuarios/recuperar_clave/' + username, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {

        if(!segundoFormulario.classList.contains("d-none")){segundoFormulario.classList.add('d-none');}

        throw new Error('Error en la solicitud');
      }
    })
    .then((data) => {
      const pregunta = data.pregunta; // Obtener la pregunta de seguridad de la respuesta JSON

      // Colocar la pregunta en el campo de entrada del segundo formulario
      document.getElementById('pregunta').value = pregunta;

      // Quitar la clase d-none del segundo formulario
      segundoFormulario.classList.remove('d-none');
    })
    .catch((error) => {
      console.error(error);
    });
});
