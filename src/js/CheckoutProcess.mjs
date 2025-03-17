

import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  console.log("Form data converted to JSON:", convertedJSON); // Debugging
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity || 1, // Ensure quantity is included
    };
  });

  console.log("Cart items packaged for server:", simplifiedItems); // Debugging
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");

    // Calculate the total number of items, including quantities
    const totalItems = this.list.reduce((total, item) => total + (item.quantity || 1), 0);
    itemNumElement.innerText = totalItems;

    // Calculate the total price of all items
    const amounts = this.list.map((item) => (item.FinalPrice || 0) * (item.quantity || 1));
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
  }

  calculateOrderTotal() {
    // Calculate the total number of items, including quantities
    const totalItems = this.list.reduce((total, item) => total + (item.quantity || 1), 0);

    // Calculate shipping: $10 for the first item + $2 for each additional item
    this.shipping = 10 + (totalItems - 1) * 2;

    // Calculate tax: 6% of the item total
    this.tax = (this.itemTotal * 0.06).toFixed(2);

    // Calculate the order total
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    // Display the updated totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }

  validateForm(formData) {
    const errors = [];

    // Validate required fields
    const requiredFields = ["fname", "lname", "street", "city", "state", "zip", "cardNumber", "expiration", "code"];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(`${field} is required.`);
      }
    });

    // Validate card number (16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(formData.cardNumber)) {
      errors.push("Card number must be 16 digits.");
    }

    // Validate expiration date (MM/YY)
    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationRegex.test(formData.expiration)) {
      errors.push("Expiration date must be in the format MM/YY.");
    }

    // Validate security code (3 or 4 digits)
    const codeRegex = /^\d{3,4}$/;
    if (!codeRegex.test(formData.code)) {
      errors.push("Security code must be 3 or 4 digits.");
    }

    return errors;
  }

  async checkout(event) {
    event.preventDefault(); // Prevent default form submission

    const formElement = document.forms["checkout"];
    const formData = formDataToJSON(formElement);

    // Validate the form
    const errors = this.validateForm(formData);
    if (errors.length > 0) {
      alert(errors.join("\n")); // Display all validation errors
      return;
    }

    // Prepare the order object
    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.fname,
      lname: formData.lname,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: String(formData.cardNumber), // Ensure it's a string
      expiration: formData.expiration.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{2})/, "$1/$2"), // Ensure MM/YY format
      code: String(formData.code), // Ensure it's a string
      items: packageItems(this.list),
      orderTotal: parseFloat(this.orderTotal).toFixed(2), // Ensure it's a string with 2 decimal places
      shipping: parseFloat(this.shipping).toFixed(2),
      tax: parseFloat(this.tax).toFixed(2),
    };

    console.log("Dynamically generated order object:", order);

    try {
      const res = await services.checkout(order);
      console.log("Server response:", res);

      // Clear the cart after successful checkout
      localStorage.removeItem(this.key);

      // Redirect to the success page
      window.location.href = "/checkout/success.html";
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again."); // Display error message to the user
    }
  }
}