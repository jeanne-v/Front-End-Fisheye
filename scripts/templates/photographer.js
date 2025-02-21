function photographerTemplate(photographerData) {
  const { name, id, city, country, tagline, price, portrait } = photographerData;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    article.innerHTML = `
    <a href="/photographer?id=${id}">
        <img src="${picture}" alt=""/>
        <h2>${name}</h2>
    </a>
    <p class="photographer_location">${city}, ${country}</p>
    <p class="photographer_tagline">${tagline}</p>
    <p class="photographer_price">${price}€/jour</p>
    `;
    return article;
  }
  return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}
