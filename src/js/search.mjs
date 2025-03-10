// import { qs, getParam, renderListWithTemplate } from './utils.mjs';
// import ProductData from './ProductData.mjs';

// const category = getParam('category');
// const searchQuery = getParam('search');

// const dataSource = new ProductData();
// const productListElement = qs('.product-list');

// export async function initSearch() {
//     let products;
//     if (searchQuery) {
//         products = await dataSource.searchProducts(searchQuery);
//     } else if (category) {
//         products = await dataSource.getData(category);
//     } else {
//         products = await dataSource.getData('all'); // Assuming 'all' fetches all products
//     }

//     renderProductList(products);
//     setupSorting(products);
// }

// function renderProductList(products) {
//     const template = (product) => `
//         <li class="product-card">
//             <a href="/product_pages/index.html?product=${product.Id}">
//                 <img src="${product.Image}" alt="${product.Name}" />
//                 <h3>${product.Name}</h3>
//                 <p>$${product.FinalPrice}</p>
//             </a>
//         </li>
//     `;
//     renderListWithTemplate(template, productListElement, products, 'beforeend', true);
// }

// function setupSorting(products) {
//     const sortByName = () => {
//         products.sort((a, b) => a.Name.localeCompare(b.Name));
//         renderProductList(products);
//     };

//     const sortByPrice = () => {
//         products.sort((a, b) => a.FinalPrice - b.FinalPrice);
//         renderProductList(products);
//     };

//     // Add event listeners for sorting buttons
//     qs('#sort-by-name').addEventListener('click', sortByName);
//     qs('#sort-by-price').addEventListener('click', sortByPrice);
// }








import { qs, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs'; // Import ProductList

const category = getParam('category');
const searchQuery = getParam('search');

const dataSource = new ProductData();
const productListElement = qs('.product-list');

export async function initSearch() {
  let products;
  if (searchQuery) {
    console.log("Searching for:", searchQuery);
    products = await dataSource.searchProducts(searchQuery);
    console.log("Search results:", products);
  } else if (category) {
    console.log("Loading category:", category);
    products = await dataSource.getData(category);
  } else {
    console.log("Loading all products");
    products = await dataSource.getData('all');
  }

  if (products && products.length > 0) {
    const listing = new ProductList(category, dataSource, productListElement); // Create a ProductList instance
    listing.renderList(products); // Use the renderList method
    setupSorting(products);
  } else {
    console.log("No products found");
    productListElement.innerHTML = "<p>No products found.</p>";
  }
}

function setupSorting(products) {
  const sortByName = () => {
    products.sort((a, b) => a.Name.localeCompare(b.Name));
    const listing = new ProductList(category, dataSource, productListElement);
    listing.renderList(products);
  };

  const sortByPrice = () => {
    products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    const listing = new ProductList(category, dataSource, productListElement);
    listing.renderList(products);
  };

  qs('#sort-by-name').addEventListener('click', sortByName);
  qs('#sort-by-price').addEventListener('click', sortByPrice);
}