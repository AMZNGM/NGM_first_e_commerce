import { cart } from "../data/cart-data-class.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/format-currency.js";
import { deliveryOptions } from "../data/delivery-options.js";

// add items to checkOut start
let checkOutItemsHTML = ``;

cart.cartItems.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingItems = getProduct(productId);
  if (!matchingItems) {
    return;
  }
  checkOutItemsHTML += `
    <li class="d-flex justify-content-between align-items-center mb-3 pt-1">
      <div class="d-flex justify-content-start align-items-center gap-3">
        <img
          src="${matchingItems.image}"
          alt="${matchingItems.name}"
          style="width: 50px"
        />
        <h6>${matchingItems.name}</h6>
      </div>
      <span class="text-muted">$${formatCurrency(
        matchingItems.priceCents * cartItem.quantity
      )}</span>
    </li>`;
});
document.querySelector(`.js-checkOutProducts-container`).innerHTML = checkOutItemsHTML;
// add items to checkOut end

// checkOut payment start
let cartPaymentHTML = ``;
let deliveryOptionsIdLocalStorage = localStorage.getItem(`selectedDeliveryOptionId`);
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

let totalPriceBeforTaxCent = productsPriceCents + selectedOption.priceCents;

const selectedPaymentMethodId = localStorage.getItem("selectedPaymentMethodId");
if (selectedPaymentMethodId === "cod") {
  totalPriceBeforTaxCent += 200;
}

let taxCent = totalPriceBeforTaxCent * 0.1;
let totalPriceCenst = totalPriceBeforTaxCent + taxCent;

cartPaymentHTML = `
      <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
        <span>Subtotal:</span>
        <span>$${formatCurrency(productsPriceCents)}</span>
      </li>

      <hr />

      <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
        <span>Shipping:</span>
        <span>${selectedDeliveryOptionPrice}</span>
      </li>

      ${
        selectedPaymentMethodId === "cod"
          ? `
      <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
        <span>COD Fee:</span>
        <span>$${formatCurrency(200)}</span>
      </li>
      `
          : ""
      }

      <hr />

      <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
        <span>Total:</span>
        <strong>$${formatCurrency(totalPriceCenst)}</strong>
      </li>
`;

document.querySelector(`.js-checkOutPayment-container`).innerHTML = cartPaymentHTML;
// checkOut payment end

// Payment methods start
const paymentMethodsHTML = `
  <hr class="mt-4">
  <div class="payment-methods mb-4">
    <h5 class="mb-3 ">Payment Method</h5>
    <div class="payment-method js-payment-method active" data-payment-method-id="credit-card">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="paymentMethod" id="creditCard" checked>
        <label class="form-check-label" for="creditCard">
          Credit Card
        </label>
      </div>
      <div class="saved-card mt-2" style="display: block;">
        <small class="text-muted">Using saved card ending in ****1234</small>
      </div>
    </div>
    <div class="payment-method js-payment-method" data-payment-method-id="cod">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="paymentMethod" id="cod">
        <label class="form-check-label" for="cod">
          Cash on Delivery
        </label>
      </div>
      <div class="cod-fee mt-2" style="display: none;">
        <small class="text-danger">+$2.00 COD fee</small>
      </div>
    </div>
  </div>
  <hr class="mt-4">
`;

document.querySelector(".js-payment-methods-container").innerHTML = paymentMethodsHTML;

localStorage.setItem("selectedPaymentMethodId", "credit-card");

document.querySelectorAll(".js-payment-method").forEach((paymentMethod) => {
  paymentMethod.addEventListener("click", () => {
    document.querySelectorAll(".js-payment-method").forEach((method) => {
      method.classList.remove("active");
      method.querySelector(".saved-card, .cod-fee").style.display = "none";
    });

    paymentMethod.classList.add("active");

    const paymentMethodId = paymentMethod.dataset.paymentMethodId;
    if (paymentMethodId === "credit-card") {
      paymentMethod.querySelector(".saved-card").style.display = "block";
    } else if (paymentMethodId === "cod") {
      paymentMethod.querySelector(".cod-fee").style.display = "block";
    }

    localStorage.setItem("selectedPaymentMethodId", paymentMethodId);

    updatePaymentSummary();
  });
});

