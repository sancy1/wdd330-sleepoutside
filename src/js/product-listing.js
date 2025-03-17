
// src/js/product-listing.js
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { initSearch } from "./search.mjs";
import { setBreadcrumb } from "./breadcrumb.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchQuery = getParam("search");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

if (!searchQuery) {
  listing.init().then((list) => {
    listing.renderList(list);

    // Add event listeners for Quick View buttons
    document.querySelectorAll(".quick-view-button").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const productId = e.target.dataset.id;
        const product = await dataSource.findProductById(productId);
        openQuickViewModal(product);
      });
    });

    // Set breadcrumb after rendering the list
    setBreadcrumb();
  });
}

initSearch();

// Function to open the Quick View modal
function openQuickViewModal(product) {
  const modal = document.getElementById("quick-view-modal");
  const modalContent = document.getElementById("modal-product-details");

  // Populate modal with product details
  modalContent.innerHTML = `
    <h2>${product.Name}</h2>
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
    <p>${product.DescriptionHtmlSimple}</p>
    <p>Price: $${product.FinalPrice}</p>
  `;

  // Display the modal
  modal.style.display = "block";
}

// Close the modal when the close button is clicked
document.querySelector(".close-modal").addEventListener("click", () => {
  const modal = document.getElementById("quick-view-modal");
  modal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", (e) => {
  const modal = document.getElementById("quick-view-modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});