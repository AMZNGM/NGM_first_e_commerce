export function getUserData() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return userData || null;
}

export function updateUserData(newData) {
  const currentData = getUserData() || {};
  const updatedData = { ...currentData, ...newData };

  localStorage.setItem("user", JSON.stringify(updatedData));

  if (newData.name) {
    localStorage.setItem("accountName", newData.name);
    const nameParts = newData.name.split(" ");
    if (nameParts.length > 1) {
      localStorage.setItem("firstName", nameParts[0]);
      localStorage.setItem("lastName", nameParts.slice(1).join(" "));
    } else {
      localStorage.setItem("firstName", nameParts[0]);
      localStorage.setItem("lastName", "");
    }
  }
  if (newData.email) {
    localStorage.setItem("emailInput", newData.email);
  }
  if (newData.picture) {
    localStorage.setItem("profilePhoto", newData.picture);
  }

  updateUserProfile();
}

export function updateUserProfile() {
  const userData = getUserData();
  if (!userData) return;

  const profilePhotos = document.querySelectorAll(
    ".js-profilePhoto, .js-navprofilePhoto"
  );
  profilePhotos.forEach((photo) => {
    if (userData.picture) {
      photo.src = userData.picture;
    }
  });

  const accountNames = document.querySelectorAll(".js-accountName");
  accountNames.forEach((name) => {
    if (userData.name) {
      name.textContent = userData.name;
    }
  });

  const emails = document.querySelectorAll(".js-accountEmail");
  emails.forEach((email) => {
    if (userData.email) {
      email.textContent = userData.email;
    }
  });

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");

  if (firstNameInput && userData.firstName) {
    firstNameInput.value = userData.firstName;
  }
  if (lastNameInput && userData.lastName) {
    lastNameInput.value = userData.lastName;
  }
  if (emailInput && userData.email) {
    emailInput.value = userData.email;
  }
}

export function isLoggedIn() {
  return !!getUserData();
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("accountName");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("emailInput");
  localStorage.removeItem("profilePhoto");
  localStorage.removeItem("addresses");
  localStorage.removeItem("wishlist");
  localStorage.removeItem("orders");
  localStorage.removeItem("paymentCards");
  localStorage.removeItem("selectedCardIdx");
  window.location.href = "/singup.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateUserProfile();
});
