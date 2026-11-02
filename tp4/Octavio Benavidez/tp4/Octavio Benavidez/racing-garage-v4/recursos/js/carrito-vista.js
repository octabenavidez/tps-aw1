// Script del carrito de compras
// Lee los productos guardados en localStorage y los muestra en pantalla

// Leemos el carrito desde localStorage
const carritoGuardado = localStorage.getItem("carrito");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// Elementos del HTML
const contenedorProductos = document.querySelector(".carrito-productos");
const listaResumen = document.querySelector(".resumen-pedido ul");

// Función que calcula el total del carrito
function calcularTotal() {
    let total = 0;
    carrito.forEach(function (item) {
        total = total + item.precio * item.cantidad;
    });
    return total;
}

// Función que dibuja los productos del carrito en el HTML
function mostrarCarrito() {
    contenedorProductos.innerHTML = "";

    if (carrito.length === 0) {
        contenedorProductos.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        carrito.forEach(function (item) {
            const articulo = document.createElement("article");
            articulo.className = "item-carrito";

            articulo.innerHTML = `
                <picture>
                    <img src="${item.imagen}" alt="${item.nombre}">
                </picture>
                <p>${item.nombre}</p>
                <label for="cant-${item.id}">Cantidad</label>
                <input type="number" id="cant-${item.id}" class="input-cantidad" data-id="${item.id}" value="${item.cantidad}" min="1">
                <p>Precio $ ${(item.precio * item.cantidad).toLocaleString("es-AR")}</p>
                <button class="boton-secundario" type="button" data-id="${item.id}">Eliminar</button>
            `;

            contenedorProductos.appendChild(articulo);
        });
    }

    // Actualizamos el resumen con el total calculado
    const total = calcularTotal();
    listaResumen.innerHTML = `
        <li>Subtotal $ ${total.toLocaleString("es-AR")}</li>
        <li>Envío Gratis</li>
        <li>Total $ ${total.toLocaleString("es-AR")}</li>
    `;
}

// Evento: cuando se modifica la cantidad en el input
contenedorProductos.addEventListener("change", function (evento) {
    if (evento.target.classList.contains("input-cantidad")) {
        const idCambiado = evento.target.dataset.id;
        const nuevaCantidad = parseInt(evento.target.value);

        if (nuevaCantidad >= 1) {
            carrito.forEach(function (item) {
                if (item.id === idCambiado) {
                    item.cantidad = nuevaCantidad;
                }
            });
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }
    }
});

// Evento: cuando se hace click en "Eliminar" borramos ese producto del carrito
contenedorProductos.addEventListener("click", function (evento) {
    if (evento.target.tagName === "BUTTON") {
        const idAEliminar = evento.target.dataset.id;

        // Buscamos el índice del producto en el array
        let indice = -1;
        carrito.forEach(function (item, i) {
            if (item.id === idAEliminar) {
                indice = i;
            }
        });

        // Lo eliminamos del array y actualizamos el localStorage
        if (indice !== -1) {
            carrito.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }
    }
});

// Mostramos el carrito al cargar la página
mostrarCarrito();
