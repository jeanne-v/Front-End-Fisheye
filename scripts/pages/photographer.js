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
  const photographerMedia = data.media.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
  return photographerMedia;
}

function displayPhotographer(photographer, photographerTotalLikes) {
  const photographersHeader = document.querySelector(".photographer-header");

  const photographerModel = photographerTemplate(photographer, photographerTotalLikes);
  const photographerDetailsDOM = photographerModel.getPhotographerDetailsDOM();
  photographersHeader.appendChild(photographerDetailsDOM);

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

function sortMediaArray(mediaArray) {
  const sortBy = document.getElementById("media-sort-trigger").dataset.selectedSortValue;
  if (sortBy === "popularity") {
    mediaArray.sort((a, b) => {
      return b.likes - a.likes;
    });
  } else if (sortBy === "date") {
    mediaArray.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return bTime - aTime;
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
  sortMediaArray(mediaArray);
  displayMedia(mediaArray);

  function handleMediaSortValueChange() {
    sortMediaArray(mediaArray);
    displayMedia(mediaArray);
  }

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
    } else if (e.target.closest("#media-sort-trigger")) {
      if (document.querySelector("#media-sort-trigger").ariaExpanded === "false") {
        openDropDown();
      } else if (document.querySelector("#media-sort-trigger").ariaExpanded === "true") {
        closeDropDown();
      }
    } else if (
      document.getElementById("media-sort-trigger").ariaExpanded === "true" &&
      !document.querySelector(".media-sort").contains(e.target)
    ) {
      closeDropDown();
    } else if (e.target.closest(".media-sort__option")) {
      moveFocusToOption(e.target.closest(".media-sort__option"));
      updateSelectedValue();
      closeDropDown();
      handleMediaSortValueChange();
    }
  });

  document.querySelector("#modal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    logFormData();
  });

  document.querySelector("#lightbox-container").addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideLightbox();
    } else if (e.key === "ArrowLeft") {
      navigateLightbox(mediaArray, "previous");
    } else if (e.key === "ArrowRight") {
      navigateLightbox(mediaArray, "next");
    }
  });

  document.querySelector("#contact_modal").addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideContactModal();
    }
  });

  document.querySelector(".media-sort").addEventListener("keydown", (e) => {
    const isDropDownOpen = Boolean(
      document.getElementById("media-sort-trigger").ariaExpanded === "true"
    );
    if (isDropDownOpen && e.key === "Escape") {
      closeDropDown();
    } else if (!isDropDownOpen && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      openDropDown();
    } else if (isDropDownOpen && e.key === "ArrowUp") {
      e.preventDefault();
      moveDropDownFocusToPreviousOption();
    } else if (isDropDownOpen && e.key === "ArrowDown") {
      e.preventDefault();
      moveDropDownFocusToNextOption();
    } else if (isDropDownOpen && (e.key === "Enter" || "Space")) {
      e.preventDefault();
      updateSelectedValue();
      closeDropDown();
      handleMediaSortValueChange();
    }
  });

  document.querySelectorAll(".media-sort__option").forEach((optionHTMLEL) => {
    optionHTMLEL.addEventListener("mouseenter", (e) => {
      moveFocusToOption(e.target);
    });
  });
}

init();
