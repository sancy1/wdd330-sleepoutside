
import { updateCartCount } from "./cartCount.js"; // Import the function

// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  try {
      const value = localStorage.getItem(key);
      console.log(`getLocalStorage: Key=${key}, Value=${value}`); // Debugging log
      if (value === null) {
          return null; // Handle null case explicitly
      }
      return JSON.parse(value);
  } catch (error) {
      console.error(`Error getting localStorage for key=${key}:`, error);
      return null; // Return null on error
  }
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Retrieve a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Render a list of items using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
      parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Render a template into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
      callback(data);
  }
}

// Load a template from a file
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  console.log("Loading header...");
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  console.log("Header and footer loaded.");
  // Call updateCartCount after header is loaded
  updateCartCount();
}


// Breadcrumbs
export function setBreadcrumb(category, productName, productCount) {
  const breadcrumbElement = document.getElementById("breadcrumb");
  if (!breadcrumbElement) return;

  let breadcrumbText = "";

  if (category && productCount !== undefined) {
    breadcrumbText = `${category}->(${productCount} items)`;
  } else if (category && productName) {
    breadcrumbText = `${category}->${productName}`;
  } else if (category) {
    breadcrumbText = `${category}`;
  } else {
    breadcrumbText = ""; // No breadcrumb on the home page
  }

  breadcrumbElement.textContent = breadcrumbText;
}