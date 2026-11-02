// Módulo para la gestión del carrito de compras con localStorage

const CLAVE_CARRITO = "carrito_racing_garage";

// Obtiene la lista de productos del carrito guardados en localStorage
export function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return datos ? JSON.parse(datos) : [];
}

// Guarda la lista actualizada en localStorage y actualiza el contador
export function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Agrega un producto al carrito (o suma cantidad si ya estaba)
export function agregarAlCarrito(producto, cantidad = 1) {
    const carrito = obtenerCarrito();
    const indiceExistente = carrito.findIndex((item) => item.id === producto.id);

    const cant = parseInt(cantidad, 10) || 1;

    if (indiceExistente !== -1) {
        carrito[indiceExistente].cantidad += cant;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cant
        });
    }

    guardarCarrito(carrito);
}

// Modifica la cantidad de un producto específico
export function cambiarCantidad(id, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find((p) => p.id === id);

    if (item) {
        const cantidad = parseInt(nuevaCantidad, 10);
        if (cantidad <= 0) {
            eliminarDelCarrito(id);
            return;
        }
        item.cantidad = cantidad;
        guardarCarrito(carrito);
    }
}

// Quita un producto del carrito
export function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito().filter((item) => item.id !== id);
    guardarCarrito(carrito);
}

// Vacía todo el carrito
export function vaciarCarrito() {
    guardarCarrito([]);
}

// Calcula el total sumando (precio * cantidad) de cada item
export function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
}

// Actualiza el número que aparece al lado de "Carrito" en el menú
export function actualizarContadorCarrito() {
    const enlaces = document.querySelectorAll(".cabecera-principal nav a");
    const enlaceCarrito = Array.from(enlaces).find((link) =>
        link.getAttribute("href")?.includes("carrito.html")
    );

    if (!enlaceCarrito) return;

    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);

    let badge = enlaceCarrito.querySelector(".badge-carrito");

    if (totalItems > 0) {
        if (!badge) {
            badge = document.createElement("span");
            badge.className = "badge-carrito";
            enlaceCarrito.appendChild(badge);
        }
        badge.textContent = totalItems;
    } else if (badge) {
        badge.remove();
    }
}
