const barra_navegacion = document.querySelector("#barra_navegacion");

barra_navegacion.innerHTML = 
    `<nav class="pcoded-navbar">
      <div class="navbar-wrapper">

        <div class="navbar-brand header-logo">
          <a href="index.html" class="b-brand">
            <div class="b-bg">
              <i class="feather icon-trending-up"></i>
            </div>
            <span class="b-title">FemiSys</span>
          </a>
        </div>

        <div class="navbar-content scroll-div">
          <ul class="nav pcoded-inner-navbar">
            <li class="nav-item pcoded-menu-caption">
              <label>Navegación</label>
            </li>

            <li class="nav-item" id="elemento_index">
              <a href="index.html" class="nav-link">
                <span class="pcoded-micon">
                  <i class="feather icon-home"></i>
                </span>
                <span class="pcoded-mtext">Dashboard</span>
              </a>
            </li>

            <li class="nav-item" id="elemento_pacientes">
              <a href="pacientes.html" class="nav-link"
                ><span class="pcoded-micon"
                  ><i class="feather icon-sidebar"></i></span
                ><span class="pcoded-mtext">Pacientes</span></a>
            </li>

            <li class="nav-item" id="elemento_consultas">
              <a href="consultas.html" class="nav-link">
                <span class="pcoded-micon">
                  <i class="feather icon-sidebar"></i></span>
                <span class="pcoded-mtext">Consultas</span></a>
            </li>

            <li class="nav-item" id="elemento_usuarios">
              <a href="usuarios.html" class="nav-link">
                <span class="pcoded-micon">
                  <i class="feather icon-sidebar"></i></span>
                <span class="pcoded-mtext">Usuarios</span></a>
            </li>

          </ul>
        </div>
      </div>
    </nav>`
;

function marcar_activo() {
  if(pagina === "index"){
    document.getElementById("elemento_index").classList.add("active");
  }
  if(pagina === "pacientes"){
    document.getElementById("elemento_pacientes").classList.add("active");
  }
  if(pagina === "consultas"){
    document.getElementById("elemento_consultas").classList.add("active");
  }
  if(pagina === "usuarios"){
    document.getElementById("elemento_usuarios").classList.add("active");
  }
}

marcar_activo();