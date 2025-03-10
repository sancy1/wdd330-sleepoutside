
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // No need for category or path in the constructor
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

//   async searchProducts(query) {  // SEARCH ================================
//     const response = await fetch(`${baseURL}products/search?q=${query}`);
//     const data = await convertToJson(response);
//     return data.Result;
// }

async searchProducts(query) {
  const response = await fetch(`${baseURL}products/search?q=${query}`);
  const data = await convertToJson(response);
  console.log("Search API Response:", data); // Debugging

  // If the response is an array, return it directly
  if (Array.isArray(data.Result)) {
    console.log("Multiple products found:", data.Result); // Debugging
    return data.Result;
  }
  // If the response is a single product, wrap it in an array
  if (data.Result) {
    console.log("Single product found:", data.Result); // Debugging
    return [data.Result];
  }
  console.log("No products found"); // Debugging
  return []; // Return an empty array if no results
}

}