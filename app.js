// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
// Aquí deberás desarrollar la lógica para resolver el problema.
document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById("nombreInput");
    const btnAgregar = document.getElementById("btnAgregar");
    const listaNombres = document.getElementById("listaNombres");
    const btnSortear = document.getElementById("btnSortear");
    const resultadoSorteo = document.getElementById("resultadoSorteo");

    let nombres = [];

    btnAgregar.addEventListener("click", () => agregarNombre());

    inputNombre.addEventListener("keypress", (e) => {
        if (e.key === "Enter") agregarNombre();
    });

    function agregarNombre() {
        const nombre = inputNombre.value.trim();

        if (nombre === "") {
            mostrarMensaje("Ingresa un nombre válido.", "error");
            return;
        }
        if (nombres.includes(nombre)) {
            mostrarMensaje("Ese nombre ya está en la lista.", "error");
            return;
        }

        nombres.push(nombre);
        actualizarLista();
        inputNombre.value = "";
        inputNombre.focus();
    }

    function actualizarLista() {
        listaNombres.innerHTML = "";
        nombres.forEach((nombre, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${index + 1}. ${nombre} <span class="eliminar" data-index="${index}">❌</span>`;
            listaNombres.appendChild(li);
        });

        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                nombres.splice(index, 1);
                actualizarLista();
            });
        });
    }

    btnSortear.addEventListener("click", () => {
        if (nombres.length < 2) {
            resultadoSorteo.textContent = "Debe haber al menos dos participantes";
            return;
        }
    
        let nombresSorteo = [...nombres];
        
        // Mezclar nombres
        for (let i = nombresSorteo.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [nombresSorteo[i], nombresSorteo[j]] = [nombresSorteo[j], nombresSorteo[i]];
        }
    
        let resultado = [];
        for (let i = 0; i < nombresSorteo.length; i++) {
            let siguiente = (i + 1) % nombresSorteo.length; // El último se empareja con el primero
            resultado.push(`${nombresSorteo[i]} → ${nombresSorteo[siguiente]}`);
        }
    
        resultadoSorteo.innerHTML = `<strong>El Amigo Secreto Sorteado es:</strong><br>${resultado.join("<br>")}`;
    });
    

    function mostrarMensaje(mensaje, tipo) {
        resultadoSorteo.textContent = mensaje;
        resultadoSorteo.className = tipo;
    }
});


