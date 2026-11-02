/**
 * @fileoverview Page controller for catalogo.html.
 * Handles filter state, form events, dynamic rendering, and URL sync.
 */

import { getAllProducts, filterProducts } from "../data/products-data.js";
import { renderCatalog } from "../modules/catalog-renderer.js";
import { initHeaderNavigation } from "../modules/header-navigation.js";

/**
 * Initializes the catalog page logic and event listeners.
 */
function initCatalogPage() {
    initHeaderNavigation();

    const catalogContainer = document.querySelector(".catalogo-productos");
    const filterForm = document.querySelector(".filtros-catalogo");
    const brandSelect = document.querySelector("#id-marca");
    const categorySelect = document.querySelector("#id-categoria");

    if (!catalogContainer) return;

    // Read initial filters from URL query parameters (e.g. from index category links)
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get("categoria") || "";
    const initialBrand = urlParams.get("marca") || "";

    if (categorySelect && initialCategory) {
        categorySelect.value = initialCategory;
    }
    if (brandSelect && initialBrand) {
        brandSelect.value = initialBrand;
    }

    /**
     * Applies active filters and renders the matching products.
     */
    function applyActiveFilters() {
        const selectedCategory = categorySelect?.value || "";
        const selectedBrand = brandSelect?.value || "";

        const filtered = filterProducts({
            category: selectedCategory,
            brand: selectedBrand
        });

        // Update URL query parameters cleanly without refreshing the page
        const newUrl = new URL(window.location.href);
        if (selectedCategory) {
            newUrl.searchParams.set("categoria", selectedCategory);
        } else {
            newUrl.searchParams.delete("categoria");
        }
        if (selectedBrand) {
            newUrl.searchParams.set("marca", selectedBrand);
        } else {
            newUrl.searchParams.delete("marca");
        }
        window.history.replaceState({}, "", newUrl);

        renderCatalog(filtered, catalogContainer, resetFilters);
    }

    /**
     * Clears all filters back to the default state and re-renders full catalog.
     */
    function resetFilters() {
        if (categorySelect) categorySelect.value = "";
        if (brandSelect) brandSelect.value = "";
        applyActiveFilters();
    }

    // Intercept form submission to prevent unnecessary page reload
    filterForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        applyActiveFilters();
    });

    // Provide immediate reactive filtering on dropdown change
    categorySelect?.addEventListener("change", applyActiveFilters);
    brandSelect?.addEventListener("change", applyActiveFilters);

    // Initial render
    applyActiveFilters();
}

// Bootstraps page when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCatalogPage);
} else {
    initCatalogPage();
}
