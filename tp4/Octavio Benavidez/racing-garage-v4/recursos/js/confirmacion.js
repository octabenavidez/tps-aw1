// Script para la página de confirmación de compra
import { actualizarContadorCarrito } from "./carrito.js";

// Contenedor principal del mensaje
const contenedor = document.querySelector(".mensaje-confirmacion");

// Recuperamos el último pedido guardado en localStorage
const pedidoGuardado = localStorage.getItem("ultimo_pedido_racing");

if (pedidoGuardado && contenedor) {
    const pedido = JSON.parse(pedidoGuardado);

    // Listado de los productos comprados
    const items = pedido.productos
        .map(
            (item) =>
                `<li><span>${item.nombre} x${item.cantidad}</span> <span>$ ${(item.precio * item.cantidad).toLocaleString("es-AR")}</span></li>`
        )
        .join("");

    contenedor.innerHTML = `
        <h1>¡Gracias por tu compra, ${pedido.cliente}!</h1>
        <p>Tu pedido ha sido recibido correctamente y ya se encuentra en preparación.</p>
        <p class="codigo-orden"><strong>Número de pedido:</strong> ${pedido.numero}</p>
        <p class="fecha-orden"><strong>Fecha:</strong> ${pedido.fecha}</p>
        <p class="direccion-orden"><strong>Envío a:</strong> ${pedido.direccion}</p>

        <section class="detalle-orden-confirmada">
            <h2>Resumen de la compra</h2>
            <ul class="lista-items-orden">
                ${items}
            </ul>
            <p class="total-orden">Total abonado: $ ${pedido.total.toLocaleString("es-AR")}</p>
        </section>

        <a class="boton-principal" href="./index.html">Volver al inicio</a>
        <a class="vinculo-secundario" href="./catalogo.html">Seguir explorando productos</a>
    `;
}

actualizarContadorCarrito();
