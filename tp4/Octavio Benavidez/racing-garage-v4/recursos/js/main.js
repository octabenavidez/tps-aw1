/**
 * @fileoverview Main entry point script for general pages (index, nosotros).
 * Initializes global layout components such as header cart counter badges.
 */

import { initHeaderNavigation } from "./modules/header-navigation.js";

/**
 * Initializes common application features.
 */
function initApp() {
    initHeaderNavigation();
}

// Bootstraps when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
