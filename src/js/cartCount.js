

import { getLocalStorage, qs } from "./utils.mjs";

/**
 * Updates the cart count displayed in the header.
 * Logs detailed information for debugging purposes.
 */
function updateCartCount() {
  console.log("--- Starting updateCartCount ---");

  // Retrieve cart items from localStorage
  const cartItems = getLocalStorage("so-cart");
  console.log("Retrieved cart items from localStorage:", cartItems);

  // If cartItems is null or not an array, set count to 0
  if (!cartItems || !Array.isArray(cartItems)) {
    console.warn("Cart items are empty or not an array. Setting count to 0.");
    updateCartDisplay(0);
    console.log("--- updateCartCount completed ---");
    return;
  }

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => {
    const qty = item.quantity || 1; // Default to 1 if quantity is not set
    console.log(`Processing item: ${item.Name || 'Unknown'}, Quantity: ${qty}`);
    return total + qty;
  }, 0);

  console.log("Total items calculated:", totalItems);

  // Update the cart count display
  updateCartDisplay(totalItems);
  console.log("--- updateCartCount completed ---");
}

/**
 * Updates the cart count display in the DOM.
 * @param {number} count - The total number of items in the cart.
 */
function updateCartDisplay(count) {
  console.log("--- Starting updateCartDisplay ---");
  console.log("Count to display:", count);

  // Find the cart count element in the DOM
  const cartCountElement = qs(".cart-count");
  console.log("Cart count element:", cartCountElement);

  if (cartCountElement) {
    // Update the text content and visibility of the cart count element
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? "flex" : "none";
    console.log("Cart count updated successfully.");
  } else {
    console.error("Cart count element not found in the DOM!");
  }

  console.log("--- updateCartDisplay completed ---");
}

/**
 * Adds a listener for the 'cart-change' event and calls the provided callback.
 * @param {Function} callback - The function to call when the 'cart-change' event is triggered.
 */
function addCartListener(callback) {
  console.log("Adding 'cart-change' event listener...");
  window.addEventListener("cart-change", callback);
  console.log("'cart-change' event listener added successfully.");
}

// Add the updateCartCount function as a listener for the 'cart-change' event
addCartListener(updateCartCount);

// Export the functions for use in other modules
export { updateCartCount, addCartListener };