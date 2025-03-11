// MODIFY THIS CODE TO FETCH ALL PRODUCTS FROM ALL CATEGORY

// import { qs } from './utils.mjs';
// import ProductData from './ProductData.mjs';
// import ProductList from './ProductList.mjs';

// const dataSource = new ProductData();
// const productListElement = qs('.product-list');

// function handleSearchSubmit(event) {
//   event.preventDefault();
//   const searchInput = qs('#search-input');
//   const searchTerm = searchInput.value.trim().toLowerCase();

//   if (searchTerm) {
//     performProductSearch(searchTerm);
//   }
// }

// async function performProductSearch(searchTerm) {
//   const categories = ["tents", "hammocks", "sleeping-bags", "backpacks"];
//   let allResults = [];

//   for (const category of categories) {
//     try {
//       const products = await dataSource.getData(category);
//       const filteredProducts = products.filter(product => {
//         return product.Name.toLowerCase().includes(searchTerm);
//       });
//       allResults = allResults.concat(filteredProducts);
//     } catch (error) {
//       console.error(`Error fetching products for category ${category}:`, error);
//     }
//   }

//   displaySearchResults(allResults);
// }

// function displaySearchResults(products) {
//   if (products && products.length > 0) {
//     const listing = new ProductList(null, dataSource, productListElement);
//     listing.renderList(products);
//   } else {
//     productListElement.innerHTML = "<p>No matching products found.</p>";
//   }
// }

// function setupSorting(products) {
//   const sortByName = () => {
//     products.sort((a, b) => a.Name.localeCompare(b.Name));
//     displaySearchResults(products);
//   };

//   const sortByPrice = () => {
//     products.sort((a, b) => a.FinalPrice - b.FinalPrice);
//     displaySearchResults(products);
//   };

//   qs('#sort-by-name').addEventListener('click', sortByName);
//   qs('#sort-by-price').addEventListener('click', sortByPrice);
// }

// export async function initSearch() {
//   const categories = ["tents", "hammocks", "sleeping-bags", "backpacks"];
//   let allResults = [];

//   // Fetch all products from all categories for initial load
//   for (const cat of categories) {
//     try {
//       const products = await dataSource.getData(cat);
//       allResults = allResults.concat(products);
//     } catch (error) {
//       console.error(`Error fetching products for category ${cat}:`, error);
//     }
//   }
//   displaySearchResults(allResults);
//   setupSorting(allResults);

//   qs('#search-form').addEventListener('submit', handleSearchSubmit);
// }



















// import { qs, getParam } from './utils.mjs';
// import ProductData from './ProductData.mjs';
// import ProductList from './ProductList.mjs';

// const dataSource = new ProductData();
// const productListElement = qs('.product-list');

// function handleSearchSubmit(event) {
//   event.preventDefault();
//   const searchInput = qs('#search-input');
//   const searchTerm = searchInput.value.trim().toLowerCase();

//   if (searchTerm) {
//     performCategorySearch(searchTerm);
//   }
// }

// async function performCategorySearch(searchTerm) {
//   const category = getParam('category');
//   if (!category) {
//     productListElement.innerHTML = "<p>Please select a category to search.</p>";
//     return;
//   }

//   try {
//     const products = await dataSource.getData(category);
//     const filteredProducts = products.filter(product => {
//       return product.Name.toLowerCase().includes(searchTerm);
//     });

//     displaySearchResults(filteredProducts, searchTerm);
//   } catch (error) {
//     console.error(`Error fetching products for category ${category}:`, error);
//     productListElement.innerHTML = "<p>Error fetching products. Please try again.</p>";
//   }
// }

// function displaySearchResults(products, searchTerm) {
//   const countMessage = qs('.search-count-message');
//   if (countMessage) {
//     countMessage.remove();
//   }

