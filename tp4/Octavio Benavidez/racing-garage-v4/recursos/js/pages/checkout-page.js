/**
 * @fileoverview Page controller for finalizar-compra.html.
 * Handles checkout form validation, dynamic order summary from cart, and order generation.
 */

import { getCart, getCartSubtotal, clearCart } from "../modules/cart-storage.js";
import { formatPrice } from "../modules/catalog-renderer.js";
import { showNotification } from "../modules/notifications.js";
import { initHeaderNavigation } from "../modules/header-navigation.js";

const LATEST_ORDER_KEY = "racing_garage_latest_order";

/**
 * Initializes the checkout process and validation logic.
 */
function initCheckoutPage() {
    initHeaderNavigation();

    const checkoutForm = document.querySelector(".formulario");
    const summaryList = document.querySelector(".resumen-lista");
    const cart = getCart();

    // Guard: redirect to cart if empty
    if (!cart || cart.length === 0) {
        showNotification(
            "Tu carrito está vacío. Redirigiendo al catálogo...",
            "warning"
        );
        setTimeout(() => {
            window.location.href = "./catalogo.html";
        }, 1500);
        return;
    }

    // Populate order summary dynamically
    if (summaryList) {
        const subtotal = getCartSubtotal();
        const itemsSummary = cart
            .map(
                (item) =>
                    `<li><span>${item.name} (x${item.quantity})</span> <span>$ ${formatPrice(item.price * item.quantity)}</span></li>`
            )
            .join("");

        summaryList.innerHTML = `
            ${itemsSummary}
            <li class="separador-resumen"><span>Subtotal</span> <span>$ ${formatPrice(subtotal)}</span></li>
            <li><span>Envío</span> <span>Gratis</span></li>
            <li><strong>Total</strong> <strong>$ ${formatPrice(subtotal)}</strong></li>
        `;
    }

    // Handle form submit with validation
    checkoutForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.querySelector("#id-nombre");
        const emailInput = document.querySelector("#id-email");
        const phoneInput = document.querySelector("#id-telefono");
        const addressInput = document.querySelector("#id-direccion");
        const cityInput = document.querySelector("#id-ciudad");
        const postalCodeInput = document.querySelector("#id-codigo-postal");
        const paymentRadio = document.querySelector(
            "input[name='metodo-pago']:checked"
        );

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const phone = phoneInput?.value.trim() || "";
        const address = addressInput?.value.trim() || "";
        const city = cityInput?.value.trim() || "";
        const postalCode = postalCodeInput?.value.trim() || "";
        const paymentMethod = paymentRadio?.value || "tarjeta";

        // Basic validations
        if (!name || name.length < 3) {
            showNotification("Por favor ingresá tu nombre completo.", "warning");
            nameInput?.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showNotification(
                "Por favor ingresá una dirección de email válida.",
                "warning"
            );
            emailInput?.focus();
            return;
        }

        if (!phone || phone.length < 6) {
            showNotification(
                "Por favor ingresá un número de teléfono de contacto.",
                "warning"
            );
            phoneInput?.focus();
            return;
        }

        if (!address) {
            showNotification("Por favor ingresá la dirección de entrega.", "warning");
            addressInput?.focus();
            return;
        }

        if (!city) {
            showNotification("Por favor ingresá tu ciudad.", "warning");
            cityInput?.focus();
            return;
        }

        if (!postalCode) {
            showNotification("Por favor ingresá el código postal.", "warning");
            postalCodeInput?.focus();
            return;
        }

        // Generate simulated order
        const orderId = `RG-${Date.now().toString().slice(-7)}`;
        const subtotal = getCartSubtotal();

        const orderData = {
            id: orderId,
            date: new Date().toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            customer: {
                name,
                email,
                phone,
                address,
                city,
                postalCode
            },
            paymentMethod,
            items: cart,
            subtotal,
            shipping: 0,
            total: subtotal
        };

        try {
            localStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(orderData));
        } catch (error) {
            console.error("Error storing order data:", error);
        }

        // Clear cart now that purchase was confirmed
        clearCart();

        // Redirect to confirmation view
        window.location.href = "./confirmacion.html";
    });
}

// Bootstraps page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCheckoutPage);
} else {
    initCheckoutPage();
}
