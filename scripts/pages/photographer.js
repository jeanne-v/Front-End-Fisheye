function displayData(photographer, media) {
  const photographersHeader = document.querySelector(".photographer-header");

  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getLongUserCardDOM();
  photographersHeader.appendChild(userCardDOM);

  document.getElementById("modal-title").textContent += ` ${photographer.name}`;

  const mediaContainer = document.querySelector(".media-container");
  media.forEach((mediaEl) => {
    const mediaModel = mediaFactory(mediaEl);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaContainer.appendChild(mediaCardDOM);
    mediaCardDOM.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("media-item_like-btn") ||
        e.target.parentElement.classList.contains("media-item_like-btn")
      ) {
        mediaModel.handleLike();
        displayTotalLikes();
      }
    });
  });

  function displayTotalLikes() {
    const likesNumberHTMLEls = Array.from(
      document.querySelectorAll(".media-item_likes-number")
    );
    const totalLikesNumber = likesNumberHTMLEls.reduce((total, current) => {
      return total + Number(current.textContent);
    }, 0);

    photographerModel.renderPhotographerLikes(totalLikesNumber);
  }

  displayTotalLikes();
}

async function getPhotographerMedia(photographerId) {
  const res = await fetch("./data/photographers.json");
  const data = await res.json();
  const media = data.media.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
  return media;
}

async function init() {
  const params = new URL(document.location.toString()).searchParams;
  const photographerId = Number(params.get("id"));
  const photographers = await getPhotographers();
  const photographer = photographers.filter((person) => person.id === photographerId)[0];

  const media = await getPhotographerMedia(photographerId);

  displayData(photographer, media);

  document.querySelector(".contact_button").addEventListener("click", showContactModal);
  document
    .querySelector(".modal_close-button")
    .addEventListener("click", hideContactModal);
  document.querySelector("#modal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    logFormData();
  });

  const openLightBoxBtns = Array.from(document.querySelectorAll(".media-item_open-btn"));
  openLightBoxBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mediaId = Number(btn.dataset.mediaId);
      const currentMedia = media.find((mediaEl) => mediaEl.id === mediaId);
      showLightbox(currentMedia);
    });
  });

  document.querySelector(".lightbox_close-btn").addEventListener("click", hideLightbox);

  document.querySelector(".lightbox_arrow-btn--left").addEventListener("click", () => {
    navigateLightbox(media, "previous");
  });
  document.querySelector(".lightbox_arrow-btn--right").addEventListener("click", () => {
    navigateLightbox(media, "next");
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.querySelector("#contact_modal").ariaHidden === "false"
    ) {
      hideContactModal();
    } else if (
      e.key === "Escape" &&
      document.querySelector("#lightbox-container").ariaHidden === "false"
    ) {
      hideLightbox();
    } else if (
      e.key === "ArrowLeft" &&
      document.querySelector("#lightbox-container").ariaHidden === "false"
    ) {
      navigateLightbox(media, "previous");
    } else if (
      e.key === "ArrowRight" &&
      document.querySelector("#lightbox-container").ariaHidden === "false"
    ) {
      navigateLightbox(media, "next");
    }
  });
}

init();
