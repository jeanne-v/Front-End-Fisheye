async function getPhotographers() {
  const res = await fetch("./data/photographers.json");
  const data = await res.json();
  return data.photographers;
}
