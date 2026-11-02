/**
 * @fileoverview Shopping cart state persistence manager using browser localStorage.
 * Handles storage, updates, total calculations, and change event dispatching.
 */

const STORAGE_KEY = "racing_garage_cart_v1";

/**
 * @typedef {Object} CartItem
 * @property {string} id - Product unique identifier
 * @property {string} name - Product display name
 * @property {number} price - Unit price
 * @property {string} image - Product image URL
 * @property {number} quantity - Quantity of items ordered
 */

/**
 * Dispatches a custom window event to notify components when cart state changes.
 */
function notifyCartChange() {
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart: getCart() } }));
}

/**
 * Retrieves the current cart array from localStorage.
 * @returns {CartItem[]} Array of items in the cart
 */
export function getCart() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error reading cart from localStorage:", error);
        return [];
    }
}

/**
 * Persists the cart array to localStorage and notifies listeners.
 * @param {CartItem[]} cart - Array of cart items to persist
 */
export function saveCart(cart) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        notifyCartChange();
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
}

/**
 * Adds a product to the cart or increments its quantity if it already exists.
 * @param {Object} product - Product to add
 * @param {string} product.id - Product ID
 * @param {string} product.name - Product title
 * @param {number} product.price - Product price
 * @param {string} product.image - Product image URL
 * @param {number} [quantity=1] - Quantity to add (must be at least 1)
 * @returns {CartItem[]} Updated cart items array
 */
export function addToCart(product, quantity = 1) {
    const validQuantity = Math.max(1, parseInt(quantity, 10) || 1);
    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += validQuantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: validQuantity
        });
    }

    saveCart(cart);
    return cart;
}

/**
 * Updates the quantity of a specific item in the cart.
 * If the new quantity is less than or equal to 0, the item is removed.
 * @param {string} productId - ID of the product to update
 * @param {number} newQuantity - New quantity count
 * @returns {CartItem[]} Updated cart items array
 */
export function updateCartQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity, 10);
    const cart = getCart();

    if (quantity <= 0) {
        return removeFromCart(productId);
    }

    const item = cart.find((entry) => entry.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
    return cart;
}

/**
 * Removes an item completely from the cart.
 * @param {string} productId - ID of the product to remove
 * @returns {CartItem[]} Updated cart items array
 */
export function removeFromCart(productId) {
    const cart = getCart().filter((entry) => entry.id !== productId);
    saveCart(cart);
    return cart;
}

/**
 * Clears all items from the cart.
 */
export function clearCart() {
    saveCart([]);
}

/**
 * Calculates the total number of individual items in the cart.
 * @returns {number} Total count of units
 */
export function getCartTotalCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculates the total monetary subtotal for all items in the cart.
 * @returns {number} Total currency subtotal
 */
export function getCartSubtotal() {
    return getCart().reduce(
        (subtotal, item) => subtotal + item.price * item.quantity,
        0
    );
}
