
// // ShoppingCart.mjs
// import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// export default class ShoppingCart {
//   constructor(key, parentSelector) {
//     this.key = key;
//     this.parentSelector = parentSelector;
//   }

//   renderCartContents() {
//     const cartItems = getLocalStorage(this.key) || [];
//     const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
//     document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

//     document.querySelectorAll(".cart-card__remove").forEach((button) => {
//       button.addEventListener("click", (e) => {
//         this.removeItem(e.target.dataset.id);
//       });
//     });

//     this.updateCartTotal(cartItems);
//   }

//   removeItem(productId) {
//     let cartItems = getLocalStorage(this.key) || [];
//     cartItems = cartItems.filter((item) => item.Id !== productId);
//     setLocalStorage(this.key, cartItems);
//     this.renderCartContents();
//     this.updateCartIcon();
//   }

//   updateCartTotal(cartItems) {
//     const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
//     const cartFooter = document.querySelector(".cart-footer");
//     const cartTotal = document.querySelector(".cart-total");

//     if (cartItems.length > 0) {
//       cartFooter.classList.remove("hide");
//       cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
//     } else {
//       cartFooter.classList.add("hide");
//     }
//   }

//   updateCartIcon() {
//     const cartItems = getLocalStorage(this.key) || [];
//     const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const cartIcon = document.querySelector(".cart-count");

//     if (cartIcon) {
//       cartIcon.textContent = cartCount;
//     }
//   }

//   cartItemTemplate(item) {
//     return `<li class="cart-card divider">
//       <a href="#" class="cart-card__image">
//         <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
//       </a>
//       <a href="#">
//         <h2 class="card__name">${item.Name}</h2>
//       </a>
//       <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//       <p class="cart-card__quantity">qty: ${item.quantity}</p>
//       <p class="cart-card__price">$${item.FinalPrice}</p>
//       <button class="cart-card__remove" data-id="${item.Id}">X</button>
//     </li>`;
//   }
// }










import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  addToCart(product) {
    let cartItems = getLocalStorage(this.key) || [];
    const existingProductIndex = cartItems.findIndex((item) => item.Id === product.Id);

    if (existingProductIndex !== -1) {
      // If the item already exists, increase its quantity
      cartItems[existingProductIndex].quantity += product.quantity || 1;
    } else {
      // If the item is new, add it to the cart
      cartItems.push(product);
    }

    setLocalStorage(this.key, cartItems); // Save the updated cart to localStorage
    this.updateCartCount(); // Update the cart count in the header
    window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
  }

  removeItem(productId) {
    let cartItems = getLocalStorage(this.key) || [];
    cartItems = cartItems.filter((item) => item.Id !== productId);
    setLocalStorage(this.key, cartItems);
    this.updateCartCount(); // Update the cart count in the header
    window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
  }

  increaseQuantity(productId) {
    let cartItems = getLocalStorage(this.key) || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === productId);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = (cartItems[itemIndex].quantity || 1) + 1;
      setLocalStorage(this.key, cartItems);
      this.updateCartCount(); // Update the cart count in the header
      window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
    }
  }

  decreaseQuantity(productId) {
    let cartItems = getLocalStorage(this.key) || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === productId);
    if (itemIndex !== -1) {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
      } else {
        cartItems.splice(itemIndex, 1);
      }
      setLocalStorage(this.key, cartItems);
      this.updateCartCount(); // Update the cart count in the header
      window.dispatchEvent(new Event("cart-change")); // Notify other pages of the cart change
    }
  }

  updateCartCount() {
    const cartItems = getLocalStorage(this.key) || [];
    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.querySelector(".cart-count");

    if (cartCountElement) {
      cartCountElement.textContent = cartCount; // Update the cart count in the header
      cartCountElement.style.display = cartCount > 0 ? "block" : "none"; // Show/hide the count
    }
  }
}