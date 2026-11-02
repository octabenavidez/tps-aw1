/**
 * @fileoverview Page controller for producto.html.
 * Renders dynamic product details based on query string and handles cart addition.
 */

import { getAllProducts, getProductById } from "../data/products-data.js";
import { addToCart } from "../modules/cart-storage.js";
import { formatPrice } from "../modules/catalog-renderer.js";
import { showNotification } from "../modules/notifications.js";
import { initHeaderNavigation } from "../modules/header-navigation.js";

/**
 * Initializes the product detail page.
 */
function initProductDetailPage() {
    initHeaderNavigation();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const allProducts = getAllProducts();
    const currentProduct = (productId && getProductById(productId)) || allProducts[0];

    if (!currentProduct) return;

    // Update document title
    document.title = `Racing Garage - ${currentProduct.name}`;

    // Target elements
    const titleElement = document.querySelector(".detalle-producto h1");
    const imageElement = document.querySelector(".detalle-producto picture img");
    const descriptionElement = document.querySelector(".detalle-producto > p");
    const specsListElement = document.querySelector(".detalle-producto > ul");
    const addForm = document.querySelector(".formulario-agregar");
    const quantityInput = document.querySelector("#id-cantidad");

    if (titleElement) {
        titleElement.textContent = currentProduct.name;
    }

    if (imageElement) {
        imageElement.src = currentProduct.image;
        imageElement.alt = currentProduct.name;
    }

    if (descriptionElement) {
        descriptionElement.textContent = currentProduct.fullDescription;
    }

    if (specsListElement) {
        const specsItems = currentProduct.specs
            .map((spec) => `<li>${spec}</li>`)
            .join("");
        const priceItem = `<li>Precio $ ${formatPrice(currentProduct.price)}</li>`;
        specsListElement.innerHTML = `${specsItems}${priceItem}`;
    }

    // Handle add to cart submission
    addForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const quantity = parseInt(quantityInput?.value, 10) || 1;

        if (quantity < 1) {
            showNotification("La cantidad debe ser al menos 1", "warning");
            return;
        }

        addToCart(currentProduct, quantity);
        showNotification(
            `¡"${currentProduct.name}" agregado al carrito (${quantity} unid.)!`,
            "success"
        );
    });
}

// Bootstraps page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductDetailPage);
} else {
    initProductDetailPage();
}
