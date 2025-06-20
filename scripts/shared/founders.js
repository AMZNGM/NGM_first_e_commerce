import { founders } from "../../data/founders-data.js";

let foundersHTML = "";

founders.forEach((founder) => {
  foundersHTML += `
    <div class="col-8 col-md-4 ps-0 pb-4">
      <img src="${founder.image}" alt="${founder.name}"
      style="width: 100%" />
      <h5 class="pt-3">${founder.name}</h5>
      <p>${founder.position}</p>
      <div class="pt-2 d-flex">
        ${
          founder.links.twitter
            ? `
          <a href="${founder.links.twitter}"
          class="me-4 text-reset" target="_blank">
            <i class="fab fa-twitter"></i>
          </a>`
            : ""
        }
        ${
          founder.links.instagram
            ? `
          <a href="${founder.links.instagram}"
          class="me-4 text-reset" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>`
            : ""
        }
        ${
          founder.links.linkedin
            ? `
          <a href="${founder.links.linkedin}"
          class="me-4 text-reset" target="_blank">
            <i class="fab fa-linkedin"></i>
          </a>`
            : ""
        }
      </div>
    </div>
  `;
});

const container = document.querySelector(".js-founders-container");
if (container) {
  container.innerHTML = foundersHTML;
}
