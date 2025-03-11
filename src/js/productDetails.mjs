
// import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// function productDetailsTemplate(product) {
//   // Generate the carousel for extra images
//   const extraImages = product.Images.ExtraImages
//     .map(
//       (image) => `
//         <div class="carousel-item">
//           <img src="${image.Src}" alt="${image.Title}" />
//         </div>
//       `
//     )
//     .join("");

//   // Generate color options if available
//   const colorOptions = product.Colors
//     .map(
//       (color) => `
//         <div class="color-option" data-preview="${color.ColorPreviewImageSrc}">
//           <img src="${color.ColorChipImageSrc}" alt="${color.ColorName}" />
//           <span>${color.ColorName}</span>
//         </div>
//       `
//     )
//     .join("");

//   // Generate the price comparison section
//   const priceComparison = product.SuggestedRetailPrice
//     ? `<p class="price-comparison">
//          <span class="suggested-price">Suggested: $${product.SuggestedRetailPrice}</span>
//          <span class="list-price">List: $${product.ListPrice}</span>
//        </p>`
//     : "";

//   // Generate the review section
//   const reviewSection = product.Reviews.ReviewCount > 0
//     ? `<div class="reviews">
//          <div class="star-rating" style="--rating-width: ${(product.Reviews.AverageRating / 5) * 100}%;">
//            ★★★★★
//          </div>
//          <a href="${product.Reviews.ReviewsUrl}" class="review-count">(${product.Reviews.ReviewCount} reviews)</a>
//        </div>`
//     : `<div class="reviews">
//          <div class="star-rating no-rating">☆☆☆☆☆</div>
//          <span class="review-count"></span>
//        </div>`;

//   // Generate the clearance/new label
//   const statusLabel = product.IsClearance
//     ? '<span class="status-label clearance">Clearance</span>'
//     : product.IsNew
//     ? '<span class="status-label new">New</span>'
//     : "";

//   return `
//     <div class="product-specs">
//       <section class="product-detail">
//         ${statusLabel}
//         <div class="product-images">
//           <div class="main-image">
//             <img src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}" id="mainImage" />
//             <div class="magnifier"></div>
//           </div>
//           <div class="carousel">
//             ${extraImages}
//           </div>
//         </div>
//         <div class="product-info">
//           <h1>${product.Name}</h1>
//           <div class="brand-info">
//             <a href="${product.Brand.ProductsUrl}">
//               <img src="${product.Brand.LogoSrc}" alt="${product.Brand.Name}" />
//               <span>${product.Brand.Name}</span>
//             </a>
//           </div>
//           ${reviewSection}
//           <div class="price">
//             <span class="final-price">$${product.FinalPrice}</span>
//             ${priceComparison}
//           </div>
//           <div class="color-options">
//             <h3>Color:</h3>
//             ${colorOptions}
//           </div>
//           <div class="quantity">
//             <h3>Quantity:</h3>
//             <button type="button" class="quantity-btn" id="decreaseQty">-</button>
//             <input type="number" id="quantity" value="1" min="1" />
//             <button type="button" class="quantity-btn" id="increaseQty">+</button>
//           </div>
//           <div class="product-detail__add">
//             <button type="button" id="addToCart" data-id="${product.Id}">Add to Cart</button>
//           </div>
//           <div class="description">
//             <h3>Description:</h3>
//             ${product.DescriptionHtmlSimple}
//           </div>
//         </div>
//       </section>
//     </div>
//   `;
// }

// export default class ProductDetails {
//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }

//   async init() {
//     console.log("Fetching product with ID:", this.productId); // Debugging

//     try {
//         const productData = await this.dataSource.findProductById(this.productId);
//         console.log("Product Data:", productData); 
//         if (!productData || !productData.Id) {
//             console.error("Product not found with ID:", this.productId);
//             document.querySelector(".tents-product-detail").innerHTML = "<p>Product not found.</p>";
//             return;
//         }

//         this.product = productData;  
//         this.renderProductDetails(".tents-product-detail");
//         document.getElementById("decreaseQty").addEventListener("click", () => this.adjustQuantity(-1));
//         document.getElementById("increaseQty").addEventListener("click", () => this.adjustQuantity(1));
//         document.getElementById("addToCart").addEventListener("click", () => this.addToCart());

//     } catch (error) {
//         console.error("Error fetching product:", error);
//     }
// }


//   adjustQuantity(change) {
//     const quantityInput = document.getElementById("quantity");
//     let quantity = parseInt(quantityInput.value, 10);
//     quantity += change;
//     if (quantity < 1) quantity = 1; 
//     quantityInput.value = quantity;
//   }

//   addToCart() {
//     const quantity = parseInt(document.getElementById("quantity").value, 10);
//     let cartContents = getLocalStorage("so-cart") || [];
  
//     const productInCart = cartContents.find((item) => item.Id === this.product.Id);
  
//     if (productInCart) {
//       productInCart.quantity += quantity;
//     } else {
//       const productToAdd = { ...this.product, quantity };
//       cartContents.push(productToAdd);
//     }
  
