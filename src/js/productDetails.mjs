
import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Template for product details
function productDetailsTemplate(product) {
  const discount = product.SuggestedRetailPrice - product.FinalPrice;
  const discountPercentage = (discount / product.SuggestedRetailPrice) * 100;

  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <div class="product-card__price-container">
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        <p class="product-card__suggested-price">MSRP: $${product.SuggestedRetailPrice.toFixed(2)}</p>
        ${
          discount > 0
            ? `<p class="product-card__discount">You save: $${discount.toFixed(2)} (${discountPercentage.toFixed(0)}% off)</p>`
            : ""
        }
      </div>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      console.log("Fetching product details for ID:", this.productId); // Debugging line
      this.product = await this.dataSource.findProductById(this.productId);
      console.log("Product Data:", this.product); // Debugging line

      this.renderProductDetails("main");

      // Add event listener for "Add to Cart" button
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
      console.error("Error initializing product details:", error);
    }
  }

  addToCart() {
    try {
      let cartItems = getLocalStorage("so-cart") || [];
      const existingProductIndex = cartItems.findIndex((item) => item.Id === this.product.Id);

      if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
      } else {
        this.product.quantity = 1;
        cartItems.push(this.product);
      }

      setLocalStorage("so-cart", cartItems);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.insertAdjacentHTML(
        "afterBegin",
        productDetailsTemplate(this.product)
      );
    } else {
      console.error(`Element with selector "${selector}" not found.`);
    }
  }
}