//   if (products && products.length > 0) {
//     productListElement.innerHTML = '';
//     const listing = new ProductList(null, dataSource, productListElement);
//     listing.renderList(products);
//     if (searchTerm) {
//         productListElement.insertAdjacentHTML('beforebegin', `<p class="search-count-message">Found ${products.length} products matching "${searchTerm}".</p>`);
//     }
//   } else {
//     productListElement.innerHTML = "<p>No matching products found.</p>";
//   }
// }

// function setupSorting(products) {
//   const sortByName = () => {
//     products.sort((a, b) => a.Name.localeCompare(b.Name));
//     displaySearchResults(products, null); // Pass null to avoid displaying count
//   };

//   const sortByPrice = () => {
//     products.sort((a, b) => a.FinalPrice - b.FinalPrice);
//     displaySearchResults(products, null); // Pass null to avoid displaying count
//   };

//   qs('#sort-by-name').addEventListener('click', sortByName);
//   qs('#sort-by-price').addEventListener('click', sortByPrice);
// }

// function clearSearch() {
//   const category = getParam('category');
//   if (category) {
//     window.location.href = `/product_listing/index.html?category=${category}`;
//   } else {
//     window.location.href = `/product_listing/index.html`;
//   }
// }

// export async function initSearch() {
//   const category = getParam('category');
//   if (category) {
//     const products = await dataSource.getData(category);
//     setupSorting(products);
//     const clearButton = document.createElement('button');
//     clearButton.textContent = 'Clear Search';
//     clearButton.addEventListener('click', clearSearch);
//     qs('.product-list').insertAdjacentElement('beforebegin', clearButton);
//   }
//   qs('#search-form').addEventListener('submit', handleSearchSubmit);
// }








import { qs, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData();
const productListElement = qs('.product-list');

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = qs('#search-input');
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm) {
    performCategorySearch(searchTerm);
  }
}

async function performCategorySearch(searchTerm) {
  const category = getParam('category');
  if (!category) {
    productListElement.innerHTML = "<p>Please select a category to search.</p>";
    return;
  }

  try {
    const products = await dataSource.getData(category);
    const filteredProducts = products.filter(product => {
      return product.Name.toLowerCase().includes(searchTerm);
    });

    displaySearchResults(filteredProducts, searchTerm);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    productListElement.innerHTML = "<p>Error fetching products. Please try again.</p>";
  }
}

function displaySearchResults(products, searchTerm) {
  const countMessage = qs('.search-count-message');
  if (countMessage) {
    countMessage.remove();
  }

  if (products && products.length > 0) {
    productListElement.innerHTML = '';
    const listing = new ProductList(null, dataSource, productListElement);
    listing.renderList(products);
    if (searchTerm) {
      productListElement.insertAdjacentHTML(
        'beforebegin',
        `<p class="search-count-message">Found ${products.length} products matching "${searchTerm}".</p>`
      );
    }
  } else {
    productListElement.innerHTML = "<p>No matching products found.</p>";
  }
}

function setupSorting(products) {
  const sortByName = () => {
    products.sort((a, b) => a.Name.localeCompare(b.Name));
    displaySearchResults(products, null);
  };

  const sortByPrice = () => {
    products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    displaySearchResults(products, null);
  };

  qs('#sort-by-name').addEventListener('click', sortByName);
  qs('#sort-by-price').addEventListener('click', sortByPrice);
}

function clearSearch() {
  const category = getParam('category');
  if (category) {
    window.location.href = `/product_listing/index.html?category=${category}`;
  } else {
    window.location.href = `/product_listing/index.html`;
  }
}

export async function initSearch() {
  const category = getParam('category');
  if (category) {
    const products = await dataSource.getData(category);
    setupSorting(products);

    // Create Clear Search button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Search';
    clearButton.addEventListener('click', clearSearch);
    clearButton.classList.add('clear-search-red'); // Add this line

    // Append Clear Search button to the sorting div
    qs('.sorting').appendChild(clearButton);
  }
  qs('#search-form').addEventListener('submit', handleSearchSubmit);
}


