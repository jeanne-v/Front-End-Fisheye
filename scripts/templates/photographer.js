function photographerTemplate(photographerData, photographerTotalLikes) {
  const { name, id, city, country, tagline, price, portrait } = photographerData;
  const likes = photographerTotalLikes;
  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const priceStr = `${price}€/jour`;

  function getShortUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer", "photographer--short");

    article.innerHTML = `
    <a href="/photographer.html?id=${id}">
        <img class="photographer_img" src="${picture}" alt=""/>
        <h2 class="photographer_name">${name}</h2>
    </a>
    <p class="photographer_location">${location}</p>
    <p class="photographer_tagline">${tagline}</p>
    <p class="photographer_price">${priceStr}</p>
    `;
    return article;
  }

  function getLongUserCardDOM() {
    const container = document.createElement("div");
    container.classList.add("photographer", "photographer--long");

    container.innerHTML = `
    <div>
      <h1 class="photographer_name">${name}</h1>
      <p class="photographer_location">${location}</p>
    <p class="photographer_tagline">${tagline}</p>
    </div>
    <button class="contact_button">Contactez-moi</button>
    <img class="photographer_img" src="${picture}" alt=""/>
    <div class="photographer_fixed-details">
      <div class="photographer_likes">
      <p class="photographer_likes-number">${likes}</p>
      <img src="./assets/icons/like-black.svg" class="photographer_likes-icon" alt="likes" />
      </div>
      <p class="photographer_price">${priceStr}</p>
    </div>
    `;
    return container;
  }

  return {
    name,
    id,
    location,
    tagline,
    priceStr,
    picture,
    getShortUserCardDOM,
    getLongUserCardDOM,
  };
}
