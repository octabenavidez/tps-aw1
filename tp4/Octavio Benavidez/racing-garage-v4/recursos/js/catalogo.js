// Script del catálogo: dibuja las tarjetas de los productos y filtra por marca y categoría

import { productos } from "./productos.js";

// Elementos del HTML que vamos a usar
const contenedor = document.querySelector(".catalogo-productos");
const selectMarca = document.querySelector("#id-marca");
const selectCategoria = document.querySelector("#id-categoria");
const formularioFiltros = document.querySelector(".filtros-catalogo");

// Función que recibe una lista de productos y los dibuja en el contenedor
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos con esos filtros.</p>";
        return;
    }

    lista.forEach(function (producto) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <picture>
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </picture>
            <p>${producto.descripcionCorta}</p>
            <ul>
                <li>${producto.caracteristica}</li>
                <li>Precio $ ${producto.precio.toLocaleString("es-AR")}</li>
            </ul>
            <a class="boton-principal" href="./producto.html?id=${producto.id}">Ver más</a>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// Función que filtra los productos según los valores seleccionados en los desplegables
function filtrarProductos() {
    const marcaElegida = selectMarca.value;
    const categoriaElegida = selectCategoria.value;

    // Filtramos el array de productos manualmente
    const resultado = productos.filter(function (producto) {
        const coincideMarca = marcaElegida === "" || producto.marca === marcaElegida;
        const coincideCategoria = categoriaElegida === "" || producto.categoria === categoriaElegida;
        return coincideMarca && coincideCategoria;
    });

    mostrarProductos(resultado);
}

// Evento: cuando se envía el formulario de filtros aplicamos el filtro
formularioFiltros.addEventListener("submit", function (evento) {
    evento.preventDefault();
    filtrarProductos();
});

// Evento: también filtramos apenas cambia alguno de los selectores
selectMarca.addEventListener("change", filtrarProductos);
selectCategoria.addEventListener("change", filtrarProductos);

// Mostramos todos los productos al cargar la página
mostrarProductos(productos);
