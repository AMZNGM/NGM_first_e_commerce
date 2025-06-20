import { cart } from "../data/cart-data-class.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/format-currency.js";
import { deliveryOptions } from "../data/delivery-options.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function reloadcart() {
  // clean cart start
  for (let i = cart.cartItems.length - 1; i >= 0; i--) {
    if (!getProduct(cart.cartItems[i].productId)) {
      cart.cartItems.splice(i, 1);
    }
  }
  // clean cart end

  // add items to cart start
  let cartItemsHTML = ``;

  cart.cartItems.forEach((cartItem) => {
    let productId = cartItem.productId;
    let matchingItems = getProduct(productId);
    if (!matchingItems) {
      return;
    }
    cartItemsHTML += `
    <div class="position-relative js-cartItemContainer-${matchingItems.id}">
      <div class="row bg-white shadow-sm mb-4 mx-1 d-flex align-items-center">
        <div
          class="col-md-3 d-flex justify-content-start align-items-center p-3">
          <img
            style="width: 20%"
            src="${matchingItems.image}"
            alt="product" />
          <h5 class="fs-6 p-3 m-0">${matchingItems.name}</h5>
        </div>

        <div
          class="col-md-3 d-flex justify-content-between justify-content-md-start">
          <h5 class="fs-6 p-3 m-0 d-block d-md-none">Price</h5>
          <span class="fs-6 p-3 m-0">$${formatCurrency(matchingItems.priceCents)}</span>
        </div>

        <div
          class="col-md-3 d-flex justify-content-between justify-content-md-start">
          <h5 class="fs-6 p-3 m-0 d-block d-md-none">Price</h5>

          <div class="d-flex justify-content-end justify-content-md-start">
            <button
              class="btn border-0 px-2 js-minusBtn"
              data-product-id="${matchingItems.id}">
              <i class="fas fa-minus"></i>
            </button>
            <input
              readonly
              id="form1"
              min="0"
              name="quantity"
              value="${cartItem.quantity}"
              type="number"
              class="border px-2 rounded-2 w-25"/>
            <button
              class="btn border-0 px-2 js-plusBtn"
              data-product-id="${matchingItems.id}">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <div
          class="col-md-3 d-flex justify-content-between justify-content-md-start">
          <h5 class="fs-6 p-3 m-0 d-block d-md-none">Subtotal</h5>
          <span class="fs-6 p-3 m-0">$${formatCurrency(
            matchingItems.priceCents * cartItem.quantity
          )}</span>
        </div>
      </div>

      <span data-product-id="${
        matchingItems.id
      }" class="js-delete-icon delete-icon p-3 mb-4 rounded-2 pointer position-absolute end-0 top-0"
          ><i class="fa-regular fa-trash-can"></i
      ></span>
    </div>`;
  });
  document.querySelector(`.js-cartProducts-container`).innerHTML = cartItemsHTML;

  cart.cartItemBtns(reloadcart);
  // add items to cart end

  // remove items from cart start
  document.querySelectorAll(`.js-delete-icon`).forEach((icon) => {
    icon.addEventListener(`click`, () => {
      let productId = icon.dataset.productId;
      cart.removeCartItem(productId);
      reloadcart();
    });
  });
  // remove items from cart end

  cart.updateCartIconQuantity();

  // delivery options start
  let deliveryOptionsHTML = ``;
  let deliveryOptionsIdLocalStorage = localStorage.getItem(`selectedDeliveryOptionId`);
  let cartPaymentHTML = ``;

  deliveryOptions.forEach((option, index) => {
    let deliveryOptionId = option.id;
    let deliveryDate = dayjs().add(option.deliveryDays, `days`);
    let deliveryDateFormatted = deliveryDate.format(`dddd, MMMM D`);
    let deliveryPriceFormatted =
      option.priceCents === 0 ? `FREE ` : `$${formatCurrency(option.priceCents)} - `;
    let isChecked = deliveryOptionsIdLocalStorage
      ? deliveryOptionsIdLocalStorage === deliveryOptionId
      : deliveryOptions[0].id;

    deliveryOptionsHTML += `
    <div class="delivery-option d-flex align-items-start mb-3">
      <input
        ${isChecked ? `checked` : ``}
        type="radio"
        class="form-check-input js-delivery-inputs"
        name="delivery-options"
        id="${deliveryOptionId}" />
      <label for="${deliveryOptionId}" class="ms-3 pointer">
        <div class="delivery-option-date">${deliveryDateFormatted}</div>
        <div class="delivery-option-price">${deliveryPriceFormatted}Shipping</div>
      </label>
    </div>
  `;

    document.querySelector(`.js-delivery-options`).innerHTML = deliveryOptionsHTML;

    let selectedOption = deliveryOptions.find((option) =>
      deliveryOptionsIdLocalStorage
        ? deliveryOptionsIdLocalStorage === option.id
        : deliveryOptions[0].id === option.id
    );
    let selectedDeliveryDate = dayjs()
      .add(selectedOption.deliveryDays, `days`)
      .format(`dddd, MMMM D`);
    document.querySelector(`.js-selectedDeliveryOptions`).innerHTML =
      selectedDeliveryDate;

    document.querySelectorAll(".js-delivery-inputs").forEach((input) => {
      input.addEventListener("change", (radio) => {
        localStorage.setItem("selectedDeliveryOptionId", radio.target.id);
        reloadcart();
      });
    });
  });
  // delivery options end

  // cart payment start
  let productsPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    if (!product) return;
    productsPriceCents += product.priceCents * cartItem.quantity;
  });

  let selectedOption = deliveryOptions.find((option) =>
    deliveryOptionsIdLocalStorage
      ? deliveryOptionsIdLocalStorage === option.id
      : deliveryOptions[0].id === option.id
  );
  let selectedDeliveryOptionPrice =
    selectedOption.priceCents === 0
      ? `FREE`
      : `$${formatCurrency(selectedOption.priceCents)}`;
  let totalPriceBeforTaxCent =
    productsPriceCents === 0 ? 0 : productsPriceCents + selectedOption.priceCents;
  let taxCent = totalPriceBeforTaxCent * 0.1;
  let totalPriceCenst = totalPriceBeforTaxCent + taxCent;
  let totalQuantity = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  cartPaymentHTML = `
  <div
    class="d-flex justify-content-between align-items-center border-bottom border-dark-subtle pb-2 mb-3">
    <h6>Subtotal for <span class="text-danger">(${totalQuantity})</span> items:</h6>
    <span>$${formatCurrency(productsPriceCents)}</span>
  </div>
  <div
    class="d-flex justify-content-between align-items-center border-bottom border-dark-subtle pb-2 mb-3">
    <h6>Shipping:</h6>
    <span>${selectedDeliveryOptionPrice}</span>
  </div>
  <div
    class="d-flex justify-content-between align-items-center border-bottom border-dark-subtle pb-2 mb-3">
    <h6>Total before tax:</h6>
    <span>$${formatCurrency(totalPriceBeforTaxCent)}</span>
  </div>
  <div
    class="d-flex justify-content-between align-items-center border-bottom border-dark-subtle pb-2 mb-3">
    <h6>Estimated tax (10%):</h6>
    <span>$${formatCurrency(taxCent)}</span>
  </div>
  <div
    class="d-flex justify-content-between align-items-center pb-2 mb-3">
    <h6 class="text-danger fw-bold">Total:</h6>
    <span class="text-danger fw-bold">$${formatCurrency(totalPriceCenst)}</span>
  </div>
`;

  document.querySelector(`.js-cart-payment`).innerHTML = cartPaymentHTML;
  // cart payment end
}

reloadcart();
