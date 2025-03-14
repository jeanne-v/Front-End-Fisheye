function displayMedia(media) {
  const mediaContainer = document.querySelector(".media-container");
  mediaContainer.textContent = "";
  media.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaContainer.appendChild(mediaCardDOM);
  });
}

async function getPhotographerMedia(photographerId) {
  const res = await fetch("./data/photographers.json");
  const data = await res.json();
  const media = data.media.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
  return media;
}

function displayPhotographer(photographer, photographerTotalLikes) {
  const photographersHeader = document.querySelector(".photographer-header");

  const photographerModel = photographerTemplate(photographer, photographerTotalLikes);
  const userCardDOM = photographerModel.getLongUserCardDOM();
  photographersHeader.appendChild(userCardDOM);

  document.getElementById("modal-title").textContent += ` ${photographer.name}`;
}

function getPhotographerTotalLikes(photographerMedias) {
  return photographerMedias.reduce((total, currentMedia) => {
    return total + currentMedia.likes;
  }, 0);
}

function updateLikes(mediaArray, targetmediaItem) {
  targetmediaItem.isLiked = !targetmediaItem.isLiked;
  if (targetmediaItem.isLiked) {
    targetmediaItem.likes++;
  } else {
    targetmediaItem.likes--;
  }
  document.querySelector(".photographer_likes-number").textContent =
    getPhotographerTotalLikes(mediaArray);
  document.querySelector(
    `.media-item[data-media-id="${targetmediaItem.id}"] .media-item_likes-number`
  ).textContent = targetmediaItem.likes;
}

function sortMediaArray(mediaArray, sortBy) {
  if (sortBy === "popularity") {
    mediaArray.sort((a, b) => {
      return b.likes - a.likes;
    });
  } else if (sortBy === "date") {
    mediaArray.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return aTime - bTime;
    });
  } else if (sortBy === "title") {
    mediaArray.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
}

async function init() {
  const params = new URL(document.location.toString()).searchParams;
  const photographerId = Number(params.get("id"));
  const photographers = await getPhotographers();
  const photographer = photographers.filter((person) => person.id === photographerId)[0];

  const originalMediaData = await getPhotographerMedia(photographerId);
  const mediaArray = [...originalMediaData];
  mediaArray.forEach((mediaItem) => {
    mediaItem.isLiked = false;
  });

  const photographerTotalLikes = getPhotographerTotalLikes(mediaArray);

  displayPhotographer(photographer, photographerTotalLikes);
  sortMediaArray(mediaArray, "popularity");
  displayMedia(mediaArray);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("contact_button")) {
      showContactModal();
    } else if (e.target.closest(".modal_close-button")) {
      hideContactModal();
    } else if (e.target.closest(".media-item_open-btn")) {
      const mediaId = Number(e.target.closest(".media-item").dataset.mediaId);
      const currentMedia = mediaArray.find((mediaEl) => mediaEl.id === mediaId);
      showLightbox(currentMedia);
    } else if (e.target.closest(".lightbox_close-btn")) {
      hideLightbox();
    } else if (e.target.closest(".lightbox_arrow-btn--left")) {
      navigateLightbox(mediaArray, "previous");
    } else if (e.target.closest(".lightbox_arrow-btn--right")) {
      navigateLightbox(mediaArray, "next");
    } else if (e.target.closest(".media-item_like-btn")) {
      const mediaId = Number(e.target.closest(".media-item").dataset.mediaId);
      const mediaItem = mediaArray.find((arrItem) => arrItem.id === mediaId);
      updateLikes(mediaArray, mediaItem);
    }
  });

  document.querySelector("#modal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    logFormData();
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
      navigateLightbox(mediaArray, "previous");
    } else if (
      e.key === "ArrowRight" &&
      document.querySelector("#lightbox-container").ariaHidden === "false"
    ) {
      navigateLightbox(mediaArray, "next");
    }
  });

  document.getElementById("media-sort-select").addEventListener("change", (e) => {
    sortMediaArray(mediaArray, e.target.value);
    displayMedia(mediaArray);
  });
}

init();
