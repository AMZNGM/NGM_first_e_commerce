import { addresses } from "../data/address-data.js";
import { updateUserData, updateUserProfile } from "../data/userData.js";

// Custom Alert start
export function showCustomAlert(message, aboveEditModal = false, withNoBtn = false) {
  const alertModal = document.getElementById("customAlert");
  const alertMsg = document.getElementById("customAlertMsg");
  const alertBtn = document.getElementById("customAlertBtn");
  let alertNoBtn = document.getElementById("customAlertNoBtn");

  alertMsg.textContent = message;
  alertModal.style.display = "flex";
  alertBtn.focus();

  if (withNoBtn) {
    if (!alertNoBtn) {
      alertNoBtn = document.createElement("button");
      alertNoBtn.id = "customAlertNoBtn";
      alertNoBtn.className = "btn btn-secondary border-secondary text-white mt-3 ms-2";
      alertNoBtn.textContent = "No";
      alertBtn.parentNode.appendChild(alertNoBtn);
    }
    alertNoBtn.style.display = "inline-block";
  } else if (alertNoBtn) {
    alertNoBtn.style.display = "none";
  }

  function handleEnter(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      alertModal.style.display = "none";
      document.removeEventListener("keydown", handleEnter);
    }
  }
  document.removeEventListener("keydown", handleEnter);
  document.addEventListener("keydown", handleEnter);

  alertBtn.onclick = function () {
    alertModal.style.display = "none";
    document.removeEventListener("keydown", handleEnter);
  };
  if (alertNoBtn) {
    alertNoBtn.onclick = function () {
      alertModal.style.display = "none";
      document.removeEventListener("keydown", handleEnter);
    };
  }
}
// Custom Alert end

// generate addresses start
let addressesList = JSON.parse(localStorage.getItem("addresses")) || addresses.slice();

let container = document.querySelector(".js-addressContainer");

function renderAddresses() {
  let addressHTML = "";
  addressesList.forEach((address, indx) => {
    addressHTML += `
      <div class="d-flex justify-content-between align-addresss-start
                  text-black-50 border border-secondary-subtle rounded-1
                  p-3 mb-3 shadow-sm hov " data-indx="${indx}">
        <div>
          <h5>${address.addressTitle}</h5>
          <h6 class="m-0 mb-2">
            <span>${address.country}</span>
            , 
            <span>${address.city}</span> ,
            <span>${address.floor}</span> ,
            <span>${address.building}</span>
            ,
            <span>${address.street}</span>
          </h6>
          <span>${address.phoneNumber}</span>
          <br />
          <span>${address.email}</span>
        </div>
        <div class="d-flex flex-column justify-content-between">
          <i class="fa-regular fa-trash-can pointer p-3 js-deleteAddress"></i>
          <i class="fa-regular fa-pen-to-square pointer p-3 js-editAddress"></i>
        </div>
      </div>
    `;
  });

  if (container) {
    container.innerHTML = addressHTML;
  }
}

if (container) {
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("js-deleteAddress")) {
      const parent = e.target.closest("[data-indx]");
      if (!parent) return;
      const indx = parseInt(parent.getAttribute("data-indx"));
      addressesList.splice(indx, 1);
      localStorage.setItem("addresses", JSON.stringify(addressesList));
      renderAddresses();
      updateAddressesAndDropdown();
      return;
    }

    if (e.target.classList.contains("js-editAddress")) {
      const parent = e.target.closest("[data-indx]");
      if (!parent) return;
      const indx = parseInt(parent.getAttribute("data-indx"));
      openAddressModal(addressesList[indx], indx);
      updateAddressesAndDropdown();
      return;
    }
  });
}

renderAddresses();

