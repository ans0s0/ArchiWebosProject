const work = works[0];
const imageElement = document.createElement("img");
imageElement.src = work.imageUrl;
const titleElement = document.createElement("h2");
titleElement.innerText = work.title;


const sectionPortfolio = document.querySelector("#Portfolio");
sectionPortfolio.appendChild(imageElement);
sectionPortfolio.appendChild(titleElement);
