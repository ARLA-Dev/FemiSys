$(document).ready(function() {

    $("#show_hide_respuesta a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_respuesta input').attr("type") == "text"){
            $('#show_hide_respuesta input').attr('type', 'password');
            $('#show_hide_respuesta i').addClass( "fa-eye-slash" );
            $('#show_hide_respuesta i').removeClass( "fa-eye" );
        }else if($('#show_hide_respuesta input').attr("type") == "password"){
            $('#show_hide_respuesta input').attr('type', 'text');
            $('#show_hide_respuesta i').removeClass( "fa-eye-slash" );
            $('#show_hide_respuesta i').addClass( "fa-eye" );
        }
    });

});

const i_usuario = document.getElementById("i_usuario");
const i_nombre = document.getElementById("i_nombre");
const selectElement = document.getElementById('s_pregunta');


fetch('http://localhost:8080/api/usuarios/current', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener el usuario actual');
    }
    return response.json();
  })
  .then(data => {
    const { username, nombre, pregunta } = data;
    i_usuario.value = username;
    i_nombre.value = nombre;

    const optionElement = Array.from(selectElement.options).find(option => option.textContent === pregunta);
    if (optionElement) {
      selectElement.selectedIndex = optionElement.index;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

  