const form = document.querySelector(".js-addAddressForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const addressTitle = form.querySelector("#title").value;
    const country = form.querySelector("#country").value;
    const city = form.querySelector("#townCity2").value;
    const floor = form.querySelector("#floor").value;
    const building = form.querySelector("#building").value;
    const street = form.querySelector("#street").value;
    const phoneNumber = form.querySelector("#phone2").value;
    const email = form.querySelector("#Email").value;

    if (!addressTitle || !country || !city || !street) {
      showCustomAlert("Please fill in all required fields");
      return;
    }

    const newAddress = {
      addressTitle,
      country,
      city,
      floor,
      building,
      street,
      phoneNumber,
      email,
    };

    addressesList.unshift(newAddress);

    localStorage.setItem("addresses", JSON.stringify(addressesList));

    renderAddresses();
    populateAddressDropdown();

    form.reset();

    showCustomAlert("Address added successfully!");
  });
}
// generate addresses end

// edit address modal start
function openAddressModal(address = null, editIdx = null) {
  document.getElementById("addressModal").style.display = "flex";

  document.getElementById("modalTitle").value = address ? address.addressTitle : "";
  document.getElementById("modalCountry").value = address ? address.country : "";
  document.getElementById("modalTownCity2").value = address ? address.city : "";
  document.getElementById("modalFloor").value = address ? address.floor : "";
  document.getElementById("modalBuilding").value = address ? address.building : "";
  document.getElementById("modalStreet").value = address ? address.street : "";
  document.getElementById("modalPhone2").value = address ? address.phoneNumber : "";
  document.getElementById("modalEmail").value = address ? address.email : "";
  document
    .getElementById("modalAddressForm")
    .setAttribute("data-edit-idx", editIdx !== null ? editIdx : "");
}

document.querySelector(".close-modal").onclick = function () {
  document.getElementById("addressModal").style.display = "none";
};

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("js-editAddress")) {
    const parent = e.target.closest("[data-indx]");
    if (!parent) return;
    const indx = parseInt(parent.getAttribute("data-indx"));
    openAddressModal(addressesList[indx], indx);
  }
});

document.getElementById("modalAddressForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const idx = this.getAttribute("data-edit-idx");
  const newAddress = {
    addressTitle: document.getElementById("modalTitle").value,
    country: document.getElementById("modalCountry").value,
    city: document.getElementById("modalTownCity2").value,
    floor: document.getElementById("modalFloor").value,
    building: document.getElementById("modalBuilding").value,
    street: document.getElementById("modalStreet").value,
    phoneNumber: document.getElementById("modalPhone2").value,
    email: document.getElementById("modalEmail").value,
  };
  if (idx !== "") {
    addressesList[idx] = newAddress;
  } else {
    addressesList.unshift(newAddress);
  }
  localStorage.setItem("addresses", JSON.stringify(addressesList));
  renderAddresses();
  populateAddressDropdown();
  document.getElementById("addressModal").style.display = "none";
});
// edit address modal end

// select address dropdown start
const addressInput = document.getElementById("address");

export function populateAddressDropdown() {
  if (!addressInput) return;

  addressInput.innerHTML = '<option value="">Select an address</option>';

  const addressesList = JSON.parse(localStorage.getItem("addresses")) || [];

  if (addressesList.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No saved addresses";
    option.disabled = true;
    addressInput.appendChild(option);
    return;
  }

  addressesList.forEach((address, idx) => {
    const optionText = `${address.addressTitle} - ${address.country}, ${address.city}, ${address.street}`;
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = optionText;
    addressInput.appendChild(option);
  });

  const savedIdx = localStorage.getItem("selectedProfileAddressIdx");
  if (savedIdx && addressInput.options[savedIdx]) {
    addressInput.value = savedIdx;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAddresses();
  populateAddressDropdown();
});

function updateAddressesAndDropdown() {
  renderAddresses();
  populateAddressDropdown();
}

if (addressInput) {
  addressInput.addEventListener("change", function () {
    localStorage.setItem("selectedProfileAddressIdx", addressInput.value);
    const savedIdx = localStorage.getItem("selectedProfileAddressIdx");
    if (savedIdx && addressInput.options[savedIdx]) {
      addressInput.value = savedIdx;
    }
  });
}
// select address dropdown end

