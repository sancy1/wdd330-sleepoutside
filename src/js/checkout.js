
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Update order totals when the zip code field loses focus
document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

// Listen for form submission
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form submission
  myCheckout.checkout(e); // Pass the event object
});