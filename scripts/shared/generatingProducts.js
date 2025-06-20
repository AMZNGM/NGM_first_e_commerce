import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/format-currency.js";

// generating products start
export let productHTML = "";

export function generateProductHTML(products) {
  let productHTML = "";

  products.forEach((product) => {
    productHTML += `
    <div class="${product.productState} col-lg-3 col-6 mb-4" data-name="${
      product.name
    }" data-id="${product.id}" data-category="${product.category}">
      <div
        class="productHead w-100 h-75 d-flex flex-column justify-content-center align-items-center py-5 border-0 rounded-3 bg-secondary-subtle position-relative"
        >
        ${
          product.discount && product.discount.trim() !== ""
            ? `<span class="discount text-white m-3 rounded-1 position-absolute top-0 start-0 d-flex justify-content-center align-items-center">${product.discount}</span>`
            : ""
        }

        <div class="headButtons position-absolute top-0 end-0 d-grid gap-2 mt-3 me-2">
          <i class="js-addToWishlistBtn icon fa-regular fa-heart fa-xl fs-6 p-2 rounded-pill pointer" data-product-id="${
            product.id
          }"></i>
        </div>

        <img loading="lazy" style="width: 70%" alt="${product.name}" src="${
      product.image
    }"
    onclick="window.location.href='productDetailsPage.html?id=${product.id}'" />

        <button data-product-id="${
          product.id
        }" class="addToCartBtn js-addToCartBtn mt-4 p-2 px-3 shadow-lg text-white position-absolute bottom-0 start-0">
          Add To Cart
        </button>

        <select
        class="productQuantity js-productQuantity mt-4 p-2 px-3  text-black border-0 position-absolute bottom-0 end-0 border ">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="productDetails mt-4">
        <h5 class="fs-6 pointer" onclick="window.location.href='productDetailsPage.html?id=${
          product.id
        }'">${product.name}</h5>
        <div class="d-flex gap-4">
          <p class="text-danger">$${formatCurrency(product.priceCents)}</p>
          <p class="text-black-50">
          ${
            product.oldpriceCents && product.oldpriceCents !== ""
              ? `<del>$${formatCurrency(product.oldpriceCents)}</del>`
              : ""
          }
          </p>
        </div>
        <div class="ratingStars d-flex align-items-center">
          <img src="images/ratings/rating-${
            product.rating.stars * 10
          }.png" width="80" alt="ratingStars" />
          <span class="ratingCount text-black-50 ms-3">(${product.rating.count})</span>
        </div>
      </div>
    </div>`;
  });
  return productHTML;
}
// generating products end
