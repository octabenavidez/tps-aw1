// Script del detalle de producto
// Por simplicidad mostramos siempre el primer producto del catálogo
// (en el futuro se puede mejorar con la URL)

import { productos } from "./productos.js";

// Usamos el primer producto como ejemplo por ahora
const producto = productos[0];

// Elementos del HTML
const titulo = document.querySelector(".detalle-producto h1");
const imagen = document.querySelector(".detalle-producto picture img");
const descripcion = document.querySelector(".detalle-producto > p");
const listaEspecificaciones = document.querySelector(".detalle-producto > ul");
const formulario = document.querySelector(".formulario-agregar");
const inputCantidad = document.querySelector("#id-cantidad");

// Llenamos el HTML con los datos del producto
titulo.textContent = producto.nombre;
document.title = "Racing Garage - " + producto.nombre;
imagen.src = producto.imagen;
imagen.alt = producto.nombre;
descripcion.textContent = producto.descripcionLarga;

// Ponemos cada especificación como un elemento de la lista
listaEspecificaciones.innerHTML = "";

producto.especificaciones.forEach(function (spec) {
    const item = document.createElement("li");
    item.textContent = spec;
    listaEspecificaciones.appendChild(item);
});

// Agregamos el precio al final de la lista
const itemPrecio = document.createElement("li");
itemPrecio.textContent = "Precio $ " + producto.precio.toLocaleString("es-AR");
listaEspecificaciones.appendChild(itemPrecio);

// Evento: cuando se hace click en "Agregar al carrito"
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const cantidad = parseInt(inputCantidad.value);

    if (cantidad < 1) {
        alert("La cantidad debe ser mayor a 0");
        return;
    }

    // Guardamos el producto en el carrito (localStorage)
    agregarAlCarrito(producto, cantidad);

    alert(cantidad + " unidad(es) de " + producto.nombre + " agregadas al carrito");
});

// Función para agregar un producto al carrito guardado en localStorage
function agregarAlCarrito(prod, cantidad) {
    // Leemos el carrito actual (o empezamos con uno vacío)
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Vemos si el producto ya estaba en el carrito
    let encontrado = false;

    carrito.forEach(function (item) {
        if (item.id === prod.id) {
            item.cantidad = item.cantidad + cantidad;
            encontrado = true;
        }
    });

    // Si no estaba lo agregamos
    if (!encontrado) {
        carrito.push({
            id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            imagen: prod.imagen,
            cantidad: cantidad
        });
    }

    // Guardamos el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
