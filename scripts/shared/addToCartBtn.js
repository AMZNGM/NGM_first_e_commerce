import { cart } from "../../data/cart-data-class.js";

// addToCartBtn start
export function addToCartBtns() {
  document.querySelectorAll(`.js-addToCartBtn`).forEach((button) => {
    button.addEventListener(`click`, () => {
      let itemId = button.dataset.productId;
      const quantitySelect = button
        .closest(".productHead")
        .querySelector(".js-productQuantity");
      const quantity = parseInt(quantitySelect.value);

      for (let i = 0; i < quantity; i++) {
        cart.addToCart(itemId);
      }

      cart.updateCartQuantity();
    });
  });

  document.querySelectorAll(".js-productQuantity").forEach((select) => {
    select.addEventListener("change", () => {
      const productId = select.closest("[data-id]").dataset.id;
      const newQuantity = parseInt(select.value);

      const cartItem = cart.cartItems.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
        cart.saveToLocalStorage();
        cart.updateCartQuantity();
      }
    });
  });

  cart.updateCartIconQuantity();
}
// addToCartBtn end
