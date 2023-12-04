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
  document.getElementById("hotelsRestaurants-filter").style.backgroundColor =
    "#1D6154";
  document.getElementById("hotelsRestaurants-filter").style.color = "#FFFFFF";
});

//On récupère le token si existant
const token = localStorage.getItem("token");
if (token) {
  // Si existant afficher la div Edition
  document.getElementById("edition").style.display = "flex";
  document.getElementById("edition").style.justifyContent = "center";
  document.getElementById("edition").style.alignItems = "center";
  document.getElementById("edition").style.gap = "11.42px";
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "flex";
  document.getElementById("add-work").style.display = "none";

  // Ajout d'un nouveau projet
  let addButton = document.getElementById("submit-modal");
  addButton.addEventListener("click", function addProject() {
    document.getElementById("add-work").style.display = "block";
    document.getElementById("content-modal").style.display = "none";
  });
}

// Déconexion du mode Edition
let logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function () {
  if (token) {
    document.getElementById("edition").style.display = "none";
    document.getElementById("button-edition").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "flex";
    localStorage.removeItem("token");
  }
});

//ouverture de la modale en cliquant sur le bouton

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  document.getElementById("modal1").style.display = "flex";
  document.getElementById("modal1").style.ariahidden = "false";
  document.getElementById("modal1").style.ariamodal = "true";
};
//fermeture de la modale au clic sur la croix
let close = document.getElementById("js-close");

close.addEventListener("click", function () {
  document.getElementById("modal1").style.display = "none";
});

//fermeture de la modale au clic sur la modale
let close2 = document.getElementById("modal1");

close2.addEventListener("click", function () {
  document.getElementById("modal1").style.display = "none";
});

//Sélection des liens avec une class pour l'ouverture d'une modale
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//Ajout des travaux dans la modale
function genererWorks2(works) {
  for (let i = 0; i < works.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector(".works-gallery");

    // Création d’une balise div dédiée à un travail
    const oneElement = document.createElement("div");

    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    oneElement.style.position = "relative";
    imageElement.style.alignItems = "center";

    // ajout fond noir corbeille suppression
    const bgElement = document.createElement("img");
    bgElement.src = "assets/icons/move.svg";
    bgElement.style.height = "17px";
    bgElement.style.position = "absolute";
    bgElement.style.top = "6px";
    bgElement.style.right = "6px";

    //ajout icône corbeille suppression
    const basketElement = document.createElement("img");
    basketElement.src = "assets/icons/basket.svg";
    basketElement.style.backgroundColor = "black";
    basketElement.style.height = "11px";
    basketElement.style.position = "absolute";
    basketElement.style.zIndex = "1";
    basketElement.style.top = "9px";
    basketElement.style.right = "10.37px";

    // On positionne les éléments à la section principale gallery
    const sectionGalleryWork = document.querySelector("#works-gallery");

    // On rattache les balises image et title à la div
    sectionGalleryWork.appendChild(oneElement);
    // On rattache l’image à oneElement (la balise div)
    oneElement.appendChild(imageElement);
    oneElement.appendChild(basketElement);
    oneElement.appendChild(bgElement);
  }

  ////Suppression de travaux dans la modale en cliquant sur la corbeille
}
//Premier affichage de la page
genererWorks2(works);