// generate new payment card start
const cardsContainer = document.querySelector(".js-cardsContainer");
const addPaymentForm = document.querySelector(".js-addPaymentForm");
let paymentCards = [];
let selectedCardIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
  const savedPaymentCards = localStorage.getItem("paymentCards");
  if (savedPaymentCards) {
    paymentCards = JSON.parse(savedPaymentCards);
    selectedCardIdx = Number(localStorage.getItem("selectedCardIdx")) || 0;
    renderPaymentCards();
  }
});

function formatCardDate(dateStr) {
  if (!dateStr) return "00/00";
  if (/^\d{2}\/\d{2}$/.test(dateStr)) return dateStr;
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split("-");
    return `${month}/${year.slice(-2)}`;
  }
  if (/^\d{3,4}$/.test(dateStr)) {
    let str = dateStr.padStart(4, "0");
    return `${str.slice(0, 2)}/${str.slice(2)}`;
  }
  return "00/00";
}

const dateInput = document.getElementById("date");
if (dateInput) {
  dateInput.addEventListener("input", function (e) {
    let value = dateInput.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    dateInput.value = value;
  });
}

const cardNumberInput = document.getElementById("cardNumber");
if (cardNumberInput) {
  cardNumberInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    this.value = value;
  });
}

function maskCardNumber(cardNumber) {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 4) return "••••";
  return "•••• •••• •••• " + digits.slice(-4);
}

function maskCVC(cvc) {
  if (!cvc) return "•••";
  return "•".repeat(cvc.length);
}

const cardNumber = document.getElementById(`cardNumber`);
if (cardNumber) {
  cardNumber.addEventListener(`input`, () => {
    let value = cardNumber.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    cardNumber.value = value;
  });
}

const cardTypeImg = document.getElementById("cardTypeImg");
const visaRadio = document.getElementById("visa");
const mastercardRadio = document.getElementById("mastercard");
function updateCardTypeImg() {
  if (visaRadio.checked) {
    cardTypeImg.src = "/images/Image 30 (1).png";
  } else if (mastercardRadio.checked) {
    cardTypeImg.src = "/images/Image 31 from Figma.png";
  }
}
if (visaRadio && mastercardRadio && cardTypeImg) {
  visaRadio.addEventListener("change", updateCardTypeImg);
  mastercardRadio.addEventListener("change", updateCardTypeImg);
}

function renderPaymentCards() {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";
  paymentCards.forEach((card, idx) => {
    const imgFile =
      card.cardType === "mastercard" ? "Image 31 from Figma.png" : "Image 30 (1).png";

    cardsContainer.innerHTML += `
      <div class="debit-card d-flex justify-content-between align-items-center gap-3 mb-5">
        <div class="card-flip p-3 shadow flex-grow-1 hov">
          <div class="card-flip-inner">
            <div class="card-flip-front">
              <label class="w-100 pointer">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <img src="../images/${imgFile}" class="w-100" />
                  </div>
                  <div>
                    <input class="pointer js-cardRadio" type="radio" name="card"
                      data-idx="${idx}" ${idx === selectedCardIdx ? "checked" : ""} />
                  </div>
                </div>
                <p class="mt-2 fw-bold">${card.name}</p>
                <div class="mt-auto  d-flex align-items-center justify-content-between">
                  <p class="mb-0">
                    <span class="js-cardNumberText">${maskCardNumber(
                      card.cardNumber
                    )}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-2 js-copyCardNumberBtn" data-idx="${idx}" title="Copy card number">
                      <i class="fa-regular fa-copy"></i>
                    </button>
                  </p>
                  <p>${formatCardDate(card.date)}</p>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="pointer hov p-3 rounded-3 shadow js-editPaymentCardsBtn">
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
      </div>
    `;
  });

  document.querySelectorAll(".js-cardRadio").forEach((input) => {
    input.addEventListener("change", function () {
      selectedCardIdx = Number(this.dataset.idx);
      localStorage.setItem("selectedCardIdx", selectedCardIdx);
      renderPaymentCards();
    });
  });

  document.querySelectorAll(".js-copyCardNumberBtn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const idx = Number(this.getAttribute("data-idx"));
      const cardNumber = paymentCards[idx]?.cardNumber?.replace(/\s/g, "");
      if (cardNumber) {
        navigator.clipboard.writeText(cardNumber);
      }
    });
  });
}

