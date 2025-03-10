// import { loadHeaderFooter, getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import ProductList from "./ProductList.mjs";

// loadHeaderFooter();

// const category = getParam("category");
// const dataSource = new ProductData();
// const element = document.querySelector(".product-list");
// const listing = new ProductList(category, dataSource, element);

// listing.init();



import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { initSearch } from "./search.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchQuery = getParam("search");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

if (!searchQuery) {
  listing.init().then((list) => {
    listing.renderList(list);
  });
}

initSearch();