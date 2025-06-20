import { updateUserData } from "../data/userData.js";

// google Button start
const googleButton = document.querySelector(".js-googleBtn");

if (googleButton) {
  googleButton.addEventListener("click", async () => {
    try {
      const originalContent = googleButton.innerHTML;
      googleButton.innerHTML =
        '<i class="fa fa-spinner fa-spin"></i> Connecting to Google...';
      googleButton.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));

      googleButton.innerHTML = originalContent;

      const newUserData = {
        email: "user@example.com",
        name: "new user",
        picture: "/images/personBlack and White Human Head.jpg",
      };
      localStorage.setItem("user", JSON.stringify(newUserData));

      window.location.href = "YOUR_GOOGLE_OAUTH_URL";
    } catch (error) {
      console.error("Sing up faild:", error);
      googleButton.innerHTML = '<i class="fa fa-exclamation-circle"></i>Try again';
      setTimeout(() => {
        googleButton.innerHTML = originalContent;
        googleButton.disabled = false;
      }, 2000);
    }
  });
}
// google Button end

// Create Account Button start
const createAccountBtn = document.querySelector(".js-createAccountBtn");
const signupForm = document.querySelector(".js-signupForm");

if (createAccountBtn && signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const originalContent = createAccountBtn.innerHTML;

    try {
      createAccountBtn.disabled = true;
      createAccountBtn.innerHTML = "Creating Account...";

      const formData = new FormData(signupForm);
      const userData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        picture:
          "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(formData.get("name")) +
          "&background=random",
      };

      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.password
      ) {
        throw new Error("Please fill in all fields");
      }

      if (userData.password !== formData.get("confirmPassword")) {
        throw new Error("Passwords do not match");
      }

      const existingUser = localStorage.getItem("user");
      if (!existingUser) {
        localStorage.setItem("addresses", JSON.stringify([]));
        localStorage.setItem("wishlist", JSON.stringify([]));
        localStorage.setItem("orders", JSON.stringify([]));
      }

      updateUserData(userData);

      createAccountBtn.innerHTML = "Account Created Successfully!";
      setTimeout(() => {
        window.location.href = "/account.html";
      }, 1500);
    } catch (error) {
      createAccountBtn.innerHTML = "Sign up failed: " + error.message;
      setTimeout(() => {
        createAccountBtn.innerHTML = originalContent;
        createAccountBtn.disabled = false;
      }, 2000);
    }
  });
}
// Create Account Button end
