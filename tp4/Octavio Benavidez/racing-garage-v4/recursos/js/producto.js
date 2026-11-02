// Script del detalle de producto
// Leemos el id del producto que el usuario eligió desde el catálogo (guardado en localStorage)
// y buscamos ese producto en el array para mostrar su información

import { productos } from "./productos.js";

// Buscamos el id guardado cuando hicieron click en "Ver más"
const idSeleccionado = localStorage.getItem("producto_seleccionado");

// Buscamos el producto que tiene ese id en el array
let producto = null;

productos.forEach(function (p) {
    if (p.id === idSeleccionado) {
        producto = p;
    }
});

// Si no encontramos ninguno usamos el primero como fallback
if (!producto) {
    producto = productos[0];
}

// Elementos del HTML
const titulo = document.querySelector(".detalle-producto h1");
const imagen = document.querySelector(".detalle-producto picture img");
const descripcion = document.querySelector(".detalle-producto > p");
const listaEspecificaciones = document.querySelector(".detalle-producto > ul");
const formulario = document.querySelector(".formulario-agregar");
const inputCantidad = document.querySelector("#id-cantidad");

// Llenamos el HTML con los datos del producto elegido
document.title = "Racing Garage - " + producto.nombre;
titulo.textContent = producto.nombre;
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

// Agregamos el precio al final
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

    // Leemos el carrito actual (o empezamos con uno vacío)
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Vemos si el producto ya estaba en el carrito
    let encontrado = false;

    carrito.forEach(function (item) {
        if (item.id === producto.id) {
            item.cantidad = item.cantidad + cantidad;
            encontrado = true;
        }
    });

    // Si no estaba, lo agregamos
    if (!encontrado) {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(cantidad + " unidad(es) de " + producto.nombre + " agregadas al carrito");
});