function updatePaymentSummary() {
  const selectedPaymentMethodId = localStorage.getItem("selectedPaymentMethodId");
  const paymentMethodElement = document.querySelector(
    `[data-payment-method-id="${selectedPaymentMethodId}"]`
  );

  if (paymentMethodElement) {
    paymentMethodElement.classList.add("active");
    if (selectedPaymentMethodId === "credit-card") {
      paymentMethodElement.querySelector(".saved-card").style.display = "block";
    } else if (selectedPaymentMethodId === "cod") {
      paymentMethodElement.querySelector(".cod-fee").style.display = "block";
    }
  }

  let newTotalPriceBeforTaxCent = productsPriceCents + selectedOption.priceCents;
  if (selectedPaymentMethodId === "cod") {
    newTotalPriceBeforTaxCent += 200;
  }
  let newTaxCent = newTotalPriceBeforTaxCent * 0.1;
  let newTotalPriceCenst = newTotalPriceBeforTaxCent + newTaxCent;

  const paymentSummaryHTML = `
    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Subtotal:</span>
      <span>$${formatCurrency(productsPriceCents)}</span>
    </li>

    <hr />

    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Shipping:</span>
      <span>${selectedDeliveryOptionPrice}</span>
    </li>

    ${
      selectedPaymentMethodId === "cod"
        ? `
    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>COD Fee:</span>
      <span>$${formatCurrency(200)}</span>
    </li>
    `
        : ""
    }

    <hr />

    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Total:</span>
      <strong>$${formatCurrency(newTotalPriceCenst)}</strong>
    </li>
  `;

  document.querySelector(`.js-checkOutPayment-container`).innerHTML = paymentSummaryHTML;
}

updatePaymentSummary();
// Payment method end

// Coupon start
const couponForm = document.querySelector(
  'form[class="mb-3 d-flex flex-column flex-lg-row justify-content-between align-items-end gap-3"]'
);
const couponInput = couponForm?.querySelector('input[placeholder="Coupon Code"]');
const applyCouponBtn = couponForm?.querySelector('button[type="submit"]');
const promoCodeContainer = document.querySelector(".text-success");

const availableCoupons = {
  NGM10: 10,
  NGM15: 15,
  NGM20: 20,
};

if (couponForm) {
  couponForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const couponCode = couponInput?.value.trim().toUpperCase();

    if (!couponCode) {
      showMessage("Please enter a coupon code", "error");
      return;
    }

    if (availableCoupons[couponCode]) {
      const discount = availableCoupons[couponCode];

      if (promoCodeContainer) {
        promoCodeContainer.innerHTML = `
          <h6 class="my-0">Promo code</h6>
          <small>${couponCode}</small>
          <span class="text-success">-${discount}%</span>
        `;
      }

      updateTotalWithDiscount(discount);

      if (couponInput) couponInput.disabled = true;
      if (applyCouponBtn) applyCouponBtn.disabled = true;

      showMessage("Coupon applied successfully!", "success");
    } else {
      showMessage("Invalid coupon code!", "error");
    }
  });
}

function updateTotalWithDiscount(discount) {
  let totalPriceBeforTaxCent = productsPriceCents + selectedOption.priceCents;

  const selectedPaymentMethodId = localStorage.getItem("selectedPaymentMethodId");
  if (selectedPaymentMethodId === "cod") {
    totalPriceBeforTaxCent += 200;
  }

  totalPriceBeforTaxCent = totalPriceBeforTaxCent * (1 - discount / 100);

  let taxCent = totalPriceBeforTaxCent * 0.1;
  let totalPriceCenst = totalPriceBeforTaxCent + taxCent;

  const paymentSummaryHTML = `
    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Subtotal:</span>
      <span>$${formatCurrency(productsPriceCents)}</span>
    </li>

    <hr />

    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Shipping:</span>
      <span>${selectedDeliveryOptionPrice}</span>
    </li>

    ${
      selectedPaymentMethodId === "cod"
        ? `
    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>COD Fee:</span>
      <span>$${formatCurrency(200)}</span>
    </li>
    `
        : ""
    }

    <hr />

    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Discount:</span>
      <span class="text-success">-${discount}%</span>
    </li>

    <hr />

    <li class="d-flex justify-content-between align-items-center mb-4 pt-1">
      <span>Total:</span>
      <strong>$${formatCurrency(totalPriceCenst)}</strong>
    </li>
  `;

  document.querySelector(`.js-checkOutPayment-container`).innerHTML = paymentSummaryHTML;
}

function showMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `alert alert-${
    type === "success" ? "success" : "danger"
  } position-fixed top-0 start-50 translate-middle-x mt-3`;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}
// Coupon end

// Place Order start
const placeOrderBtn = document.querySelector('button[form="checkoutForm"]');
const checkoutForm = document.getElementById("checkoutForm");

