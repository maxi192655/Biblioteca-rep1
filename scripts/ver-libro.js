var libro = {};
var comentariosArray = [];
var librosArray = [];

function showRelatedBooks(arrayListado, arrayRelacionados){
    let contenido = '<hr>';
    arrayRelacionados.forEach(function(i){
        contenido += 'Título: ' + arrayListado[i].titulo + '<br>';
        contenido += 'Editorial: ' + arrayListado[i].editorial + '<br>';
        contenido += 'Páginas: ' + arrayListado[i].paginas + '<br>';
        contenido += '<a href="ver-libro.html"><button style="float: right;">Ver libro</button></a><br><br>'
        contenido += '<br><hr><br>'
    });

    document.getElementById("relatedBooks").innerHTML = contenido;

}

function showLibro(libro, arrayComments) {

    let info = "";
    let imgs = "";
    let comments = "<hr>";



    info += `
                    <h2> ${libro.titulo} </h2>
                    <strong>${libro.autor}</strong><br>
                    ${libro.editorial}<br>
                    ${libro.isbn}<br>
                    ${libro.paginas} págs.<br>
                    `;

    imgs += `
                    <img class="img" src="${libro.images[0]}" width="90px" height="135px" alt="">
                    <img class="img" src="${libro.images[1]}" width="90px" height="135px" alt="">
                    <img class="img" src="${libro.images[2]}" width="90px" height="135px" alt="">
                    `;

    arrayComments.forEach(function (comment) {
        let puntos = "";


        
        comments += `
                                        <strong>${comment.usuario}</strong> dice:<br>
                                        <p>${comment.comentario}</p>
                                        `;

        for (let i = 1; i <= comment.calificacion; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.calificacion + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }
        comments += `<sub>${comment.dateTime}</sub><br>`;

        comments += `<div style="text-align: right;">${puntos}</div><br><hr>`;
        


    });




    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;

}






document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(COMENTARIOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }

    });


    getJSONData(LIBRO_SIMPLE_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            libro = resultObj.data;

            showLibro(libro, comentariosArray);
        }

    });

    getJSONData(LIBROS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            librosArray = resultObj.data;

            
            showRelatedBooks(librosArray, libro.librosRelacionados);
        }

    });


    
    // Comentar---------------------------------------
    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById("newCommentContent").style = "display: inline-block";
    }

    document.getElementById("enviarComm").addEventListener("click", function () {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} `;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let newComment = {
            calificacion: parseInt(document.getElementById('newCal').value),
            comentario: document.getElementById('newComm').value,
            usuario: JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: dateTime
        };


        comentariosArray.push(newComment);

        showLibro(libro, comentariosArray);

    })
    //-------------------------------------------------------------------


});

