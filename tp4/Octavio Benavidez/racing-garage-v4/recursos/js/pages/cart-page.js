/**
 * @fileoverview Page controller for carrito.html.
 * Manages item list interactions, quantity updates, item deletions, and checkout navigation.
 */

import {
    getCart,
    updateCartQuantity,
    removeFromCart,
    getCartSubtotal
} from "../modules/cart-storage.js";
import { renderCartItems, updateCartSummary } from "../modules/cart-renderer.js";
import { showNotification } from "../modules/notifications.js";
import { initHeaderNavigation } from "../modules/header-navigation.js";

/**
 * Initializes the cart page logic and event listeners.
 */
function initCartPage() {
    initHeaderNavigation();

    const cartContainer = document.querySelector(".carrito-productos");
    const summaryContainer = document.querySelector(".resumen-pedido");
    const cartForm = document.querySelector(".formulario-carrito");

    if (!cartContainer) return;

    /**
     * Refreshes the cart view and order summary with the latest state.
     */
    function refreshCartView() {
        const cart = getCart();
        const subtotal = getCartSubtotal();
        renderCartItems(cart, cartContainer);
        updateCartSummary(summaryContainer, subtotal);
    }

    // Delegate events inside the cart list container
    cartContainer.addEventListener("input", (event) => {
        const target = event.target;
        if (target.classList.contains("input-cantidad-item")) {
            const article = target.closest(".item-carrito");
            const productId = article?.dataset.productId;
            const newQuantity = parseInt(target.value, 10);

            if (productId && newQuantity >= 1) {
                updateCartQuantity(productId, newQuantity);
                refreshCartView();
            }
        }
    });

    cartContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("boton-eliminar-item")) {
            const article = target.closest(".item-carrito");
            const productId = article?.dataset.productId;

            if (productId) {
                removeFromCart(productId);
                showNotification("Producto eliminado del carrito", "info");
                refreshCartView();
            }
        }
    });

    // Guard against proceeding to checkout with an empty cart
    cartForm?.addEventListener("submit", (event) => {
        const cart = getCart();
        if (cart.length === 0) {
            event.preventDefault();
            showNotification(
                "Tu carrito está vacío. Agregá productos antes de proceder al pago.",
                "warning"
            );
        }
    });

    // Initial render
    refreshCartView();
}

// Bootstraps page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartPage);
} else {
    initCartPage();
}
