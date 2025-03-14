function mediaFactory(mediaData) {
  let { id, photographerId, title, video, image, likes, isLiked, date, price } =
    mediaData;
  let el;
  let fullEl;

  if (image) {
    el = getImageEl(mediaData);
    fullEl = el.cloneNode(true);
  } else if (video) {
    el = getVideoEl(mediaData);
    fullEl = el.cloneNode(true);
    fullEl.controls = true;
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
    container.appendChild(el);
    button.appendChild(container);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("media-items_details");

    const titleEl = document.createElement("p");
    titleEl.classList.add("media-item_title");
    titleEl.textContent = title;
    detailsContainer.appendChild(titleEl);

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

  function getFullMediaDOM() {
    const div = document.createElement("div");
    fullEl.dataset.mediaId = id;
    div.appendChild(fullEl);

    const caption = document.createElement("p");
    caption.textContent = title;
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
    getFullMediaDOM,
  };
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
