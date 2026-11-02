/**
 * @fileoverview DOM renderer for the shopping cart view.
 * Handles item card generation, total recalculations, and empty-state presentation.
 */

import { formatPrice } from "./catalog-renderer.js";

/**
 * Creates an article element representing a single cart item.
 * @param {import('./cart-storage.js').CartItem} item - Cart item object
 * @returns {HTMLElement} Article element
 */
export function createCartItemElement(item) {
    const article = document.createElement("article");
    article.className = "item-carrito";
    article.dataset.productId = item.id;

    const itemTotal = item.price * item.quantity;

    article.innerHTML = `
        <picture>
            <img src="${item.image}" alt="${item.name}">
        </picture>
        <p>${item.name}</p>

        <label for="cant-${item.id}">Cantidad</label>
        <input type="number" id="cant-${item.id}" class="input-cantidad-item" value="${item.quantity}" min="1" max="99">

        <p class="precio-item">Precio $ ${formatPrice(itemTotal)}</p>

        <button class="boton-secundario boton-eliminar-item" type="button" aria-label="Eliminar ${item.name} del carrito">Eliminar</button>
    `;

    return article;
}

/**
 * Updates the order summary section in the cart.
 * @param {HTMLElement} summaryContainer - Element containing the order summary
 * @param {number} subtotal - Subtotal amount in currency
 */
export function updateCartSummary(summaryContainer, subtotal) {
    if (!summaryContainer) return;

    const summaryList = summaryContainer.querySelector("ul");
    const checkoutButton = summaryContainer.querySelector("button[type='submit']");

    if (summaryList) {
        summaryList.innerHTML = `
            <li><span>Subtotal</span> <span>$ ${formatPrice(subtotal)}</span></li>
            <li><span>Envío</span> <span>Gratis</span></li>
            <li><span>Total</span> <span>$ ${formatPrice(subtotal)}</span></li>
        `;
    }

    if (checkoutButton) {
        checkoutButton.disabled = subtotal === 0;
        if (subtotal === 0) {
            checkoutButton.style.opacity = "0.5";
            checkoutButton.style.cursor = "not-allowed";
        } else {
            checkoutButton.style.opacity = "1";
            checkoutButton.style.cursor = "pointer";
        }
    }
}

/**
 * Renders the full list of cart items or an empty state into the container.
 * @param {import('./cart-storage.js').CartItem[]} cartItems - Array of cart items
 * @param {HTMLElement} container - Container element (.carrito-productos)
 */
export function renderCartItems(cartItems, container) {
    if (!container) return;

    container.innerHTML = "";

    if (!cartItems || cartItems.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "mensaje-vacio";
        emptyState.innerHTML = `
            <p>Tu carrito de compras está vacío.</p>
            <a class="boton-principal" href="./catalogo.html">Explorar catálogo</a>
        `;
        container.appendChild(emptyState);
        return;
    }

    const fragment = document.createDocumentFragment();
    cartItems.forEach((item) => {
        fragment.appendChild(createCartItemElement(item));
    });

    container.appendChild(fragment);
}
