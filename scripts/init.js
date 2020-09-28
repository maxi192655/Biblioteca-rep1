const LIBROS_URL = "https://danikho2020.github.io/json/lista_simple.json";
const USUARIOS_URL = "https://danielk2020.github.io/biblioteca/usuarios.json";
const COMENTARIOS_URL = "https://danikho2020.github.io/json/comentarios_simple.json";
const LIBRO_SIMPLE_URL = "https://danikho2020.github.io/json/libro_simple.json";
const PRESTAMO_URL = "https://danikho2020.github.io/json/prestamo.json";


var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(e){
  let userLogged = localStorage.getItem('User-Logged');
  let infoUser = document.getElementById("info-user")
  let user = document.getElementById("user");

  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    user.innerText = userLogged.email;
    infoUser.style = "display: inline-block";
  }

  document.getElementById("salir").addEventListener("click", function(){
    localStorage.removeItem('User-Logged');
    window.location = 'login.html';
  })
});

