/**
 * @fileoverview Header navigation enhancement module.
 * Updates the shopping cart badge count in real time across all views.
 */

import { getCartTotalCount } from "./cart-storage.js";

/**
 * Updates the cart link inside the navigation bar with the current count badge.
 */
export function updateCartBadge() {
    const navLinks = document.querySelectorAll(".cabecera-principal nav a");
    const cartLink = Array.from(navLinks).find((link) =>
        link.getAttribute("href")?.includes("carrito.html")
    );

    if (!cartLink) return;

    const count = getCartTotalCount();
    let badge = cartLink.querySelector(".badge-carrito");

    if (count > 0) {
        if (!badge) {
            badge = document.createElement("span");
            badge.className = "badge-carrito";
            cartLink.appendChild(badge);
        }
        badge.textContent = count;
        badge.setAttribute("aria-label", `${count} productos en el carrito`);
    } else if (badge) {
        badge.remove();
    }
}

/**
 * Initializes the header cart badge and hooks up reactive updates.
 */
export function initHeaderNavigation() {
    updateCartBadge();
    window.addEventListener("cartUpdated", updateCartBadge);
}
