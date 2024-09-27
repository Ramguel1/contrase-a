var nombre = document.getElementById("nombre");
var correo = document.getElementById("correo");
var contra = document.getElementById("contra");
var foto = document.getElementById("foto");

var registro = document.getElementById("registra");

registro.onclick = async () => {
    var nom = nombre.value;
    var email = correo.value;
    var password = contra.value;
    var image = foto.files[0];

    if (nom === "" || email === "" || password === "" || !image) {
        Swal.fire({title:"tienes campos vacios", icon: "error"});
        return;
    }
    



    if (!validarEmail(email)) {
        Swal.fire({
            title: "Correo electrónico inválido",
            text: "MAl",
            icon: "error"
        });
        return;
    }

    
    if (!validarContrasena(password)) {
        Swal.fire({
            title: "Contraseña inválida",
            text: "La contraseña debe tener al menos 7 caracteres, una mayúscula y un signo especial.",
            icon: "error"
        });
        return;
    }


    const datos = new FormData();
    datos.append("nombre", nom);
    datos.append("correo", email);
    datos.append("contra", password);
    datos.append("imagen", image); 
    datos.append("action", "add");

    try {
        let respuesta = await fetch("php.php", {
            method: 'POST',
            body: datos
        });
        let json2 = await respuesta.json();

        nombre.value = "";
        correo.value = "";
        contra.value = "";
        foto.value = ""; 

        if (json2.success) {
            Swal.fire("Registrado");
        } else {
            Swal.fire("Error", "error", "error");
        }
    } catch (error) {
        Swal.fire("Error inesperado", "error", "error");
        console.error("Error al registrar:", error);
    }
};

function validarContrasena(contra) {
    const longitudMinima = contra.length >= 7; 
    const tieneMayuscula = /[A-Z]/.test(contra);
    const tieneSignoEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contra);

    return longitudMinima && tieneMayuscula && tieneSignoEspecial;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
}

const login = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    if (email.trim() === "" || password === "") {
        Swal.fire("ERROR", "Tienes campos vacíos", "error");
        return;
    }
  
    if (!validarEmail(email)) {
        Swal.fire("ERROR", "Correo no valido", "error");
        return;
    }
    
  
    let datos = new FormData();
    datos.append("email", email);
    datos.append("password", password);
    datos.append("action", "login");
    let respuesta = await fetch("php.php", { method: 'POST', body: datos });
    let json2 = await respuesta.json();
  
    if (json2.success ) {
        Swal.fire("¡REGISTRO ÉXITOSO!", json2.mensaje, "success").then(() => {
            localStorage.setItem("email", email);
            window.location.href = "principal.html";
        });
    } else {
        Swal.fire("malll", json2.mensaje, "error");
        
    }
  }