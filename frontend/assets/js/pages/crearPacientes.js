// Obtén una referencia al botón de guardar
const guardarBtn = document.querySelector('#btn_guardar');

// Agrega un event listener al botón de guardar
guardarBtn.addEventListener('click', async function(event) {
  // Obtén los valores de los campos del formulario
  const cedula = document.getElementById('i_cedula').value;
  const fechaNacimiento = document.getElementById('i_fnac').value;
  const nombre = document.getElementById('i_nombre').value.toUpperCase();
  const apellido = document.getElementById('i_apellido').value.toUpperCase();
  const nacionalidad = document.getElementById('s_nacionalidad').value;
  const lugarNacimiento = document.getElementById('i_lnac').value.toUpperCase();
  const direccion = document.getElementById('i_direccion').value.toUpperCase();
  const telefono = document.getElementById('i_telefono').value;
  const email = document.getElementById('i_email').value.toUpperCase();
  const estadoCivil = document.getElementById('s_edocivil').value;
  const antecedentes = document.getElementById('ta_antecedentes').value.toUpperCase();
  const sexo = 'Femenino';

  // Verificar si algún campo está vacío
  if (
    cedula.trim() === '' ||
    fechaNacimiento.trim() === '' ||
    nombre.trim() === '' ||
    apellido.trim() === '' ||
    nacionalidad.trim() === '' ||
    lugarNacimiento.trim() === '' ||
    direccion.trim() === '' ||
    telefono.trim() === '' ||
    email.trim() === '' ||
    estadoCivil.trim() === '' ||
    antecedentes.trim() === ''
  ) {
    Swal.fire(
      '¡Campos vacíos!',
      'Por favor completa todos los campos.',
      'warning'
    );
    return; // Detener la ejecución si hay campos vacíos
  }

  try {
    // Realiza una solicitud POST al servidor con los datos del paciente
    const response = await fetch('http://localhost:8080/api/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        paciente: `${nombre} ${apellido}`,
        cedula,
        direccion,
        telefono,
        fecha_nacimiento: fechaNacimiento,
        lugar_nacimiento: lugarNacimiento,
        estado_civil: estadoCivil,
        nacionalidad,
        antecedentes,
        sexo,
        email,
        borrado: 0
      })
    });

    if (response.ok) {
      // Si la respuesta es exitosa, realiza las acciones necesarias
      // Restablece los valores de los campos del formulario si es necesario
      document.getElementById('i_cedula').value = '';
      document.getElementById('i_fnac').value = '';
      document.getElementById('i_nombre').value = '';
      document.getElementById('i_apellido').value = '';
      document.getElementById('s_nacionalidad').value = '';
      document.getElementById('i_lnac').value = '';
      document.getElementById('i_direccion').value = '';
      document.getElementById('i_telefono').value = '';
      document.getElementById('i_email').value = '';
      document.getElementById('s_edocivil').value = '';
      document.getElementById('ta_antecedentes').value = '';

      // Mostrar SweetAlert 2 de éxito
      Swal.fire(
        '¡Guardado!',
        'Los datos del paciente se han guardado correctamente.',
        'success'
      ).then(() => {
        window.location.href = 'pacientes.html';
      })
    } else {
      // Si la respuesta no es exitosa, mostrar SweetAlert 2 de error
      Swal.fire(
        '¡Error!',
        'Error al crear el paciente.',
        'error'
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


