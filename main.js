


function validateForm() {  //esta función valida el formulario y sus datos dentro

    // variables para almacenar el valor de diferentes campos de un formulario, obtienen el valor de campos específicos en el documento HTML utilizando document.getElementById.

    let email = document.getElementById('inputEmail').value; 
    let name = document.getElementById('inputName').value;
    let apellido = document.getElementById('inputApellido').value;
    let phone = document.getElementById('inputPhone').value;
    let dni = document.getElementById('inputDni').value;
    let domicilio = document.getElementById('inputDomicilio').value;
    let genero = document.getElementById('inputGenero').value;
    let opcion = document.getElementById('inputOpcion').value;

    if (email == "") { //variable email igual a vacío. Si el campo está vacío aparece una alerta que pide llenarlo
        Swal.fire({
            title: 'Error!',
            text: 'Email requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
        return false; // si no contiene el "@" muestra una alerta con el mensaje "El correo no es válido" y devuelve false.

    } else if (!email.includes("@")) {
        Swal.fire({
            title: 'Error!',
            text: 'Email inválido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
        return false;
    }

    if (name == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Nombre requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    if (apellido == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Apellido requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    if (phone == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Número requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    if (dni == "") {
        Swal.fire({
            title: 'Error!',
            text: 'DNI requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    if (domicilio == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Domicilio requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    if (genero == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Género requerido',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    if (opcion == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Opción',
            icon: 'error',
            confirmButtonText: 'Volver'

        
          }) 
    }

    return true; // si todos los campos son válidos, la función validateForm devuelve true, o sea, el formulario es válido.
}

// Función para mostrar los datos
function showData() {

    let listPeople; //variable utilizada para almacenar los datos recuperados del localStorage

    if (localStorage.getItem('listPeople') == null) { //el localStorage nos tiene que traer una lista == null
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));// sino, nos trae un listPeople con el JSON.parse en el localStore
    }

    var html = ""; //variable html es creada

    listPeople.forEach(function(element, index) { //para cada forEach, nos trae una función, que trae un elemento y un index
        html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.apellido + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.dni + "</td>";
        html += "<td>" + element.domicilio + "</td>";
        html += "<td>" + element.genero + "</td>";
        html += "<td>" + element.opcion + "</td>";
    
        //cambio de color en los botones "enviar" y "editar"
        html += '<td><button onclick="deleteData(' + index + ')" class="btn" style="background-color: #FF0000; color: #FFF;">Eliminar dato</button> <button onclick="updateData(' + index + ')" class="btn" style="background-color: #008000; color: #FFF;">Editar dato</button></td>';
        html += "</tr>";
    });
    

    document.querySelector('#tableData tbody').innerHTML = html;
}

function isDniUnique(dni, listPeople) {
    return listPeople.every(function(person) {
      return person.dni !== dni;
    });
}

// Función para agregar datos
function AddData() {
    if (validateForm() == true) { //cuando la validación sea "True" nos muestra lo siguiente:
        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let apellido = document.getElementById('inputApellido').value;
        let phone = document.getElementById('inputPhone').value;
        let dni = document.getElementById('inputDni').value;
        let domicilio = document.getElementById('inputDomicilio').value;
        let genero = document.getElementById('inputGenero').value;
        let opcion = document.getElementById('inputOpcion').value;

        var listPeople;

        if (localStorage.getItem('listPeople') == null) { // si en el localStorage, el item listPeople está vacío, nos trae una lista vacía
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }

        if (!isDniUnique (dni, listPeople ))
        {
            Swal.fire({
                title: 'Error!',
                text: 'DNI ya en uso',
                icon: 'error',
                confirmButtonText: 'Volver'

            
              }) 


              
              return;
        }

        listPeople.push({
            email: email,
            name: name,
            apellido: apellido,
            phone: phone,
            dni: dni,
            domicilio: domicilio,
            genero: genero,
            opcion: opcion,
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        showData();

        document.getElementById('inputEmail').value = "";
        document.getElementById('inputName').value = "";
        document.getElementById('inputApellido').value = "";
        document.getElementById('inputPhone').value = "";
        document.getElementById('inputDni').value = "";
        document.getElementById('inputDomicilio').value = "";
        document.getElementById('inputGenero').value = "";
        document.getElementById('inputOpcion').value = "";
    }
}

// Función para eliminar datos
function deleteData(index) {
    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();
}

// Función para actualizar datos

function updateData(index) {
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnUpdate").style.display = 'block';

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputApellido').value = listPeople[index].apellido;
    document.getElementById('inputPhone').value = listPeople[index].phone;
    document.getElementById('inputDni').value = listPeople[index].dni;
    document.getElementById('inputDomicilio').value = listPeople[index].domicilio;
    document.getElementById('inputGenero').value = listPeople[index].genero;
    document.getElementById('inputOpcion').value = listPeople[index].opcion;

    document.querySelector("#btnUpdate").onclick = function () {
        if (validateForm() == true) {
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].apellido = document.getElementById('inputApellido').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;
            listPeople[index].dni = document.getElementById('inputDni').value;
            listPeople[index].domicilio = document.getElementById('inputDomicilio').value;
            listPeople[index].genero = document.getElementById('inputGenero').value;
            listPeople[index].opcion = document.getElementById('inputOpcion').value;

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            showData();

            document.getElementById('inputEmail').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputApellido').value = "";
            document.getElementById('inputPhone').value = "";
            document.getElementById('inputDni').value = "";
            document.getElementById('inputDomicilio').value = "";
            document.getElementById('inputGenero').value = "";
            document.getElementById('inputOpcion').value = "";

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate").style.display = 'none';
        }
    };
}

// Llamar a la función showData al cargar el documento
document.addEventListener("DOMContentLoaded", showData);
