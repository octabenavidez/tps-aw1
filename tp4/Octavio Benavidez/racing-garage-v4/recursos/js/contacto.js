// Script del formulario de contacto
// Valida que los campos estén completos antes de enviar

const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.querySelector("#id-nombre").value;
    const email = document.querySelector("#id-email").value;
    const mensaje = document.querySelector("#id-mensaje").value;

    if (!nombre || !email || !mensaje) {
        alert("Por favor completá todos los campos antes de enviar el mensaje.");
        return;
    }

    alert("¡Gracias " + nombre + "! Tu mensaje fue enviado. Te responderemos pronto.");
    formulario.reset();
});
