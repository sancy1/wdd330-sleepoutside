// cartCount.js
// import { getLocalStorage, qs } from "./utils.mjs";

// export function updateCartCount() {
//   const cartItems = getLocalStorage("so-cart") || [];
//   const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
//   const cartCountElement = qs("#cart-count");
//   const cartIcon = qs(".cart svg");

//   if (cartCountElement && cartIcon) {
//     cartCountElement.textContent = totalItems;
//     cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
//     cartIcon.classList.add("cart-icon-animation");

//     cartIcon.addEventListener(
//       "animationend",
//       () => {
//         cartIcon.classList.remove("cart-icon-animation");
//       },
//       { once: true }
//     );
//   }
// }

// export function addCartListener(callback) {
//   window.addEventListener("cart-change", callback);
// }















// // cartCount.js
// import { getLocalStorage, qs } from "./utils.mjs";

// function updateCartCount() {
//   console.log("Updating cart count..."); // Debugging
//   const cartItems = getLocalStorage("so-cart") || [];
//   console.log("Cart items in localStorage:", cartItems); // Debugging
//   const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
//   const cartCountElement = qs(".cart-count");

//   if (cartCountElement) {
//     console.log("Cart count element found:", cartCountElement); // Debugging
//     cartCountElement.textContent = totalItems;
//     cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
//   } else {
//     console.error("Cart count element not found!"); // Debugging
//   }
// }

// function addCartListener(callback) {
//   window.addEventListener("cart-change", callback);
// }

// // Wait for the DOM to load before running the script
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM fully loaded"); // Debugging
//   updateCartCount(); // Initialize cart count on page load
//   addCartListener(updateCartCount); // Update cart count when the cart changes
// });

// // Export the functions
// export { updateCartCount, addCartListener };












// cartCount.js
import { getLocalStorage, qs } from "./utils.mjs";

function updateCartCount() {
  console.log("Updating cart count..."); // Debugging
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart items in localStorage:", cartItems); // Debugging
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartCountElement = qs(".cart-count");

  if (cartCountElement) {
    console.log("Cart count element found:", cartCountElement); // Debugging
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
  } else {
    console.error("Cart count element not found!"); // Debugging
  }
}

function addCartListener(callback) {
  window.addEventListener("cart-change", callback);
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // Debugging
  updateCartCount(); // Initialize cart count on page load
  addCartListener(updateCartCount); // Update cart count when the cart changes
});

// Export the functions
export { updateCartCount, addCartListener };