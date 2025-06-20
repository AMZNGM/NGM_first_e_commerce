import { wishlist } from "../../data/wishlist-data-class.js";
import { products } from "../../data/products.js";

export function saveWishlistToStorage() {
  localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
}

export function loadWishlistFromStorage() {
  const data = localStorage.getItem("wishlistData");
  if (data) {
    wishlistData.length = 0;
    JSON.parse(data).forEach((item) => wishlistData.push(item));
  }
}

export function updateHeartIcons() {
  document.querySelectorAll(".js-addToWishlistBtn").forEach((heart) => {
    const productId = heart.getAttribute("data-product-id");
    if (wishlist.getWishlistItems().some((p) => p.id === productId)) {
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid", "text-danger");
    } else {
      heart.classList.remove("fa-solid", "text-danger");
      heart.classList.add("fa-regular");
    }
  });
}

export function addToWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    wishlist.addToWishlist({
      productState: product.productState,
      discount: product.discount,
      id: product.id,
      image: product.image,
      name: product.name,
      priceCents: product.priceCents,
      oldpriceCents: product.oldpriceCents,
      category: product.category,
    });
    return true;
  }
  return false;
}

export function removeFromWishlist(productId) {
  wishlist.removeFromWishlist(productId);
  return true;
}

export function toggleWishlist(productId) {
  const heart = document.querySelector(
    `.js-addToWishlistBtn[data-product-id="${productId}"]`
  );
  if (!heart) return;

  if (!wishlist.getWishlistItems().some((p) => p.id === productId)) {
    if (addToWishlist(productId)) {
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid", "text-danger");
      showNotification("Added to Wishlist");
    }
  } else {
    if (removeFromWishlist(productId)) {
      heart.classList.remove("fa-solid", "text-danger");
      heart.classList.add("fa-regular");
      showNotification("Removed from Wishlist");
    }
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "wishlist-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}