if (placeOrderBtn && checkoutForm) {
  placeOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!checkoutForm.checkValidity()) {
      checkoutForm.classList.add("was-validated");
      showMessage("Please fill in all required fields", "error");
      return;
    }

    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      address2: document.getElementById("address2").value,
      city: document.getElementById("Town/City").value,
      phone: document.getElementById("Phone").value,
      email: document.getElementById("email").value,
      paymentMethod: localStorage.getItem("selectedPaymentMethodId"),
      deliveryOption: localStorage.getItem("selectedDeliveryOptionId"),
      items: cart.cartItems,
      totalPrice: totalPriceCenst,
      appliedCoupon: couponInput?.value.trim().toUpperCase() || null,
    };

    if (cart.cartItems.length === 0) {
      showMessage("Your cart is empty", "error");
      return;
    }

    if (!formData.paymentMethod) {
      showMessage("Please select a payment method", "error");
      return;
    }

    if (!formData.deliveryOption) {
      showMessage("Please select a delivery option", "error");
      return;
    }

    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Processing...
    `;

    setTimeout(() => {
      cart.cartItems = [];
      cart.saveToLocalStorage();

      checkoutForm.reset();
      checkoutForm.classList.remove("was-validated");

      if (couponInput) {
        couponInput.disabled = false;
        couponInput.value = "";
      }
      if (applyCouponBtn) {
        applyCouponBtn.disabled = false;
      }
      if (promoCodeContainer) {
        promoCodeContainer.innerHTML = `
          <div class="text-success">
            <h6 class="my-0">Promo code</h6>
            <small>Enter a valid coupon code</small>
          </div>
        `;
      }

      showMessage("Order placed successfully!", "success");

      placeOrderBtn.disabled = false;
      placeOrderBtn.textContent = "Place Order";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    }, 2000);
  });
}
// Place Order end

// progress bar start
function ProgressBar() {
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container mb-4";
  progressContainer.innerHTML = `
    <div class="progress" style="height: 3px;">
      <div class="progress-bar bg-danger" role="progressbar" style="width: 25%" id="checkoutProgress"></div>
    </div>
    <div class="d-flex justify-content-between mt-2">
      <span class="step active" data-step="cart">Cart</span>
      <span class="step" data-step="details">Details</span>
      <span class="step" data-step="payment">Payment</span>
      <span class="step" data-step="confirm">Confirm</span>
    </div>
  `;
  document
    .querySelector(".checkOut")
    .insertBefore(progressContainer, document.querySelector(".row"));

  const style = document.createElement("style");
  style.textContent = `
    .step {
      color: #999;
      font-size: 14px;
      position: relative;
      padding-bottom: 5px;
      cursor: pointer;
    }
    .step.active {
      color: #dc3545;
    }
    .step.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #dc3545;
    }
  `;
  document.head.appendChild(style);

  function updateProgress(step) {
    const steps = ["cart", "details", "payment", "confirm"];
    const currentStepIndex = steps.indexOf(step);
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    document.getElementById("checkoutProgress").style.width = `${progress}%`;

    document.querySelectorAll(".step").forEach((stepEl, index) => {
      if (index <= currentStepIndex) {
        stepEl.classList.add("active");
      } else {
        stepEl.classList.remove("active");
      }
    });
  }

  document.querySelectorAll(".step").forEach((step) => {
    step.addEventListener("click", () => {
      const stepName = step.getAttribute("data-step");
      updateProgress(stepName);
    });
  });

  const form = document.querySelector("#checkoutForm");
  if (form) {
    form.addEventListener("input", () => {
      const requiredFields = form.querySelectorAll("[required]");
      const allFilled = Array.from(requiredFields).every(
        (field) => field.value.trim() !== ""
      );
      if (allFilled) {
        updateProgress("details");
      }
    });
  }

  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
  paymentMethods.forEach((method) => {
    method.addEventListener("change", () => {
      updateProgress("payment");
    });
  });

  const placeOrderBtn = document.querySelector('button[type="submit"]');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      updateProgress("confirm");
    });
  }
}

ProgressBar();
// progress bar end

// save address option start
function SaveAddressOption() {
  const saveAddressDiv = document.createElement("div");
  saveAddressDiv.className = "mb-3";
  saveAddressDiv.innerHTML = `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="saveAddress">
      <label class="form-check-label text-muted" for="saveAddress">
        Save this information for faster check-out next time
      </label>
    </div>
  `;
  document.querySelector("#checkoutForm").appendChild(saveAddressDiv);
}
SaveAddressOption();
// save address option end
