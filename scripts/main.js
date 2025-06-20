import { cart } from "../data/cart-data-class.js";
import { wishlist } from "../data/wishlist-data-class.js";
import { updateUserProfile, isLoggedIn, logout } from "../data/userData.js";
import { toggleWishlist, updateHeartIcons } from "./shared/wishlist.js";

cart.updateCartIconQuantity();
wishlist.updateWishlistQuantity();

// Bootstrap validation styles start
document.querySelectorAll("form.js-addPaymentForm").forEach((form) => {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );

  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });
});
// Bootstrap validation styles end

// Profile Photo start
const profilePhotoContainer = document.querySelector(".js-profilePhotoContainer");
const profilePhoto = document.querySelector(".js-profilePhoto");
const profilePhotoInput = document.querySelector(".js-profilePhotoInput");
const navprofilePhoto = document.querySelector(".js-navprofilePhoto");

function updateProfileImages(imageSrc) {
  profilePhoto.src = imageSrc;

  if (navprofilePhoto) {
    navprofilePhoto.src = imageSrc;
  }
}

function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.6);
        resolve(compressedImage);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const defaultProfileImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CCCCCC'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

if (profilePhotoContainer && profilePhotoInput && profilePhoto) {
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) {
    updateProfileImages(savedPhoto);
    profilePhotoContainer.classList.add("has-image");
  } else {
    updateProfileImages(defaultProfileImage);
    profilePhotoContainer.classList.remove("has-image");
  }

  profilePhotoContainer.addEventListener("click", () => {
    profilePhotoInput.click();
  });

  profilePhotoInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        updateProfileImages(compressedImage);
        localStorage.setItem("profilePhoto", compressedImage);
        profilePhotoContainer.classList.add("has-image");
      } catch (error) {
        console.error("Error processing image:", error);
        showCustomAlert("Error processing image. Please try again.", "error");
      }
    }
  });
} else if (navprofilePhoto) {
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) {
    navprofilePhoto.src = savedPhoto;
  } else {
    navprofilePhoto.src = defaultProfileImage;
  }
}
// Profile Photo end

// generate accountName start
const profileForm = document.querySelector("#myProfile form");

const accountName = document.querySelectorAll(".js-accountName");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const emailElements = document.querySelectorAll(".js-accountEmail");
const addressInput = document.getElementById("address");

document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const savedAccountName = userData.name || "";
  const savedFirstName = userData.firstName || "";
  const savedLastName = userData.lastName || "";
  const savedEmail = userData.email || "";

  if (firstNameInput) firstNameInput.value = savedFirstName;
  if (lastNameInput) lastNameInput.value = savedLastName;
  if (accountName.length > 0) {
    accountName.forEach((element) => {
      element.innerHTML = savedAccountName;
    });
  }
  if (emailInput) {
    emailInput.value = savedEmail;
    emailElements.forEach((element) => {
      if (element.tagName === "INPUT") {
        element.value = savedEmail;
      } else {
        element.innerHTML = savedEmail;
      }
    });
  }

  import("./account.js").then((module) => {
    if (typeof module.populateAddressDropdown === "function") {
      module.populateAddressDropdown();
    }
  });
});

if (accountName.length > 0 && profileForm && firstNameInput && lastNameInput) {
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = (firstNameInput.value + " " + lastNameInput.value).trim() || "";
    accountName.forEach((element) => {
      element.innerHTML = fullName;
    });

    const updatedData = {
      name: fullName,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      address: addressInput.value,
    };

    localStorage.setItem("user", JSON.stringify(updatedData));

    emailElements.forEach((element) => {
      if (element.tagName === "INPUT") {
        element.value = emailInput.value;
      } else {
        element.innerHTML = emailInput.value;
      }
    });
  });
}
// generate accountName end

// loader start
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
});
// loader end

// langSelect start
document.addEventListener("DOMContentLoaded", function () {
  const langSelect = document.querySelector('select[name="languageSelector"]');
  if (!langSelect) return;

  const saved = localStorage.getItem("selectedLanguage");
  if (saved) {
    langSelect.value = saved;
  }

  langSelect.addEventListener("change", function () {
    localStorage.setItem("selectedLanguage", this.value);
  });
});
// langSelect end

// search start
document.getElementById("Search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const itemName = product.getAttribute("data-name").toLowerCase();
    product.style.display = itemName.includes(query) ? "block" : "none";
  });
});

let debounceTimer;
document.getElementById("Search").addEventListener("input", function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log("Search:", this.value);
  }, 300);
});
// search end

// nav start
function toggler() {
  if (document.getElementById("bar1").style.display === "none") {
    document.getElementById("bar1").style.display = "block";
    document.getElementById("bar2").style.display = "none";
  } else {
    document.getElementById("bar1").style.display = "none";
    document.getElementById("bar2").style.display = "block";
  }
}

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-80px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("userDropdown");
  const dropdownMenu = document.querySelector(".userDropdown");

  if (
    dropdown &&
    dropdownMenu &&
    dropdownMenu.classList.contains("show") &&
    !dropdown.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.remove("show");
  }
});
// nav end

// Back-to-Top Button start
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.opacity = "1";
  } else {
    backToTopButton.style.opacity = "0";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Back-to-Top Button end

// Initialize user data start
document.addEventListener("DOMContentLoaded", () => {
  updateUserProfile();

  const logoutBtn = document.querySelector(".js-logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  const authButtons = document.querySelectorAll(".js-authButtons");
  authButtons.forEach((container) => {
    if (isLoggedIn()) {
      container.innerHTML = `
        <button class="js-logoutBtn">Log Out</button>
      `;
    } else {
      container.innerHTML = `
        <a href="/singup.html">Sign Up</a>
        <a href="/logIn.html">Log In</a>
      `;
    }
  });
});
// Initialize user data end

// Terms of Service start
window.showTerms = function (event) {
  event.preventDefault();
  const termsModal = new bootstrap.Modal(document.getElementById("termsModal"));
  termsModal.show();
};
// Terms of Service end

// wishlist start
document.addEventListener("DOMContentLoaded", () => {
  updateHeartIcons();
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-addToWishlistBtn")) {
    const productId = e.target.getAttribute("data-product-id");
    toggleWishlist(productId);
  }
});
// wishlist end
