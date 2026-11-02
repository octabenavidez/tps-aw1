// Script del formulario de finalizar compra
// Valida los campos y si todo está bien guarda el pedido y redirige a confirmación

const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Leemos los valores del formulario
    const nombre = document.querySelector("#id-nombre").value;
    const email = document.querySelector("#id-email").value;
    const telefono = document.querySelector("#id-telefono").value;
    const direccion = document.querySelector("#id-direccion").value;
    const ciudad = document.querySelector("#id-ciudad").value;
    const codigoPostal = document.querySelector("#id-codigo-postal").value;

    // Verificamos que no haya campos vacíos
    if (!nombre || !email || !telefono || !direccion || !ciudad || !codigoPostal) {
        alert("Por favor completá todos los campos antes de confirmar la compra.");
        return;
    }

    // Leemos el carrito del localStorage
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. No podés confirmar una compra sin productos.");
        return;
    }

    // Calculamos el total
    let total = 0;
    carrito.forEach(function (item) {
        total = total + item.precio * item.cantidad;
    });

    // Creamos un objeto con los datos del pedido para mostrarlo en la confirmación
    const pedido = {
        nombre: nombre,
        direccion: direccion + ", " + ciudad + " (CP: " + codigoPostal + ")",
        total: total,
        productos: carrito
    };

    // Guardamos el pedido y vaciamos el carrito
    localStorage.setItem("ultimo_pedido", JSON.stringify(pedido));
    localStorage.removeItem("carrito");

    // Vamos a la página de confirmación
    window.location.href = "./confirmacion.html";
});
