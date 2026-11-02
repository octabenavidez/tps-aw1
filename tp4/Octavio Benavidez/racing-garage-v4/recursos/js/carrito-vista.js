// Script para la página del carrito de compras
import {
    obtenerCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    calcularTotalCarrito,
    actualizarContadorCarrito
} from "./carrito.js";

// Elementos de la página
const contenedorCarrito = document.querySelector(".carrito-productos");
const listaResumen = document.querySelector(".resumen-pedido ul");
const formularioCarrito = document.querySelector(".formulario-carrito");
const botonPagar = document.querySelector(".resumen-pedido button[type='submit']");

// Función para pintar la lista de productos y los totales
function actualizarVistaCarrito() {
    const carrito = obtenerCarrito();
    const total = calcularTotalCarrito();

    // Actualizamos el contador del menú
    actualizarContadorCarrito();

    if (!contenedorCarrito) return;
    contenedorCarrito.innerHTML = "";

    // Si el carrito está vacío
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="mensaje-vacio">
                <p>Tu carrito de compras está vacío.</p>
                <a class="boton-principal" href="./catalogo.html">Ir al catálogo</a>
            </div>
        `;

        if (listaResumen) {
            listaResumen.innerHTML = `
                <li><span>Subtotal</span> <span>$ 0</span></li>
                <li><span>Envío</span> <span>Gratis</span></li>
                <li><span>Total</span> <span>$ 0</span></li>
            `;
        }

        if (botonPagar) {
            botonPagar.disabled = true;
            botonPagar.style.opacity = "0.5";
            botonPagar.style.cursor = "not-allowed";
        }
        return;
    }

    // Si hay productos, habilitamos el botón de pago
    if (botonPagar) {
        botonPagar.disabled = false;
        botonPagar.style.opacity = "1";
        botonPagar.style.cursor = "pointer";
    }

    // Dibujamos cada producto en el carrito
    carrito.forEach((item) => {
        const articulo = document.createElement("article");
        articulo.className = "item-carrito";

        const subtotalItem = item.precio * item.cantidad;

        articulo.innerHTML = `
            <picture>
                <img src="${item.imagen}" alt="${item.nombre}">
            </picture>
            <p>${item.nombre}</p>

            <label for="cant-${item.id}">Cantidad</label>
            <input type="number" id="cant-${item.id}" class="input-cantidad" data-id="${item.id}" value="${item.cantidad}" min="1">

            <p>Precio $ ${subtotalItem.toLocaleString("es-AR")}</p>

            <button class="boton-secundario btn-eliminar" data-id="${item.id}" type="button">Eliminar</button>
        `;

        contenedorCarrito.appendChild(articulo);
    });

    // Actualizamos el resumen
    if (listaResumen) {
        listaResumen.innerHTML = `
            <li><span>Subtotal</span> <span>$ ${total.toLocaleString("es-AR")}</span></li>
            <li><span>Envío</span> <span>Gratis</span></li>
            <li><span>Total</span> <span>$ ${total.toLocaleString("es-AR")}</span></li>
        `;
    }
}

// Eventos sobre los productos del carrito (cambio de cantidad o eliminar)
contenedorCarrito?.addEventListener("change", (e) => {
    if (e.target.classList.contains("input-cantidad")) {
        const id = e.target.dataset.id;
        const nuevaCantidad = parseInt(e.target.value, 10);
        if (nuevaCantidad >= 1) {
            cambiarCantidad(id, nuevaCantidad);
            actualizarVistaCarrito();
        }
    }
});

contenedorCarrito?.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = e.target.dataset.id;
        eliminarDelCarrito(id);
        actualizarVistaCarrito();
    }
});

// Verificamos antes de pasar a la compra que el carrito tenga artículos
formularioCarrito?.addEventListener("submit", (e) => {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        e.preventDefault();
        alert("El carrito está vacío. Agregá algún producto antes de continuar.");
    }
});

// Carga inicial
actualizarVistaCarrito();