if (addPaymentForm) {
  addPaymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = addPaymentForm.querySelector("#cardHolderName");
    const cardNumberInput = addPaymentForm.querySelector("#cardNumber");
    const dateInput = addPaymentForm.querySelector("#date");
    const cvcInput = addPaymentForm.querySelector("#cvc");
    const cardTypeInput = addPaymentForm.querySelector('input[name="cardType"]:checked');

    const cardNumberRaw = cardNumberInput.value.replace(/\s/g, "");
    if (cardNumberRaw.length !== 16) {
      showCustomAlert("Card number must be 16 digits.");
      cardNumberInput.focus();
      return;
    }
    if (!cardTypeInput) {
      showCustomAlert("Please select a card type.");
      return;
    }

    const name = nameInput.value;
    const cardNumber = cardNumberInput.value;
    const date = dateInput.value;
    const cvc = cvcInput.value;
    const cardType = cardTypeInput.value;

    paymentCards.unshift({
      name,
      cardNumber,
      date,
      cvc,
      cardType,
    });

    localStorage.setItem("paymentCards", JSON.stringify(paymentCards));
    renderPaymentCards();

    addPaymentForm.reset();
    const collapse = document.getElementById("collapse");
    if (collapse) collapse.classList.remove("show");
  });
}
// generate new payment card end

// edit Card Modal start
const editCardModal = document.getElementById("editCardModal");
const editCardForm = document.getElementById("editCardForm");
let editingCardIdx = null;

cardsContainer.addEventListener("click", function (e) {
  if (e.target.closest(".js-editPaymentCardsBtn")) {
    const cardDiv = e.target.closest(".debit-card");
    if (!cardDiv) return;
    const cardIdx = Array.from(cardsContainer.querySelectorAll(".debit-card")).indexOf(
      cardDiv
    );
    if (cardIdx === -1) return;
    const card = paymentCards[cardIdx];
    editingCardIdx = cardIdx;

    document.getElementById("editCardHolderName").value = card.name;
    document.getElementById("editCardNumber").value = card.cardNumber;
    document.getElementById("editCardDate").value = formatCardDate(card.date);
    document.getElementById("editCardCVC").value = card.cvc;
    if (card.cardType === "mastercard") {
      document.getElementById("editMastercard").checked = true;
    } else {
      document.getElementById("editVisa").checked = true;
    }

    openEditCardModal();
  }
});

editCardForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (editingCardIdx === null) return;

  const name = document.getElementById("editCardHolderName").value;
  const cardNumber = document.getElementById("editCardNumber").value;
  const date = document.getElementById("editCardDate").value;
  const cvc = document.getElementById("editCardCVC").value;
  const cardType = document.querySelector('input[name="editCardType"]:checked').value;

  const cardNumberRaw = cardNumber.replace(/\s/g, "");
  if (cardNumberRaw.length !== 16) {
    showCustomAlert("Card number must be 16 digits.");
    document.getElementById("editCardNumber").focus();
    return;
  }

  paymentCards[editingCardIdx] = {
    name,
    cardNumber,
    date,
    cvc,
    cardType,
  };
  localStorage.setItem("paymentCards", JSON.stringify(paymentCards));
  renderPaymentCards();
  closeEditCardModal();
});

document.getElementById("closeEditCardModal").onclick = function () {
  closeEditCardModal();
  editingCardIdx = null;
};

