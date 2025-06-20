export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity = 1) {
    let matchingItems;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItems = cartItem;
      }
    });
    if (matchingItems) {
      matchingItems.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
      });
    }
    this.saveToLocalStorage();
  }

  removeCartItem(productId) {
    let newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToLocalStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(`.js-cartQuantity`).innerHTML = cartQuantity;
    this.saveToLocalStorage();
  }

  updateCartIconQuantity() {
    const quantity = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll(".js-cartQuantity").forEach((el) => {
      el.textContent = quantity;
    });
  }

  cartItemBtns(reloadcart) {
    document.querySelectorAll(".js-minusBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.getAttribute("data-product-id");
        const cartItem = this.cartItems.find((item) => item.productId === productId);
        if (cartItem && cartItem.quantity > 1) {
          cartItem.quantity--;
          this.saveToLocalStorage();
          reloadcart();
        }
      });
    });

    document.querySelectorAll(".js-plusBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.getAttribute("data-product-id");
        const cartItem = this.cartItems.find((item) => item.productId === productId);
        if (cartItem) {
          cartItem.quantity++;
          this.saveToLocalStorage();
          reloadcart();
        }
      });
    });
  }
}

export let cart = new Cart("cart-oop");
