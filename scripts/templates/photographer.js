function photographerTemplate(photographerData) {
  const { name, id, city, country, tagline, price, portrait } = photographerData;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}
