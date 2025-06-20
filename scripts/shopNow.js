import { products } from "../data/products.js";
import { generateProductHTML } from "./shared/generatingProducts.js";
import { addToCartBtns } from "./shared/addToCartBtn.js";
import { timer } from "./shared/timer.js";
import { getRandomProducts } from "./shared/getRandomProducts.js";
import { getRandomNumber } from "./utils/getRandomNumber.js";
import { updateHeartIcons } from "./shared/wishlist.js";

timer();

const randomProducts = getRandomProducts(products, getRandomNumber(5, 15));
const shopNowContainer = document.querySelector(".js-products-container-4");
const seeMoreBtn = document.querySelector(`.js-seeMoreBtn`);
let isLoading = false;
let generatedProducts = new Set();
randomProducts.forEach((product) => generatedProducts.add(product.id));

// generating products start
if (shopNowContainer) {
  shopNowContainer.innerHTML = generateProductHTML(randomProducts);
}
addToCartBtns();
// generating products end

updateHeartIcons();

// see more btn start
function loading() {
  if (seeMoreBtn) {
    seeMoreBtn.innerHTML =
      '<span class="loading-spinner d-inline-block rounded-pill"></span> Loading...';
    seeMoreBtn.disabled = true;
  }
}
function hideLoading() {
  if (seeMoreBtn) {
    seeMoreBtn.innerHTML = "See More";
    seeMoreBtn.disabled = false;
  }
}
function noMoreProducts() {
  if (seeMoreBtn) {
    seeMoreBtn.innerHTML = "No More Products";
    seeMoreBtn.disabled = true;
  }
}

async function renderSeeMoreProducts() {
  if (!seeMoreBtn || isLoading) return;
  if (generatedProducts.size >= products.length) {
    noMoreProducts();
    return;
  }

  try {
    isLoading = true;
    loading();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const availableProducts = products.filter(
      (product) => !generatedProducts.has(product.id)
    );
    const newRandomProducts = getRandomProducts(availableProducts, getRandomNumber(3, 8));
    if (newRandomProducts.length === 0) {
      noMoreProducts();
      return;
    }
    newRandomProducts.forEach((product) => generatedProducts.add(product.id));
    shopNowContainer.innerHTML += generateProductHTML(newRandomProducts);
    addToCartBtns();
    if (generatedProducts.size >= products.length) {
      noMoreProducts();
    }
  } catch (error) {
    console.error("Error loading more products:", error);
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = "Sorry, there was an error loading more products.";
    shopNowContainer.appendChild(errorMessage);
  } finally {
    isLoading = false;
    hideLoading();
  }
}

if (shopNowContainer && seeMoreBtn) {
  seeMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    renderSeeMoreProducts();
  });
}
// see more btn end
