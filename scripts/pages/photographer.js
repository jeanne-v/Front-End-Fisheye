function displayData(photographer, media) {
  const photographersHeader = document.querySelector(".photographer-header");

  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getLongUserCardDOM();
  photographersHeader.appendChild(userCardDOM);

  const mediaContainer = document.querySelector(".media-container");
  media.forEach((mediaEl) => {
    const mediaModel = mediaFactory(mediaEl);
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

async function init() {
  const params = new URL(document.location.toString()).searchParams;
  const photographerId = Number(params.get("id"));
  const photographers = await getPhotographers();
  const photographer = photographers.filter((person) => person.id === photographerId)[0];

  const media = await getPhotographerMedia(photographerId);

  displayData(photographer, media);
}

init();
