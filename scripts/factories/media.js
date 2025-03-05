function mediaFactory(mediaData) {
  const { id, photographerId, title, video, image, likes, date, price } = mediaData;
  let el;

  if (image) {
    el = getImageEl(mediaData);
  } else if (video) {
    el = getVideoEl(mediaData);
  }

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-item");

    const link = document.createElement("a");
    link.href = "";
    link.appendChild(el);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("media-items_details");

    const titleEl = document.createElement("p");
    titleEl.classList.add("media-item_title");
    titleEl.textContent = title;
    detailsContainer.appendChild(titleEl);

    article.appendChild(link);
    article.appendChild(detailsContainer);
    return article;
  }

  return { id, photographerId, title, el, likes, date, price, getMediaCardDOM };
}

function getImageEl(mediaData) {
  const el = document.createElement("img");
  el.classList.add("media-item_media", "media-item_media--image");
  el.src = `./assets/images/${mediaData.image}`;
  return el;
}

function getVideoEl(mediaData) {
  const el = document.createElement("video");
  el.classList.add("media-item_media", "media-item_media--video");
  el.src = `./assets/images/${mediaData.video}`;
  return el;
}
