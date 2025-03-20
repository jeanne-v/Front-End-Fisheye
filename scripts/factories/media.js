function mediaFactory(mediaData) {
  let { id, photographerId, title, video, image, likes, isLiked, date, price } =
    mediaData;
  let imageOrVideoPreviewCardHTMLEl;
  let imageOrVideoPlayerLightboxHTMLEl;

  if (image) {
    imageOrVideoPreviewCardHTMLEl = getImageHTMLEl(mediaData);
    imageOrVideoPlayerLightboxHTMLEl = imageOrVideoPreviewCardHTMLEl.cloneNode(true);
  } else if (video) {
    imageOrVideoPreviewCardHTMLEl = getVideoHTMLEl(mediaData);
    imageOrVideoPlayerLightboxHTMLEl = imageOrVideoPreviewCardHTMLEl.cloneNode(true);
    imageOrVideoPlayerLightboxHTMLEl.controls = true;
  }

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-item");
    article.dataset.mediaId = id;

    // const link = document.createElement("a");
    // link.href = "";
    // link.appendChild(el);
    const button = document.createElement("button");
    button.classList.add("media-item_open-btn");

    const container = document.createElement("div");
    container.classList.add("media-item_preview-container");
    container.appendChild(imageOrVideoPreviewCardHTMLEl);
    button.appendChild(container);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("media-items_details");

    const titleEl = document.createElement("p");
    titleEl.classList.add("media-item_title");
    titleEl.id = `media-item-title-${id}`;
    titleEl.textContent = title;
    detailsContainer.appendChild(titleEl);

    imageOrVideoPreviewCardHTMLEl.setAttribute(
      "aria-labelledby",
      `media-item-title-${id}`
    );

    const likesDiv = document.createElement("div");
    const likesNumber = document.createElement("p");
    likesNumber.textContent = likes;
    likesNumber.classList.add("media-item_likes-number");
    likesDiv.appendChild(likesNumber);

    const likeIcon = document.createElement("img");
    likeIcon.src = "./assets/icons/like-red.svg";
    likeIcon.alt = "likes";

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("media-item_like-btn");
    likeBtn.appendChild(likeIcon);
    likesDiv.appendChild(likeBtn);

    detailsContainer.appendChild(likesDiv);

    // article.appendChild(link);
    article.appendChild(button);
    article.appendChild(detailsContainer);
    return article;
  }

  function getLightboxMediaDOM() {
    const div = document.createElement("div");
    imageOrVideoPlayerLightboxHTMLEl.dataset.mediaId = id;
    div.appendChild(imageOrVideoPlayerLightboxHTMLEl);

    imageOrVideoPlayerLightboxHTMLEl.setAttribute(
      "aria-labelledby",
      `lightbox-caption-${id}`
    );

    const caption = document.createElement("p");
    caption.textContent = title;
    caption.id = `lightbox-caption-${id}`;
    div.appendChild(caption);
    return div;
  }

  return {
    id,
    photographerId,
    title,
    video,
    image,
    likes,
    isLiked,
    date,
    price,
    getMediaCardDOM,
    getLightboxMediaDOM,
  };
}

function getImageHTMLEl(mediaData) {
  const el = document.createElement("img");
  el.classList.add("media-item_media", "media-item_media--image");
  el.src = `./assets/images/${mediaData.image}`;
  return el;
}

function getVideoHTMLEl(mediaData) {
  const el = document.createElement("video");
  el.classList.add("media-item_media", "media-item_media--video");
  el.src = `./assets/images/${mediaData.video}`;
  return el;
}
