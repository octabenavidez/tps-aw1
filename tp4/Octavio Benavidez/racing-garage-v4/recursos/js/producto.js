// Script para la página de detalle del producto
import { productos, buscarProductoPorId } from "./productos.js";
import { agregarAlCarrito, actualizarContadorCarrito } from "./carrito.js";

// Leemos el id del producto desde la URL (ej: producto.html?id=llantas-rs7)
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Si no hay id o no existe, usamos el primer producto por defecto
const productoActual = buscarProductoPorId(idProducto) || productos[0];

// Elementos del DOM a actualizar
const titulo = document.querySelector(".detalle-producto h1");
const imagen = document.querySelector(".detalle-producto picture img");
const descripcion = document.querySelector(".detalle-producto > p");
const listaEspecificaciones = document.querySelector(".detalle-producto > ul");
const formularioAgregar = document.querySelector(".formulario-agregar");
const inputCantidad = document.querySelector("#id-cantidad");

// Mostramos la información del producto
if (productoActual) {
    document.title = `Racing Garage - ${productoActual.nombre}`;

    if (titulo) titulo.textContent = productoActual.nombre;
    if (imagen) {
        imagen.src = productoActual.imagen;
        imagen.alt = productoActual.nombre;
    }
    if (descripcion) descripcion.textContent = productoActual.descripcionLarga;

    if (listaEspecificaciones) {
        const items = productoActual.especificaciones
            .map((item) => `<li>${item}</li>`)
            .join("");
        const precio = `<li>Precio $ ${productoActual.precio.toLocaleString("es-AR")}</li>`;
        listaEspecificaciones.innerHTML = items + precio;
    }
}

// Evento para agregar el producto al carrito
formularioAgregar?.addEventListener("submit", (e) => {
    e.preventDefault();

    const cantidad = parseInt(inputCantidad?.value, 10) || 1;
    if (cantidad < 1) {
        alert("La cantidad debe ser mayor a 0");
        return;
    }

    agregarAlCarrito(productoActual, cantidad);

    // Mensaje de confirmación
    mostrarAviso(`¡Agregaste ${cantidad} unidad(es) de ${productoActual.nombre} al carrito!`);
});

// Función simple para mostrar un aviso temporal en la pantalla
function mostrarAviso(texto) {
    let aviso = document.querySelector(".notificacion-toast");
    if (!aviso) {
        aviso = document.createElement("div");
        aviso.className = "notificacion-toast notificacion-visible";
        document.body.appendChild(aviso);
    }
    aviso.textContent = texto;
    aviso.classList.add("notificacion-visible");

    setTimeout(() => {
        aviso.classList.remove("notificacion-visible");
    }, 3000);
}

// Actualizamos el número del carrito en la barra de navegación
actualizarContadorCarrito();
