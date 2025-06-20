export class Wishlist {
  wishlistItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.wishlistItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.wishlistItems) {
      this.wishlistItems = [];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.wishlistItems));
  }

  addToWishlist(product) {
    const existingItem = this.wishlistItems.find((item) => item.id === product.id);
    if (!existingItem) {
      this.wishlistItems.push(product);
      this.saveToLocalStorage();
      this.updateWishlistQuantity();
    }
  }

  removeFromWishlist(productId) {
    this.wishlistItems = this.wishlistItems.filter((item) => item.id !== productId);
    this.saveToLocalStorage();
    this.updateWishlistQuantity();
  }

  updateWishlistQuantity() {
    const quantity = this.wishlistItems.length;
    document.querySelectorAll(".js-wishlistQuantity").forEach((el) => {
      el.textContent = quantity;
    });
  }

  getWishlistItems() {
    return this.wishlistItems;
  }
}

export let wishlist = new Wishlist("wishlist-oop");
