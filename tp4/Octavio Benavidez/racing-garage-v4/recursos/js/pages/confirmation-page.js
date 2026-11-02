/**
 * @fileoverview Page controller for confirmacion.html.
 * Dynamically displays the latest confirmed order receipt from localStorage.
 */

import { formatPrice } from "../modules/catalog-renderer.js";
import { initHeaderNavigation } from "../modules/header-navigation.js";

const LATEST_ORDER_KEY = "racing_garage_latest_order";

/**
 * Initializes the confirmation view with order receipt details.
 */
function initConfirmationPage() {
    initHeaderNavigation();

    const mainContainer = document.querySelector(".mensaje-confirmacion");
    if (!mainContainer) return;

    let order = null;
    try {
        const stored = localStorage.getItem(LATEST_ORDER_KEY);
        if (stored) {
            order = JSON.parse(stored);
        }
    } catch (error) {
        console.error("Error reading order data:", error);
    }

    if (!order) return;

    // Render detailed order receipt
    const itemsHtml = order.items
        .map(
            (item) =>
                `<li><span>${item.name} x${item.quantity}</span> <span>$ ${formatPrice(item.price * item.quantity)}</span></li>`
        )
        .join("");

    mainContainer.innerHTML = `
        <h1>¡Gracias por tu compra, ${order.customer.name}!</h1>
        <p>Tu pedido ha sido recibido correctamente y se encuentra en preparación.</p>
        <p class="codigo-orden"><strong>Número de pedido:</strong> ${order.id}</p>
        <p class="fecha-orden"><strong>Fecha:</strong> ${order.date}</p>
        <p class="direccion-orden"><strong>Destino:</strong> ${order.customer.address}, ${order.customer.city} (CP: ${order.customer.postalCode})</p>

        <section class="detalle-orden-confirmada">
            <h2>Detalle de la compra</h2>
            <ul class="lista-items-orden">
                ${itemsHtml}
            </ul>
            <p class="total-orden">Total abonado: $ ${formatPrice(order.total)}</p>
        </section>

        <a class="boton-principal" href="./index.html">Volver al inicio</a>
        <a class="vinculo-secundario" href="./catalogo.html">Seguir explorando productos</a>
    `;
}

// Bootstraps page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConfirmationPage);
} else {
    initConfirmationPage();
}
