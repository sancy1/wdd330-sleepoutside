
function initCarouselAndMagnifier() {
  console.log("initCarouselAndMagnifier() called"); // Check if the function is called

  const mainImage = document.getElementById("mainImage");
  const magnifier = document.querySelector(".magnifier");
  const carouselItems = document.querySelectorAll(".carousel-item img");
  const colorOptions = document.querySelectorAll(".color-option");

  console.log("mainImage:", mainImage);
  console.log("magnifier:", magnifier);
  console.log("carouselItems:", carouselItems);
  console.log("colorOptions:", colorOptions);

  if (!mainImage || !magnifier || carouselItems.length === 0 || colorOptions.length === 0) {
      console.warn("Elements not found in initCarouselAndMagnifier()");
      return;
  }

  // Image Magnifier
  mainImage.addEventListener("mousemove", (e) => {
      magnifier.style.display = "block";
      const { offsetX, offsetY } = e;
      const { offsetWidth, offsetHeight } = mainImage;
      const x = (offsetX / offsetWidth) * 100;
      const y = (offsetY / offsetHeight) * 100;
      magnifier.style.left = `${offsetX - 75}px`;
      magnifier.style.top = `${offsetY - 75}px`;
      mainImage.style.transformOrigin = `${x}% ${y}%`;
      mainImage.style.transform = "scale(2)";
  });

  mainImage.addEventListener("mouseleave", () => {
      magnifier.style.display = "none";
      mainImage.style.transform = "scale(1)";
  });

  // Carousel Image Click
  carouselItems.forEach((item) => {
      item.addEventListener("click", () => {
          mainImage.src = item.src;
      });
  });

  // Color Option Click
  colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
          colorOptions.forEach((opt) => opt.classList.remove("selected"));
          option.classList.add("selected");
          mainImage.src = option.dataset.preview;
      });
  });

  // Quantity Selector
  const quantityInput = document.getElementById("quantity");
  const increaseQtyButton = document.getElementById("increaseQty");
  const decreaseQtyButton = document.getElementById("decreaseQty");

  // Remove existing event listeners to avoid duplication
  increaseQtyButton.replaceWith(increaseQtyButton.cloneNode(true));
  decreaseQtyButton.replaceWith(decreaseQtyButton.cloneNode(true));

  // Add fresh event listeners
  document.getElementById("increaseQty").addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  document.getElementById("decreaseQty").addEventListener("click", () => {
      if (quantityInput.value > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
      }
  });
}

// Use MutationObserver to detect when the product details are added to the DOM
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
          const productDetailSection = document.querySelector(".product-detail-container");
          if (productDetailSection && productDetailSection.innerHTML.trim() !== "") {
              requestAnimationFrame(() => {
                  requestAnimationFrame(() => { // Double requestAnimationFrame
                      initCarouselAndMagnifier();
                      observer.disconnect();
                  });
              });
          }
      }
  }
});

// Observing the <main> element for changes
observer.observe(document.querySelector("main"), { childList: true, subtree: true });

// Ensure the code runs after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
});


