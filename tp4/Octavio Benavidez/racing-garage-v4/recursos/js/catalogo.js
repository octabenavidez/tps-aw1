// Script para la página del catálogo de productos
import { productos } from "./productos.js";
import { actualizarContadorCarrito } from "./carrito.js";

// Elementos de la página
const contenedor = document.querySelector(".catalogo-productos");
const formularioFiltros = document.querySelector(".filtros-catalogo");
const selectMarca = document.querySelector("#id-marca");
const selectCategoria = document.querySelector("#id-categoria");

// Función que dibuja las tarjetas de los productos en el HTML
function renderizarProductos(lista) {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    // Si no hay productos con ese filtro mostramos un aviso
    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje-vacio">
                <p>No se encontraron productos con los filtros seleccionados.</p>
                <button type="button" class="boton-secundario" id="btn-restablecer">Ver todos los productos</button>
            </div>
        `;

        document.querySelector("#btn-restablecer")?.addEventListener("click", () => {
            if (selectMarca) selectMarca.value = "";
            if (selectCategoria) selectCategoria.value = "";
            aplicarFiltros();
        });
        return;
    }

    // Recorremos los productos y creamos cada tarjeta
    lista.forEach((prod) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <h3>${prod.nombre}</h3>
            <picture>
                <img src="${prod.imagen}" alt="${prod.nombre}">
            </picture>
            <p>${prod.descripcionCorta}</p>
            <ul>
                <li>${prod.caracteristica}</li>
                <li>Precio $ ${prod.precio.toLocaleString("es-AR")}</li>
            </ul>
            <a class="boton-principal" href="./producto.html?id=${prod.id}">Ver más</a>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// Función que filtra según la marca y categoría elegidas
function aplicarFiltros() {
    const marca = selectMarca ? selectMarca.value : "";
    const categoria = selectCategoria ? selectCategoria.value : "";

    const resultado = productos.filter((prod) => {
        const coincideMarca = !marca || prod.marca === marca || prod.marca === "universal";
        const coincideCategoria = !categoria || prod.categoria === categoria;
        return coincideMarca && coincideCategoria;
    });

    renderizarProductos(resultado);
}

// Evento al enviar el formulario de filtros (evitamos que recargue la página)
formularioFiltros?.addEventListener("submit", (e) => {
    e.preventDefault();
    aplicarFiltros();
});

// Eventos para filtrar de forma automática al cambiar de opción
selectMarca?.addEventListener("change", aplicarFiltros);
selectCategoria?.addEventListener("change", aplicarFiltros);

// Si entramos desde el inicio con un filtro por URL (ej: catalogo.html?categoria=interior)
const params = new URLSearchParams(window.location.search);
const categoriaInicial = params.get("categoria");
const marcaInicial = params.get("marca");

if (categoriaInicial && selectCategoria) {
    selectCategoria.value = categoriaInicial;
}
if (marcaInicial && selectMarca) {
    selectMarca.value = marcaInicial;
}

// Inicializamos la vista
actualizarContadorCarrito();
aplicarFiltros();
