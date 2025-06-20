import { timer } from "./shared/timer.js";
import { generateProductHTML } from "./shared/generatingProducts.js";
import { addToCartBtns } from "./shared/addToCartBtn.js";
import { products } from "../data/products.js";
import { wishlist } from "../data/wishlist-data-class.js";
import { updateHeartIcons } from "./shared/wishlist.js";

timer();

// Popup Modal start
// document.addEventListener("DOMContentLoaded", () => {
//   const pageLoadModal = new bootstrap.Modal(document.getElementById("pageLoadModal"));
//   pageLoadModal.show();
// });

// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// }

// function validateName(name) {
//   return name.length >= 2 && name.length <= 50;
// }

// function validatePassword(password) {
//   return password.length >= 8;
// }

// function handleSignup(event) {
//   event.preventDefault();

//   const name = document.getElementById("signupName").value;
//   const email = document.getElementById("signupEmail").value;
//   const password = document.getElementById("signupPassword").value;

//   document
//     .querySelectorAll(".invalid-feedback")
//     .forEach((el) => (el.style.display = "none"));
//   document
//     .querySelectorAll(".js-formControl")
//     .forEach((el) => el.classList.remove("is-invalid"));

//   let isValid = true;

//   if (!validateName(name)) {
//     document.getElementById("signupName").classList.add("is-invalid");
//     document.getElementById("signupName").nextElementSibling.style.display = "block";
//     isValid = false;
//   }

//   if (!validateEmail(email)) {
//     document.getElementById("signupEmail").classList.add("is-invalid");
//     document.getElementById("signupEmail").nextElementSibling.style.display = "block";
//     isValid = false;
//   }

//   if (!validatePassword(password)) {
//     document.getElementById("signupPassword").classList.add("is-invalid");
//     document.getElementById("signupPassword").nextElementSibling.style.display = "block";
//     isValid = false;
//   }

//   if (isValid) {
//     const submitBtn = document.getElementById("createAccountBtn");
//     submitBtn.disabled = true;
//     submitBtn.innerHTML =
//       '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating Account...';

//     setTimeout(() => {
//       alert("تم إنشاء الحساب بنجاح!");

//       document.getElementById("signupForm").reset();
//       const modal = bootstrap.Modal.getInstance(document.getElementById("pageLoadModal"));
//       modal.hide();

//       submitBtn.disabled = false;
//       submitBtn.innerHTML = "Create Account";
//     }, 1500);
//   }

//   return false;
// }

// function handleGoogleSignup() {
//   const googleBtn = document.querySelector(".btn.border.text-black");
//   const originalContent = googleBtn.innerHTML;
//   googleBtn.disabled = true;
//   googleBtn.innerHTML =
//     '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Connecting...';

//   setTimeout(() => {
//     alert("تم الاتصال بـ Google بنجاح!");

//     document.getElementById("signupForm").reset();
//     const modal = bootstrap.Modal.getInstance(document.getElementById("pageLoadModal"));
//     modal.hide();

//     googleBtn.disabled = false;
//     googleBtn.innerHTML = originalContent;
//   }, 1500);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const pageLoadModal = new bootstrap.Modal(document.getElementById("pageLoadModal"));
//   pageLoadModal.show();

//   const formInputs = document.querySelectorAll(".js-formControl");
//   formInputs.forEach((input) => {
//     input.addEventListener("input", function () {
//       if (this.classList.contains("is-invalid")) {
//         this.classList.remove("is-invalid");
//         this.nextElementSibling.style.display = "none";
//       }
//     });
//   });
// });
// Popup Modal end

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const productContainers = document.querySelectorAll(
    ".js-products-container-1, .js-products-container-2, .js-products-container-3"
  );

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const selectedCategory = category.querySelector("h5").textContent;

      if (category.classList.contains("active")) {
        category.classList.remove("active");
        productContainers.forEach((container) => {
          const products = container.querySelectorAll(".product, .newproduct");
          products.forEach((product) => {
            product.style.display = "block";
          });
        });
      } else {
        categories.forEach((cat) => cat.classList.remove("active"));
        category.classList.add("active");

        productContainers.forEach((container) => {
          const products = container.querySelectorAll(".product, .newproduct");
          products.forEach((product) => {
            const productCategory = product.getAttribute("data-category");
            if (productCategory === selectedCategory) {
              product.style.display = "block";
            } else {
              product.style.display = "none";
            }
          });
        });
      }
    });
  });
});
// categories end

// scroll start
function setupScrollButtons(containerId, leftButtonId, rightButtonId) {
  const container = document.getElementById(containerId);
  const leftButton = document.getElementById(leftButtonId);
  const rightButton = document.getElementById(rightButtonId);

  if (container && leftButton && rightButton) {
    leftButton.addEventListener("click", () => {
      container.scrollLeft -= 200;
    });

    rightButton.addEventListener("click", () => {
      container.scrollLeft += 200;
    });
  }
}

setupScrollButtons("productList", "scrollLeft", "scrollRight");
setupScrollButtons("categoriesList", "categoriesScrollLeft", "categoriesScrollRight");
// scroll end

// generating products start
const containers = [
  ".js-products-container-1",
  ".js-products-container-2",
  ".js-products-container-3",
];
containers.forEach((contain) => {
  let container = document.querySelector(contain);
  if (container) {
    container.innerHTML = generateProductHTML(products);
  }
});
// generating products end

addToCartBtns();
updateHeartIcons();
