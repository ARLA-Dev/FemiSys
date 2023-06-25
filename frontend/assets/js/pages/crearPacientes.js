// Obtén una referencia al botón de guardar
const guardarBtn = document.querySelector('#btn_guardar');

// Agrega un event listener al botón de guardar
guardarBtn.addEventListener('click', async function(event) {
  // Obtén los valores de los campos del formulario
  const cedula = document.getElementById('i_cedula').value;
  const fechaNacimiento = document.getElementById('i_fnac').value;
  const nombre = document.getElementById('i_nombre').value;
  const apellido = document.getElementById('i_apellido').value;
  const nacionalidad = document.getElementById('s_nacionalidad').value;
  const lugarNacimiento = document.getElementById('i_lnac').value;
  const direccion = document.getElementById('i_direccion').value;
  const telefono = document.getElementById('i_telefono').value;
  const email = document.getElementById('i_email').value;
  const estadoCivil = document.getElementById('s_edocivil').value;
  const antecedentes = document.getElementById('ta_antecedentes').value;
  const sexo = 'Femenino';

  // Crea un objeto con los datos del paciente
  const paciente = {
    paciente: `${nombre} ${apellido}`,
    cedula,
    direccion,
    telefono,
    fecha_nacimiento: fechaNacimiento,
    lugar_nacimiento: lugarNacimiento,
    estado_civil: estadoCivil,
    nacionalidad,
    antecedentes,
    sexo, // Puedes agregar un campo de selección de género en tu formulario y obtener su valor aquí
    email,
    borrado: 0
  };

  try {
    // Realiza una solicitud POST al servidor con los datos del paciente
    const response = await fetch('http://localhost:8080/api/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(paciente)
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
    } else {
      // Si la respuesta no es exitosa, maneja el error adecuadamente
      alert('Error al crear el paciente');
    }
  } catch (error) {
    alert('Error:', error);
  }
});

