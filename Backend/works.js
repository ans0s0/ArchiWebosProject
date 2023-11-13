// Récupération des pièces depuis l'API
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

//Fonction qui génère toute la page wweb
function genererWorks(works) {
  for (let i = 0; i < works.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector("#gallery");

    // Création d’une balise div dédiée à un travail
    const oneElement = document.createElement("div");

    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;

    // Création d’une balise dédiée au titre
    const titleElement = document.createElement("h3");
    titleElement.innerText = works[i].title;

    // On positionne les éléments à la section principale gallery
    const sectionGalleryWork = document.querySelector("#gallery");

    // On rattache les balises image et title à la div
    sectionGalleryWork.appendChild(oneElement);
    // On rattache l’image à oneElement (la balise div)
    oneElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie...
    oneElement.appendChild(titleElement);
    // Idem pour le nom, le prix et la catégorie...
  }
}
//Premier affichage de la page
genererWorks(works);
//
//
// Filtre des travaux

const tousFiltrer = document.querySelector("#tous-filter");

tousFiltrer.addEventListener("click", function () {
  const tousfiltres = works.filter(
    (work) => work.category.id == work.length >= 0
  );
  console.log(works);

  document.querySelector("#gallery").innerHTML = "";
  genererWorks(works);
});

// Filtre des Objets

const objetsFiltrer = document.querySelector("#objets-filtrer");

objetsFiltrer.addEventListener("click", function () {
  const objetsfiltres = works.filter((work) => work.category.id == 1);
  console.log(objetsfiltres);

  document.querySelector("#gallery").innerHTML = "";
  genererWorks(objetsfiltres);
});

//Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement

// Filtre des appartements

const appartementsFiltrer = document.querySelector("#appartements-filter");

appartementsFiltrer.addEventListener("click", function () {
  const appartementsFiltres = works.filter((work) => work.category.id == 2);
  console.log(appartementsFiltres);

  document.querySelector("#gallery").innerHTML = "";
  genererWorks(appartementsFiltres);
});

// Filtre des hotels et restaurants
const hotelsRestaurantFiltrer = document.querySelector(
  "#hotelsRestaurants-filter"
);

hotelsRestaurantFiltrer.addEventListener("click", function () {
  const hotelsRestaurantFiltres = works.filter((work) => work.category.id == 3);
  console.log(hotelsRestaurantFiltres);
  document.querySelector("#gallery").innerHTML = "";
  genererWorks(hotelsRestaurantFiltres);
});
