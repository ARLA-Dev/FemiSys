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