// Log In form start
const loginForm = document.querySelector(".js-logInForm");
const emailInput = document.querySelector(".js-emailInput");
const passwordInput = document.querySelector(".js-passwordInput");
const forgetPasswordLink = document.querySelector(".js-forgetPassword");

forgetPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) {
    alert("Please enter your email address first");
    emailInput.focus();
    return;
  }
  alert(`A password reset link has been sent to ${email}`);
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const userData = {
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "account.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});
// Log In form end
