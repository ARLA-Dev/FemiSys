const barra_header = document.querySelector("#barra_header");

barra_header.innerHTML = 
  `<div class="m-header">
      <a class="mobile-menu" id="mobile-collapse1" href="javascript:"><span></span></a>
      <a href="index.html" class="b-brand">

        <div class="b-bg">
          <i class="feather icon-trending-up"></i>
        </div>

        <span class="b-title">FemiSys</span>
      </a>
  </div>

  <a class="mobile-menu" id="mobile-header" href="javascript:">
    <i class="feather icon-more-horizontal"></i>
  </a>

  <div class="collapse navbar-collapse">

    <ul class="navbar-nav ml-auto">
  
      <li>
        <a href="javascript:" class="full-screen" onclick="javascript:toggleFullScreen()">
          <i class="feather icon-maximize"></i>
        </a>
      </li>

      <li>
        <div class="dropdown drp-user">
          <a href="javascript:" class="dropdown-toggle" data-toggle="dropdown"></a>

          <div class="dropdown-menu dropdown-menu-right profile-notification">
            <div class="pro-head">

              <img
                src="assets/images/user/avatar-1.jpg"
                class="img-radius"
                alt="User-Profile-Image"
              />
              <span>Yuleima Pérez</span>

              <a href="login.html" class="dud-logout" title="Logout">
                  <i class="feather icon-log-out"></i>
              </a>
                </div>
            </div>
          </div>
        </li>
    </ul>
  </div>`
;
