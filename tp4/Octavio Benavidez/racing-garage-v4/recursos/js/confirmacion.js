// Script de la página de confirmación de compra
// Muestra los datos del pedido que se guardaron en localStorage

const contenedor = document.querySelector(".mensaje-confirmacion");
const pedidoGuardado = localStorage.getItem("ultimo_pedido");

// Si hay datos del pedido los mostramos en pantalla
if (pedidoGuardado) {
    const pedido = JSON.parse(pedidoGuardado);

    // Construimos el HTML del detalle de productos
    let itemsHtml = "";
    pedido.productos.forEach(function (item) {
        itemsHtml += "<li>" + item.nombre + " x" + item.cantidad + " - $ " + (item.precio * item.cantidad).toLocaleString("es-AR") + "</li>";
    });

    contenedor.innerHTML = `
        <h1>¡Gracias por tu compra, ${pedido.nombre}!</h1>
        <p>Tu pedido fue recibido y está siendo preparado.</p>
        <p><strong>Envío a:</strong> ${pedido.direccion}</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total abonado: $ ${pedido.total.toLocaleString("es-AR")}</strong></p>
        <a class="boton-principal" href="./index.html">Volver al inicio</a>
    `;
}
