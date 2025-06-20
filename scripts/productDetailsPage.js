import { products } from "../data/products.js";
import { generateProductHTML } from "./shared/generatingProducts.js";
import { getRandomProducts } from "./shared/getRandomProducts.js";
import { addToWishlistBtns } from "./shared/addToWishlistBtn.js";
import { formatCurrency } from "./utils/format-currency.js";
import { cart } from "../data/cart-data-class.js";

const productIdFromUrl = new URLSearchParams(window.location.search);
const productId = productIdFromUrl.get("id");
const currentProduct = products.find((product) => product.id === productId);
const productNameContainer = document.querySelector(`.js-productNameContainer`);
const relatedItemsContainer = document.querySelector(".js-relatedItems-container");
const productDetailsContainer = document.querySelector(".js-productDetailsContainer");
const relatedProducts = products.filter((product) => product.id !== productId);
const randomProducts = getRandomProducts(relatedProducts, 8);

// breadcrumb nav product name start
if (currentProduct && productNameContainer) {
  productNameContainer.innerHTML = currentProduct.name;
}
// breadcrumb nav product name end

// relatedItems start
function updaterelatedItemsContainer() {
  if (!relatedItemsContainer) return;
  relatedItemsContainer.innerHTML = generateProductHTML(randomProducts);
}
updaterelatedItemsContainer();
// relatedItems end

// Product Details Container Start
function generateProductDetailsHTML() {
  if (productDetailsContainer && currentProduct) {
    productDetailsContainer.innerHTML = `
      <h2 class="m-3 mt-4 mt-md-0 ms-0">${currentProduct.name}</h2>

      <div class="ratingStars d-flex align-items-center mb-3">
        <img src="images/ratings/rating-${
          currentProduct.rating.stars * 10
        }.png" width="80" alt="ratingStars" />
        <p class="text-muted mx-2">(${currentProduct.rating.count} Reviews)</p>
        <span>/</span>
        <p class="js-stockStatus ${
          currentProduct.inStock ? "text-success" : "text-danger"
        } ms-2">
          ${currentProduct.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      <div class="price-container">
        <span class="h4">$${formatCurrency(currentProduct.priceCents)}</span>
        ${
          currentProduct.oldpriceCents
            ? `<span class="text-muted text-decoration-line-through ms-2">$${formatCurrency(
                currentProduct.oldpriceCents
              )}</span>`
            : ""
        }
      </div>

      <p class="my-3">
        ${currentProduct.description || "No description available"}
      </p>

      <hr />

      <div class="d-flex align-items-start align-items-lg-center flex-lg-row flex-column gap-3 mb-5">
        <div class="d-flex align-items-center">
          <button
            class="js-decreaseBtn btn btn-lg border-dark rounded-end-0 w-25"
            style="height: 45px"
            ${!currentProduct.inStock ? "disabled" : ""}
          >
            -
          </button>
          <input
            type="number"
            class="js-quantityInput form-control text-center border-dark rounded-0"
            value="1"
            min="1"
            style="width: 80px; height: 45px"
            ${!currentProduct.inStock ? "disabled" : ""}
            readonly
          />
          <button
            class="js-increaseBtn btn border-dark rounded-start-0 w-25"
            style="height: 45px"
            ${!currentProduct.inStock ? "disabled" : ""}
          >
            +
          </button>
        </div>

        <div class="d-flex">
          <button 
            class="js-buyNowBtn btn btn-danger text-white border-0 btn-lg me-2 px-5"
            ${!currentProduct.inStock ? "disabled" : ""}
          >
            ${currentProduct.inStock ? "Buy Now" : "Out of Stock"}
          </button>
          <button class="js-wishlistBtn btn btn-danger text-white border-0 btn-lg">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    `;
  }
}
generateProductDetailsHTML();

const increaseBtn = document.querySelector(".js-increaseBtn");
const decreaseBtn = document.querySelector(".js-decreaseBtn");
const quantityInput = document.querySelector(".js-quantityInput");
if (increaseBtn && quantityInput) {
  increaseBtn.addEventListener("click", () => {
    if (!currentProduct.inStock) return;
    const productQuantity = parseInt(quantityInput.value);
    quantityInput.value = productQuantity + 1;
  });
}
if (decreaseBtn && quantityInput) {
  decreaseBtn.addEventListener("click", () => {
    if (!currentProduct.inStock) return;
    const productQuantity = parseInt(quantityInput.value);
    if (productQuantity > 1) {
      quantityInput.value = productQuantity - 1;
    }
  });
}

const buyNowBtn = document.querySelector(".js-buyNowBtn");
if (buyNowBtn && quantityInput) {
  buyNowBtn.addEventListener("click", () => {
    if (!currentProduct.inStock) return;
    const productQuantity = parseInt(quantityInput.value) || 1;
    cart.addToCart(currentProduct.id, productQuantity);
    cart.updateCartIconQuantity();
    window.location.href = "cart.html";
  });
}
// Product Details Container end

// product gallary start
function generateProductGallary(images) {
  const galleryContainer = document.querySelector(".js-productGallary");
  if (!galleryContainer) return;

  const thumbnailsHTML = images
    .map(
      (image, index) => `
    <img
      src="${image}"
      alt="Thumbnail ${index + 1}"
      class="thumbnail rounded p-1 m-1 bg-body-secondary ${index === 0 ? "active" : ""}"
      onclick="changeImage(event, this.src)"
    />
  `
    )
    .join("");

  galleryContainer.innerHTML = `
    <div class="col-md-2 p-0">
      <div class="d-flex justify-content-center d-md-grid">
        ${thumbnailsHTML}
      </div>
    </div>

    <div class="col-md-10 position-relative">
      <div class="bg-body-secondary product-image-cont d-flex justify-content-center align-items-center">
        <img
          alt="Product"
          id="mainImage"
          class="js-mainImage img-fluid product-image"
          src="${images[0]}"
          onclick="toggleFullscreen(this)"
        />
        
        <button class="btn btn-light position-absolute border-0 top-0 end-0 mt-1 me-3" onclick="toggleFullscreen(document.getElementById('mainImage'))">
          <i class="fas fa-expand"></i>
        </button>
      </div>
    </div>
  `;
  initializeZoom();
}

window.changeImage = function (event, newSrc) {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = newSrc;
  }

  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
    if (thumb.src === newSrc) {
      thumb.classList.add("active");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (currentProduct) {
    generateProductGallary(currentProduct.galleryImages);
  }
});

function initializeZoom() {
  const mainImage = document.getElementById("mainImage");
  if (!mainImage) return;

  mainImage.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = mainImage.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    mainImage.style.transformOrigin = `${x}% ${y}%`;
  });

  mainImage.addEventListener("mouseenter", () => {
    mainImage.style.transform = "scale(1.5)";
    mainImage.style.transition = "transform 0.3s ease";
  });

  mainImage.addEventListener("mouseleave", () => {
    mainImage.style.transform = "scale(1)";
  });
}

window.toggleFullscreen = function (element) {
  if (!element) return;

  try {
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  } catch (error) {
    console.error("Error toggling fullscreen:", error);
  }
};
// product gallary end
