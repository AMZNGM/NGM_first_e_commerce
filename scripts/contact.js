// Contact Form start
const contactForm = document.querySelector(".contact-form");
const sendMessageBtn = document.querySelector(".js-sendMessageBtn");
const btnText = sendMessageBtn.querySelector(".btn-text");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    sendMessageBtn.classList.add("loading");
    btnText.style.opacity = "0";

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      btnText.textContent = "Message Sent!";
      btnText.style.opacity = "1";
      sendMessageBtn.classList.remove("loading");
      sendMessageBtn.classList.add("btn-success");

      contactForm.reset();

      setTimeout(() => {
        btnText.textContent = "Send Message";
        sendMessageBtn.classList.remove("btn-success");
      }, 3000);
    } catch (error) {
      btnText.textContent = "Error! Try Again";
      btnText.style.opacity = "1";
      sendMessageBtn.classList.remove("loading");
      sendMessageBtn.classList.add("btn-danger");

      setTimeout(() => {
        btnText.textContent = "Send Message";
        sendMessageBtn.classList.remove("btn-danger");
      }, 3000);
    }
  });
}
// Contact Form end
