let login_btn = document.getElementById("login_btn");

login_btn.addEventListener("click", function (event) {
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; 

  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ username, password }),
  })
  
    .then((response) => {

      if (response.ok) {
        return response.json(); // Parsea la respuesta JSON
      } else {
        throw new Error("Inicio de sesión fallido");
      }
    })
    .then((data) => {
      const token = data.token; // Obtiene el token del cuerpo de la respuesta JSON

      if (token) {
        // Almacena el token en el sessionStorage
        sessionStorage.setItem("token", token);
        // Redirige al usuario a la página deseada
        window.location.href = "index.html";
      } else {
        console.error("No se encontró el token en la respuesta");
      }
    })
    .catch((error) => {
      // Maneja los errores de la solicitud AJAX
      console.error("Error:", error);
    });
});
