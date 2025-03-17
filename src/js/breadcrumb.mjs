import { getParam } from "./utils.mjs";

export function setBreadcrumb() {
  const breadcrumbElement = document.getElementById("breadcrumb");
  if (!breadcrumbElement) return;

  const category = getParam("category");
  const productId = getParam("product");
  const productCount = document.querySelector(".product-list")?.children.length;

  let breadcrumbText = "";

  if (category && productCount !== undefined) {
    breadcrumbText = `${category}->(${productCount} items)`;
  } else if (category && productId) {
    breadcrumbText = `${category}->${productId}`;
  } else if (category) {
    breadcrumbText = `${category}`;
  } else {
    breadcrumbText = ""; // No breadcrumb on the home page
  }

  breadcrumbElement.textContent = breadcrumbText;
}