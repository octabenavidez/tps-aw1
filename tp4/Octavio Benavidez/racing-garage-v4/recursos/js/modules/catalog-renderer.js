/**
 * @fileoverview DOM rendering engine for the catalog product grid.
 * Constructs product cards conforming to the project's semantic structure and styling.
 */

/**
 * Formats a numeric price into a localized currency string.
 * @param {number} price - Numeric price value
 * @returns {string} Formatted price string with thousands separator
 */
export function formatPrice(price) {
    return new Intl.NumberFormat("es-AR").format(price);
}

/**
 * Generates an article DOM element for a single product card.
 * @param {import('../data/products-data.js').Product} product - Product data object
 * @returns {HTMLElement} Article element containing the product card markup
 */
export function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "tarjeta-producto";
    article.dataset.productId = product.id;
    article.dataset.category = product.category;
    article.dataset.brand = product.brand;

    article.innerHTML = `
        <h3>${product.name}</h3>
        <picture>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </picture>
        <p>${product.shortDescription}</p>
        <ul>
            <li>${product.feature}</li>
            <li>Precio $ ${formatPrice(product.price)}</li>
        </ul>
        <a class="boton-principal" href="./producto.html?id=${encodeURIComponent(product.id)}">Ver más</a>
    `;

    return article;
}

/**
 * Renders an array of products into the catalog DOM container.
 * Shows an informative empty-state message if the list is empty.
 * @param {import('../data/products-data.js').Product[]} products - Products to render
 * @param {HTMLElement} container - Catalog container element (.catalogo-productos)
 * @param {Function} [onResetFilters] - Optional callback triggered when clicking reset filters
 */
export function renderCatalog(products, container, onResetFilters) {
    if (!container) return;

    container.innerHTML = "";

    if (!products || products.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "mensaje-vacio";
        emptyState.innerHTML = `
            <p>No se encontraron productos con los filtros seleccionados.</p>
            <button class="boton-secundario boton-restablecer" type="button">Restablecer filtros</button>
        `;

        if (typeof onResetFilters === "function") {
            const resetButton = emptyState.querySelector(".boton-restablecer");
            resetButton?.addEventListener("click", onResetFilters);
        }

        container.appendChild(emptyState);
        return;
    }

    const fragment = document.createDocumentFragment();
    products.forEach((product) => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
