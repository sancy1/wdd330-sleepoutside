
// import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import ProductDetails from "./productDetails.mjs";

// // Get product ID from URL
// const productId = getParam("product");

// const dataSource = new ProductData("tents");
// const product = new ProductDetails(productId, dataSource);

// // Initialize product details page
// product.init();

// // Add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // Add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

// function addProductToCart(product) {
//   let cartItems = getLocalStorage("so-cart") || [];
//   const existingProductIndex = cartItems.findIndex((item) => item.Id === product.Id);

//   if (existingProductIndex !== -1) {
//     cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
//   } else {
//     product.quantity = 1;
//     cartItems.push(product);
//   }

//   setLocalStorage("so-cart", cartItems);
//   alert("Item added to cart successfully!");
// }








// import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import ProductDetails from "./productDetails.mjs";

// // Get product ID from URL
// const productId = getParam("product");

// const dataSource = new ProductData(); //Remove tents category.
// const product = new ProductDetails(productId, dataSource);

// // Initialize product details page
// product.init();

// // Add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product[0]); // pass the first object of the array.
// }

// // Add listener to Add to Cart button
// document.addEventListener("DOMContentLoaded", () => {
//   const addToCartButton = document.getElementById("addToCart");
//   if (addToCartButton) {
//     addToCartButton.addEventListener("click", addToCartHandler);
//   }
// });

// function addProductToCart(product) {
//   let cartItems = getLocalStorage("so-cart") || [];
//   const existingProductIndex = cartItems.findIndex(
//     (item) => item.Id === product.Id
//   );

//   if (existingProductIndex !== -1) {
//     cartItems[existingProductIndex].quantity =
//       (cartItems[existingProductIndex].quantity || 1) + 1;
//   } else {
//     product.quantity = 1;
//     cartItems.push(product);
//   }

//   setLocalStorage("so-cart", cartItems);
//   alert("Item added to cart successfully!");
// }





import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

// Get product ID from URL
const productId = getParam("product");
console.log("Product ID from URL:", productId); // Debugging

if (!productId) {
  console.error("Product ID not found in URL");
} else {
  const dataSource = new ProductData();
  const product = new ProductDetails(productId, dataSource);

  // Initialize product details page
  product.init();

  // Add to cart button event handler
  async function addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    addProductToCart(product);
  }

  // Add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);

  function addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart") || [];
    const existingProductIndex = cartItems.findIndex((item) => item.Id === product.Id);

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cartItems.push(product);
    }

    setLocalStorage("so-cart", cartItems);
    alert("Item added to cart successfully!");
  }
}