// Script para el formulario de contacto
import { actualizarContadorCarrito } from "./carrito.js";

const formularioContacto = document.querySelector(".formulario");

formularioContacto?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#id-nombre")?.value.trim();
    const email = document.querySelector("#id-email")?.value.trim();
    const mensaje = document.querySelector("#id-mensaje")?.value.trim();

    if (!nombre || !email || !mensaje) {
        alert("Por favor completá todos los campos antes de enviar.");
        return;
    }

    alert(`¡Gracias por contactarnos, ${nombre}! Recibimos tu consulta y te responderemos a la brevedad.`);
    formularioContacto.reset();
});

actualizarContadorCarrito();
