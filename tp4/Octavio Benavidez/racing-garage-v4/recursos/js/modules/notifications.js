/**
 * @fileoverview Visual toast notification module for user feedback.
 */

let activeToastTimeout = null;

/**
 * Displays a temporary toast notification on the screen.
 * @param {string} message - Message text to display to the user
 * @param {'success' | 'info' | 'warning'} [type='success'] - Visual style of toast
 */
export function showNotification(message, type = "success") {
    let toast = document.querySelector(".notificacion-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "notificacion-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    // Clear previous pending hide timer if triggered repeatedly
    if (activeToastTimeout) {
        clearTimeout(activeToastTimeout);
    }

    toast.textContent = message;
    toast.className = `notificacion-toast notificacion-${type} notificacion-visible`;

    activeToastTimeout = setTimeout(() => {
        toast.classList.remove("notificacion-visible");
    }, 3200);
}
