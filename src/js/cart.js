
import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";
import { addCartListener, updateCartCount } from "./cartCount.js";

function calculateCartTotals(cartItems) {
  if (!Array.isArray(cartItems)) return { totalItems: 0, totalAmount: 0 };
  return cartItems.reduce(
      (acc, item) => ({
          totalItems: acc.totalItems + (item.quantity || 1),
          totalAmount: acc.totalAmount + (item.FinalPrice || 0) * (item.quantity || 1),
      }),
      { totalItems: 0, totalAmount: 0 }
  );
}

function cartItemTemplate(item) {
  if (!item) return "";
  return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
          <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="#">
          <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <div class="cart-card__quantity">
          <button class="quantity-btn decrease-quantity" data-id="${item.Id}">-</button>
          <span class="quantity-display">${item.quantity || 1}</span>
          <button class="quantity-btn increase-quantity" data-id="${item.Id}">+</button>
      </div>
      <p class="cart-card__price">$${((item.FinalPrice || 0) * (item.quantity || 1)).toFixed(2)}</p>
      <span class="delete-item" data-id="${item.Id}">X</span>
  </li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totals = calculateCartTotals(cartItems);

  const itemsHtml = cartItems.map((item) => cartItemTemplate(item)).join("");
  const productList = qs(".product-list");
  if (productList) {
      if (cartItems.length > 0) {
          productList.innerHTML = itemsHtml;
      } else {
          productList.innerHTML = "<li class='clear-text'>No items in the cart.</li>";
      }
  }

  document.querySelectorAll(".delete-item").forEach((button) => {
      button.addEventListener("click", deleteItem);
  });

  document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", increaseQuantity);
  });
  document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
  });

  // Update cart total
  const cartFooter = qs(".cart-footer");
  const cartTotal = qs(".cart-total");
  if (cartFooter && cartTotal) {
      if (cartItems.length > 0) {
          cartFooter.classList.remove("hide");
          cartTotal.innerHTML = `Total Items: ${totals.totalItems}<br>Total: $${totals.totalAmount.toFixed(2)}`;
      } else {
          cartFooter.classList.add("hide");
      }
  }
}

function deleteItem(event) {
    const itemId = event.target.dataset.id;
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);

    window.dispatchEvent(new Event("cart-change"));
    renderCartContents();
}

function increaseQuantity(event) {
    const itemId = event.target.dataset.id;
    const cartItems = getLocalStorage("so-cart") || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = (cartItems[itemIndex].quantity || 1) + 1;
        setLocalStorage("so-cart", cartItems);

        window.dispatchEvent(new Event("cart-change"));
        renderCartContents();
    }
}

function decreaseQuantity(event) {
    const itemId = event.target.dataset.id;
    const cartItems = getLocalStorage("so-cart") || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
    if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
        } else {
            cartItems.splice(itemIndex, 1);
        }
        setLocalStorage("so-cart", cartItems);
        window.dispatchEvent(new Event("cart-change"));

        renderCartContents();
    }
}

function clearCart() {
    setLocalStorage("so-cart", []); // Clear the cart in localStorage
    window.dispatchEvent(new Event("cart-change")); // Notify other parts of the app
    renderCartContents(); // Re-render the cart
}

document.addEventListener("DOMContentLoaded", () => {
    renderCartContents();
    // Add event listener for the clear cart button
    const clearCartButton = qs("#clearCart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }
});

addCartListener(updateCartCount);

export { renderCartContents };