//     setLocalStorage("so-cart", cartContents);
  
//     // Dispatch the cart-change event
//     window.dispatchEvent(new Event("cart-change"));
  
//     alert(`${this.product.Name} (Quantity: ${quantity}) added to cart!`);
//   }

//   renderProductDetails(selector) {
//     const element = document.querySelector(".tents-product-detail");
//     element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
//   }
  
// }
















import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  // Generate the carousel for extra images
  const extraImages = product.Images.ExtraImages
    ? product.Images.ExtraImages
        .map(
          (image) => `
            <div class="carousel-item">
              <img src="${image.Src}" alt="${image.Title}" />
            </div>
          `
        )
        .join("")
    : "";

  // Generate color options if available
  const colorOptions = product.Colors
    ? product.Colors
        .map(
          (color) => `
            <div class="color-option" data-preview="${color.ColorPreviewImageSrc}">
              <img src="${color.ColorChipImageSrc}" alt="${color.ColorName}" />
              <span>${color.ColorName}</span>
            </div>
          `
        )
        .join("")
    : "";

  // Generate the price comparison section
  const priceComparison = product.SuggestedRetailPrice
    ? `<p class="price-comparison">
          <span class="suggested-price">Suggested: $${product.SuggestedRetailPrice}</span>
          <span class="list-price">List: $${product.ListPrice}</span>
        </p>`
    : "";

  // Generate the review section
  const reviewSection = product.Reviews.ReviewCount > 0
    ? `<div class="reviews">
          <div class="star-rating" style="--rating-width: ${(product.Reviews.AverageRating / 5) * 100}%;">
            ★★★★★
          </div>
          <a href="${product.Reviews.ReviewsUrl}" class="review-count">(${product.Reviews.ReviewCount} reviews)</a>
        </div>`
    : `<div class="reviews">
          <div class="star-rating no-rating">☆☆☆☆☆</div>
          <span class="review-count"></span>
        </div>`;

  // Generate the clearance/new label
  const statusLabel = product.IsClearance
    ? '<span class="status-label clearance">Clearance</span>'
    : product.IsNew
    ? '<span class="status-label new">New</span>'
    : "";

  return `
    <div class="product-specs">
      <section class="product-detail">
        
        <div class="product-images">
          <div class="main-image">
            <img src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}" id="mainImage" />
            <div class="magnifier"></div>
          </div>
          <div class="carousel">
            ${extraImages}
          </div>
        </div>
        <div class="product-info">
          <h1>${product.Name}</h1>
          <div class="brand-info">
            <a href="${product.Brand.ProductsUrl}">
              <img src="${product.Brand.LogoSrc}" alt="${product.Brand.Name}" />
              <span>${product.Brand.Name}</span>
            </a>
          </div>
          ${reviewSection}
          <div class="price">
            <span class="final-price">$${product.FinalPrice}</span>
            ${priceComparison}
          </div>
          <div class="color-options">
            <h3>Color:</h3>
            ${colorOptions}
          </div>
          <div class="quantity">
            <h3>Quantity:</h3>
            <button type="button" class="quantity-btn" id="decreaseQty">-</button>
            <input type="number" id="quantity" value="1" min="1" />
            <button type="button" class="quantity-btn" id="increaseQty">+</button>
          </div>
          <div class="product-detail__add">
            <button type="button" id="addToCart" data-id="${product.Id}">Add to Cart</button>
          </div>
          <div class="description">
            <h3>Description:</h3>
            ${product.DescriptionHtmlSimple}
          </div>
        </div>
      </section>
    </div>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    console.log("Fetching product with ID:", this.productId); // Debugging

    try {
      const productData = await this.dataSource.findProductById(this.productId);
      console.log("Product Data:", productData);
      if (!productData || !productData.Id) {
        console.error("Product not found with ID:", this.productId);
        document.querySelector(".product-detail-container").innerHTML = "<p>Product not found.</p>"; // use a general container
        return;
      }

      this.product = productData;
      this.renderProductDetails(".product-detail-container"); // use a general container
      document.getElementById("decreaseQty").addEventListener("click", () => this.adjustQuantity(-1));
      document.getElementById("increaseQty").addEventListener("click", () => this.adjustQuantity(1));
      document.getElementById("addToCart").addEventListener("click", () => this.addToCart());
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  adjustQuantity(change) {
    const quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value, 10);
    quantity += change;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
  }

  addToCart() {
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    let cartContents = getLocalStorage("so-cart") || [];

    const productInCart = cartContents.find((item) => item.Id === this.product.Id);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      const productToAdd = { ...this.product, quantity };
      cartContents.push(productToAdd);
    }

    setLocalStorage("so-cart", cartContents);

    // Dispatch the cart-change event
    window.dispatchEvent(new Event("cart-change"));

    alert(`${this.product.Name} (Quantity: ${quantity}) added to cart!`);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if(element){
      element.innerHTML = '';//clear element content
      element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    } else {
      console.error(`Element with selector ${selector} not found!`);
    }
  }
}