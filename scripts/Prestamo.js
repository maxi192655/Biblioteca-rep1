var prestamosArray = []

function calctotal(){
    let suma = 0;
    let subs = document.getElementsByClassName("subtotal")
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerHTML = suma;
}

function calcSubtotal(dias, i) {
   
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * dias;
    document.getElementById(`libroSubtotal${i}`).innerHTML = subtotal;
    calctotal();
}

function librosPrestados(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let libro = array[i];

        let sub = libro.dias * libro.cantidad;

        contenido += `
            <tr>
                <td><img src='${libro.img}' width="50px"></td>

                <td>${libro.titulo}</td>
                
                <td>${libro.dias}</td>
                
                <td><input style="width:60px;" onchange="calcSubtotal(${libro.dias}, ${i})" 
                    type="number" id="cantidad${i}" value="${libro.cantidad}" min="1"></td>
                
                <td><span class="subtotal" id="libroSubtotal${i}" style="font-weight:blod;">${sub}</td>
            </tr>
        `
    }
    document.getElementById("listado").innerHTML += contenido;
    calctotal()
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRESTAMO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prestamosArray = resultObj.data.libros;
            
            librosPrestados(prestamosArray)
            
        }
    });
});