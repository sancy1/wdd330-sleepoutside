
import { getLocalStorage, qs } from "./utils.mjs";

function updateCartCount() {
    console.log("--- Updating cart count ---");
    const cartItems = getLocalStorage("so-cart");
    console.log("localStorage 'so-cart':", cartItems);

    if (!cartItems || !Array.isArray(cartItems)) {
        console.log("Cart items are empty or not an array. Setting count to 0.");
        updateCartDisplay(0);
        return;
    }

    const totalItems = cartItems.reduce((total, item) => {
        const qty = item.quantity || 1;
        console.log(`Item: ${item.Name || 'Unknown'}, Quantity: ${qty}`);
        return total + qty;
    }, 0);

    console.log("Total items calculated:", totalItems);
    updateCartDisplay(totalItems);
    console.log("--- Cart count update complete ---");
}

function updateCartDisplay(count) {
    const cartCountElement = qs(".cart-count");
    console.log("Cart count element:", cartCountElement);
    if (cartCountElement) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? "flex" : "none";
    } else {
        console.error("Cart count element not found!");
    }
}

function addCartListener(callback) {
    window.addEventListener("cart-change", callback);
}

// remove the dom content call, so that the function is only called after the header loads.
addCartListener(updateCartCount);

export { updateCartCount, addCartListener };