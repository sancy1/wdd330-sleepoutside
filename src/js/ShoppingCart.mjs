
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  addToCart(product) {
    let cartItems = getLocalStorage(this.key) || [];
    const existingProductIndex = cartItems.findIndex((item) => item.Id === product.Id);

    if (existingProductIndex !== -1) {
      // If the item already exists, increase its quantity
      cartItems[existingProductIndex].quantity += product.quantity || 1;
    } else {
      // If the item is new, add it to the cart
      cartItems.push(product);
    }

    setLocalStorage(this.key, cartItems); // Save the updated cart to localStorage
    this.updateCartCount(); // Update the cart count in the header
    window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
  }

  removeItem(productId) {
    let cartItems = getLocalStorage(this.key) || [];
    cartItems = cartItems.filter((item) => item.Id !== productId);
    setLocalStorage(this.key, cartItems);
    this.updateCartCount(); // Update the cart count in the header
    window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
  }

  increaseQuantity(productId) {
    let cartItems = getLocalStorage(this.key) || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === productId);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = (cartItems[itemIndex].quantity || 1) + 1;
      setLocalStorage(this.key, cartItems);
      this.updateCartCount(); // Update the cart count in the header
      window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
    }
  }

  decreaseQuantity(productId) {
    let cartItems = getLocalStorage(this.key) || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === productId);
    if (itemIndex !== -1) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
      } else {
        cartItems.splice(itemIndex, 1);
      }
      setLocalStorage(this.key, cartItems);
      this.updateCartCount(); // Update the cart count in the header
      window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
    }
  }

  updateCartCount() {
    const cartItems = getLocalStorage(this.key) || [];
    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
      cartCountElement.textContent = cartCount; // Update the cart count in the header
      cartCountElement.style.display = cartCount > 0 ? "block" : "none"; // Show/hide the count
    }
  }
}