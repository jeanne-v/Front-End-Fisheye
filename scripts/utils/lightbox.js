function showLightbox(media) {
  const mainWrapper = document.getElementById("main-wrapper");
  const lightboxContainer = document.getElementById("lightbox-container");
  const mediaModel = mediaFactory(media);
  const fullMediaDOM = mediaModel.getFullMediaDOM();
  displayLightBoxMedia(media);

  lightboxContainer.style.display = "flex";
  lightboxContainer.ariaHidden = false;
  document.querySelector(".lightbox_close-btn").focus();

  mainWrapper.ariaHidden = true;
  mainWrapper.inert = true;
  mainWrapper.classList.add("no-scroll");
}

function displayLightBoxMedia(media) {
  const mediaModel = mediaFactory(media);
  const fullMediaDOM = mediaModel.getFullMediaDOM();
  const lightBoxMediaContainer = document.querySelector(".lightbox_media-container");
  lightBoxMediaContainer.textContent = "";
  lightBoxMediaContainer.appendChild(fullMediaDOM);
}

function hideLightbox() {
  const mainWrapper = document.getElementById("main-wrapper");
  const lightboxContainer = document.getElementById("lightbox-container");
  lightboxContainer.style.display = "none";
  lightboxContainer.ariaHidden = true;
  mainWrapper.ariaHidden = false;
  mainWrapper.inert = false;
  mainWrapper.classList.remove("no-scroll");
}

function navigateLightbox(mediaArray, direction) {
  const currentMediaId = Number(
    document.querySelector(".lightbox_media-container .media-item_media").dataset.mediaId
  );
  const currentMediaIndex = mediaArray.findIndex(
    (mediaEl) => mediaEl.id === currentMediaId
  );

  if (direction === "next" && currentMediaIndex < mediaArray.length - 1) {
    displayLightBoxMedia(mediaArray[currentMediaIndex + 1]);
  } else if (direction === "next" && currentMediaIndex === mediaArray.length - 1) {
    displayLightBoxMedia(mediaArray[0]);
  } else if (direction === "previous" && currentMediaIndex > 0) {
    displayLightBoxMedia(mediaArray[currentMediaIndex - 1]);
  } else if (direction === "previous" && currentMediaIndex === 0) {
    displayLightBoxMedia(mediaArray[mediaArray.length - 1]);
  }
}
