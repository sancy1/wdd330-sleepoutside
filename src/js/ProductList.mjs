// import { renderListWithTemplate } from "./utils.mjs";

// function productCardTemplate(product) {
//   // Determine if the product is on clearance or new
//   const clearanceLabel = product.IsClearance ? '<span class="clearance-label">Clearance</span>' : '';
//   const newLabel = product.IsNew ? '<span class="new-label">New</span>' : '';

//   // Calculate discount percentage if FinalPrice is less than SuggestedRetailPrice
//   const discountPercentage = product.FinalPrice < product.SuggestedRetailPrice
//     ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
//     : 0;

//   // Display discount percentage if applicable
//   const discountLabel = discountPercentage > 0
//     ? `<span class="discount-label">${discountPercentage}% off</span>`
//     : '';

//   // Display ListPrice crossed out if it's different from FinalPrice
//   const priceDisplay = product.ListPrice !== product.FinalPrice
//     ? `<p class="product-card__price">
//          <span class="final-price">$${product.FinalPrice}</span>
//          <span class="list-price">$${product.ListPrice}</span>
//        </p>`
//     : `<p class="product-card__price">$${product.FinalPrice}</p>`;

//   // Star rating display
//   const starRating = product.Reviews.AverageRating > 0
//     ? `<div class="star-rating">
//          ${'★'.repeat(Math.round(product.Reviews.AverageRating))}
//          ${'☆'.repeat(5 - Math.round(product.Reviews.AverageRating))}
//          <span class="review-count">(${product.Reviews.ReviewCount})</span>
//        </div>`
//     : '<div class="star-rating"></div>';

//   return `
//     <li class="product-card">
//       <a href="../product_pages/index.html?product=${product.Id}">
//         ${clearanceLabel}
//         ${newLabel}
//         ${discountLabel}
//         <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
//         <h3 class="card__brand">${product.Brand.Name}</h3>
//         <h2 class="card__name">${product.Name}</h2>
//         ${priceDisplay}
//         ${starRating}
//         <p class="product-card__category">${product.Category}</p>
//       </a>
//     </li>`;
// }

// export default class ProductList {
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

//   async init() {
//     const list = await this.dataSource.getData(this.category);
//     this.renderList(list);
//     document.querySelector(".title").innerHTML = this.category;
//   }

//   renderList(list) {
//     renderListWithTemplate(productCardTemplate, this.listElement, list);
//   }
// }













import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Determine if the product is on clearance or new
  const clearanceLabel = product.IsClearance ? '<span class="clearance-label">Clearance</span>' : '';
  const newLabel = product.IsNew ? '<span class="new-label">New</span>' : '';

  // Calculate discount percentage if FinalPrice is less than SuggestedRetailPrice
  const discountPercentage = product.FinalPrice < product.SuggestedRetailPrice
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  // Display discount percentage if applicable
  const discountLabel = discountPercentage > 0
    ? `<span class="discount-label">${discountPercentage}% off</span>`
    : '';

  // Display ListPrice crossed out if it's different from FinalPrice
  const priceDisplay = product.ListPrice !== product.FinalPrice
    ? `<p class="product-card__price">
        <span class="final-price">$${product.FinalPrice}</span>
        <span class="list-price">$${product.ListPrice}</span>
      </p>`
    : `<p class="product-card__price">$${product.FinalPrice}</p>`;

  // Star rating display
  const starRating = product.Reviews.AverageRating > 0
    ? `<div class="star-rating">
        ${'★'.repeat(Math.round(product.Reviews.AverageRating))}
        ${'☆'.repeat(5 - Math.round(product.Reviews.AverageRating))}
        <span class="review-count">(${product.Reviews.ReviewCount})</span>
      </div>`
    : '<div class="star-rating"></div>';

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        ${clearanceLabel}
        ${newLabel}
        ${discountLabel}
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        ${priceDisplay}
        ${starRating}
        <p class="product-card__category">${product.Category}</p>
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    let list = [];
    if (this.category) {
      list = await this.dataSource.getData(this.category);
      document.querySelector(".title").innerHTML = this.category;
    } else {
      list = await this.dataSource.getData("all");
      document.querySelector(".title").innerHTML = "All Products"; // Or a default title
    }
    return list; // Return the fetched list
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}