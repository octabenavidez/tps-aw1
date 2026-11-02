/**
 * @fileoverview Page controller for contacto.html.
 * Handles contact form validation and interactive submission feedback.
 */

import { showNotification } from "../modules/notifications.js";
import { initHeaderNavigation } from "../modules/header-navigation.js";

/**
 * Initializes the contact page logic and form handler.
 */
function initContactPage() {
    initHeaderNavigation();

    const contactForm = document.querySelector(".formulario");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.querySelector("#id-nombre");
        const emailInput = document.querySelector("#id-email");
        const messageInput = document.querySelector("#id-mensaje");

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const message = messageInput?.value.trim() || "";

        if (!name || name.length < 2) {
            showNotification("Por favor ingresá tu nombre.", "warning");
            nameInput?.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showNotification("Por favor ingresá un email válido.", "warning");
            emailInput?.focus();
            return;
        }

        if (!message || message.length < 10) {
            showNotification(
                "Por favor escribí un mensaje de al menos 10 caracteres.",
                "warning"
            );
            messageInput?.focus();
            return;
        }

        // Feedback and form reset
        contactForm.reset();
        showNotification(
            "¡Mensaje enviado con éxito! Te responderemos a la brevedad.",
            "success"
        );
    });
}

// Bootstraps page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactPage);
} else {
    initContactPage();
}