document.getElementById("editCardNumber").addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");
  value = value.slice(0, 16);
  value = value.replace(/(.{4})/g, "$1 ").trim();
  this.value = value;
});
document.getElementById("editCardDate").addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");
  if (value.length > 4) value = value.slice(0, 4);
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }
  this.value = value;
});

document.getElementById("deleteEditCardBtn").onclick = function () {
  if (editingCardIdx !== null) {
    showCustomAlert("Are you sure you want to delete this card?", false, true);
    const alertBtn = document.getElementById("customAlertBtn");
    const alertNoBtn = document.getElementById("customAlertNoBtn");

    function handleDelete() {
      paymentCards.splice(editingCardIdx, 1);
      localStorage.setItem("paymentCards", JSON.stringify(paymentCards));
      renderPaymentCards();
      closeEditCardModal();
      editingCardIdx = null;
      alertBtn.removeEventListener("click", handleDelete);
      if (alertNoBtn) alertNoBtn.removeEventListener("click", handleNo);
    }
    function handleNo() {
      alertBtn.removeEventListener("click", handleDelete);
      if (alertNoBtn) alertNoBtn.removeEventListener("click", handleNo);
    }

    alertBtn.addEventListener("click", handleDelete);
    if (alertNoBtn) alertNoBtn.addEventListener("click", handleNo);
  }
};

let lastFocusedElement = null;

function openEditCardModal() {
  lastFocusedElement = document.activeElement;
  const editCardModal = document.getElementById("editCardModal");
  editCardModal.classList.remove("d-none");
  editCardModal.classList.add("d-flex");
  setTimeout(() => {
    document.getElementById("editCardHolderName").focus();
  }, 100);
}

function closeEditCardModal() {
  const editCardModal = document.getElementById("editCardModal");
  editCardModal.classList.remove("d-flex");
  editCardModal.classList.add("d-none");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

document.addEventListener("keydown", function (e) {
  const editCardModal = document.getElementById("editCardModal");
  if (
    editCardModal &&
    editCardModal.classList.contains("d-flex") &&
    (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27)
  ) {
    closeEditCardModal();
    editingCardIdx = null;
  }
});

if (editCardForm) {
  editCardForm.addEventListener("submit", function (event) {
    if (!editCardForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    editCardForm.classList.add("was-validated");
  });

  editCardForm.querySelectorAll("input").forEach((input) => {
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
}
// edit Card Modal end

// new user data start
document.addEventListener("DOMContentLoaded", () => {
  updateUserProfile();

  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  updateAddressesList(addresses);
});

const addressForm = document.querySelector(".js-addressForm");
if (addressForm) {
  addressForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addressForm);
    const newAddress = {
      id: Date.now(),
      name: formData.get("name"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      country: formData.get("country"),
      phone: formData.get("phone"),
    };

    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    addresses.push(newAddress);
    localStorage.setItem("addresses", JSON.stringify(addresses));

    updateAddressesList(addresses);
    addressForm.reset();
  });
}

function updateAddressesList(addresses) {
  const addressesList = document.querySelector(".js-addressesList");
  if (!addressesList) return;

  addressesList.innerHTML = addresses
    .map(
      (address) => `
    <div class="address-card">
      <h3>${address.name}</h3>
      <p>${address.street}</p>
      <p>${address.city}, ${address.state} ${address.zip}</p>
      <p>${address.country}</p>
      <p>Phone: ${address.phone}</p>
      <button onclick="deleteAddress(${address.id})" class="delete-btn">Delete</button>
    </div>
  `
    )
    .join("");
}

window.deleteAddress = function (id) {
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const updatedAddresses = addresses.filter((addr) => addr.id !== id);
  localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  updateAddressesList(updatedAddresses);
};

const profileForm = document.querySelector(".js-profileForm");
if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(profileForm);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const fullName = `${firstName} ${lastName}`.trim();

    const updatedData = {
      name: fullName,
      firstName: firstName,
      lastName: lastName,
      email: formData.get("email"),
    };

    updateUserData(updatedData);
    showCustomAlert("Profile updated successfully!");
  });
}
// new user data end
