// Script para el proceso de finalización de compra
import {
    obtenerCarrito,
    calcularTotalCarrito,
    vaciarCarrito,
    actualizarContadorCarrito
} from "./carrito.js";

// Elementos del formulario y resumen
const formularioCompra = document.querySelector(".formulario");
const listaResumen = document.querySelector(".resumen-lista");
const carrito = obtenerCarrito();

// Si el usuario llega con el carrito vacío, lo enviamos al catálogo
if (carrito.length === 0) {
    alert("Tu carrito está vacío. Te redirigimos al catálogo para elegir productos.");
    window.location.href = "./catalogo.html";
} else {
    // Mostramos los productos del carrito en el resumen del pedido
    const total = calcularTotalCarrito();

    const itemsHtml = carrito
        .map(
            (item) =>
                `<li><span>${item.nombre} (x${item.cantidad})</span> <span>$ ${(item.precio * item.cantidad).toLocaleString("es-AR")}</span></li>`
        )
        .join("");

    if (listaResumen) {
        listaResumen.innerHTML = `
            ${itemsHtml}
            <li class="separador-resumen"><span>Subtotal</span> <span>$ ${total.toLocaleString("es-AR")}</span></li>
            <li><span>Envío</span> <span>Gratis</span></li>
            <li><strong>Total</strong> <strong>$ ${total.toLocaleString("es-AR")}</strong></li>
        `;
    }
}

// Validación y envío del formulario de compra
formularioCompra?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#id-nombre")?.value.trim();
    const email = document.querySelector("#id-email")?.value.trim();
    const telefono = document.querySelector("#id-telefono")?.value.trim();
    const direccion = document.querySelector("#id-direccion")?.value.trim();
    const ciudad = document.querySelector("#id-ciudad")?.value.trim();
    const codigoPostal = document.querySelector("#id-codigo-postal")?.value.trim();
    const metodoPago = document.querySelector("input[name='metodo-pago']:checked")?.value || "tarjeta";

    // Validaciones básicas de campos obligatorios
    if (!nombre || !email || !telefono || !direccion || !ciudad || !codigoPostal) {
        alert("Por favor completá todos los datos de envío.");
        return;
    }

    // Armamos los datos del pedido para mostrarlos en la confirmación
    const numeroPedido = "RG-" + Math.floor(100000 + Math.random() * 900000);
    const datosPedido = {
        numero: numeroPedido,
        cliente: nombre,
        email: email,
        direccion: `${direccion}, ${ciudad} (CP: ${codigoPostal})`,
        metodoPago: metodoPago,
        total: calcularTotalCarrito(),
        productos: carrito,
        fecha: new Date().toLocaleDateString("es-AR")
    };

    // Guardamos el pedido en localStorage para leerlo en confirmacion.html
    localStorage.setItem("ultimo_pedido_racing", JSON.stringify(datosPedido));

    // Vaciamos el carrito porque la compra ya fue realizada
    vaciarCarrito();

    // Redirigimos a la página de confirmación
    window.location.href = "./confirmacion.html";
});

actualizarContadorCarrito();
