const ORDER_ASC_BY_PAG = "pag->PAG";
const ORDER_DESC_BY_PAG = "PAG->pag";
const ORDER_DESC_BY_ID = "ID->id";

var librosArray = [];
var minPag = undefined;
var maxPag = undefined;
var buscar = undefined;

function sortLibros(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_PAG) {
        result = array.sort(function (a, b) {
            if (a.paginas < b.paginas) { return -1; }
            if (a.paginas > b.paginas) { return 1; }
            return 0;
        });

    } else if (criterio === ORDER_DESC_BY_PAG) {
        result = array.sort(function (a, b) {
            if (a.paginas > b.paginas) { return -1; }
            if (a.paginas < b.paginas) { return 1; }
            return 0;
        });

    } else if (criterio === ORDER_DESC_BY_ID) {
        result = array.sort(function (a, b) {
            if (a.id > b.id) { return -1; }
            if (a.id < b.id) { return 1; }
            return 0;
        });
    }

    return result;
}



function showLibros(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let libro = array[i];

        if (((minPag == undefined) || (minPag != undefined && parseInt(libro.paginas) >= minPag)) &&
            ((maxPag == undefined) || (maxPag != undefined && parseInt(libro.paginas) <= maxPag))) {

            if (buscar == undefined || libro.titulo.toLowerCase().indexOf(buscar) != -1) {

                contenido += 'Título: ' + libro.titulo + '<br>';
                contenido += 'Editorial: ' + libro.editorial + '<br>';
                contenido += 'Páginas: ' + libro.paginas + '<br>';
                contenido += '<a href="ver-libro.html"><button style="float: right;">Ver libro</button></a><br><br>'
                contenido += '<br><hr><br>'


            }
        }
        document.getElementById("listado").innerHTML = contenido;
    }
    
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(LIBROS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            librosArray = resultObj.data;


            librosArray = sortLibros(ORDER_ASC_BY_PAG, librosArray);



            showLibros(librosArray);
        }
    });


    document.getElementById("sortPagAsc").addEventListener("click", function () {


        librosArray = sortLibros(ORDER_ASC_BY_PAG, librosArray);

        showLibros(librosArray);
    });

    document.getElementById("sortPagDesc").addEventListener("click", function () {


        librosArray = sortLibros(ORDER_DESC_BY_PAG, librosArray);

        showLibros(librosArray);
    });

    document.getElementById("sortIdDesc").addEventListener("click", function () {


        librosArray = sortLibros(ORDER_DESC_BY_ID, librosArray);


        showLibros(librosArray);
    });


    document.getElementById("filtrar").addEventListener("click", function () {


        minPag = document.getElementById("rango-min").value;
        maxPag = document.getElementById("rango-max").value;

        if ((minPag != undefined) && (minPag != "") && (parseInt(minPag)) >= 0) {
            minPag = parseInt(minPag);
        }
        else {
            minPag = undefined;
        }

        if ((maxPag != undefined) && (maxPag != "") && (parseInt(maxPag)) >= 0) {
            maxPag = parseInt(maxPag);
        }
        else {
            maxPag = undefined;
        }


        showLibros(librosArray);
    });

    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("rango-min").value = "";
        document.getElementById("rango-max").value = "";

        minPag = undefined;
        maxPag = undefined;


        showLibros(librosArray);
    });

    document.getElementById("buscador").addEventListener('input', function () {

        buscar = document.getElementById("buscador").value.toLowerCase();

        showLibros(librosArray);

    });

    document.getElementById("limpBusc").addEventListener("click", function () {
        document.getElementById("buscador").value = "";

        buscar = undefined;

        showLibros(librosArray);
    });


});