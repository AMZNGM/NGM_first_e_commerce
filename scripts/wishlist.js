import { wishlist } from "../data/wishlist-data-class.js";
import { formatCurrency } from "./utils/format-currency.js";
import { cart } from "../data/cart-data-class.js";
import { products } from "../data/products.js";
import { generateProductHTML } from "./shared/generatingProducts.js";
import { getRandomProducts } from "./shared/getRandomProducts.js";

const wishlistContainer = document.querySelector(".js-wishList-container");
const productsCount = document.querySelector(".js-productsCount");
const moveAllToCartBtn = document.querySelector(".js-moveAllToCartBtn");
const randomProducts = getRandomProducts(products, 4);

// generate Wishlist Products start
function generateWishlistProducts() {
  const wishlistItems = wishlist.getWishlistItems();
  productsCount.textContent = `(${wishlistItems.length})`;

  wishlistContainer.innerHTML = wishlistItems
    .map(
      (product) => `
      <div class="${product.productState} col-lg-3 col-6 mb-4" data-name="${
        product.name
      }" data-id="${product.id}" data-category="${product.category}">
        <div class="productHead w-100 h-75 d-flex flex-column justify-content-center
          align-items-center py-5 border-0 rounded-3 bg-secondary-subtle position-relative"
          >
          ${
            product.discount && product.discount.trim() !== ""
              ? `
            <span class="discount bg-danger text-white px-2 py-1 m-3 rounded-1 position-absolute top-0 start-0
                          d-flex justify-content-center align-items-center">
              ${product.discount}
            </span>
          `
              : ""
          }
          <div class="js-delete-btn headButtons position-absolute top-0 end-0 d-grid gap-2 mt-3 me-2">
            <i class="icon fa-regular fa-trash-can fa-xl fs-6 p-2 rounded-pill pointer" data-id="${
              product.id
            }"></i>
          </div>
          <img loading="lazy" style="width: 70%" src="${product.image}" alt="${
        product.name
      }"
      onclick="window.location.href='productDetailsPage.html?id=${product.id}'" />
        </div>
        <div class="productDetails mt-4">
          <h5 class="fs-6 pointer"
          onclick="window.location.href='productDetailsPage.html?id=${product.id}'">${
        product.name
      }</h5>
          <div class="d-flex gap-4">
            <p class="text-danger">$${formatCurrency(product.priceCents)}</p>
            ${
              product.oldpriceCents
                ? `
              <p class="text-black-50"><del>$${formatCurrency(
                product.oldpriceCents
              )}</del></p>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `
    )
    .join("");

  addEventListeners();
}

function addEventListeners() {
  const deleteButtons = document.querySelectorAll(".js-delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      wishlist.removeFromWishlist(productId);
      generateWishlistProducts();
    });
  });
}

function moveAllToCart() {
  const wishlistItems = wishlist.getWishlistItems();
  wishlistItems.forEach((product) => {
    cart.addToCart(product.id);
  });
  wishlist.wishlistItems = [];
  wishlist.saveToLocalStorage();
  wishlist.updateWishlistQuantity();

  generateWishlistProducts();
  cart.updateCartQuantity();
}
moveAllToCartBtn.addEventListener("click", moveAllToCart);

generateWishlistProducts();
// generate Wishlist Products end

// justForYou start
function updateJustForYouProducts() {
  const justForYouContainer = document.querySelector(".js-justForYou-container");
  if (!justForYouContainer) return;
  justForYouContainer.innerHTML = generateProductHTML(randomProducts);
}
updateJustForYouProducts();
// justForYou end
