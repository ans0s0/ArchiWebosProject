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
    oneElement.style.width = "32%";

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

const filters = document.querySelectorAll(".filter-button");

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    const dataId = e.target.dataset.id;

    document.querySelector("#gallery").innerHTML = "";

    if (dataId === "0") return genererWorks(works);

    const worksFiltered = works.filter(
      (work) => work.category.id === Number(dataId)
    );

    genererWorks(worksFiltered);

    console.log(dataId);
  });

  //couleur boutons filtres

  const button = document.querySelectorAll(".filter-button");

  button.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".active")?.classList.remove("active");
      button.classList.add("active");
    });
  });
});

//On récupère le token si existant
const token = localStorage.getItem("token");
if (token) {
  // Si existant afficher la div Edition
  document.getElementById("button-edition").style.display = "flex";
  document.getElementById("edition").style.display = "flex";
  const pannel = document.getElementById("edition");
  pannel.classList.add("works-edition");
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "flex";
  document.getElementById("add-work").style.display = "none";
  document.getElementById("filters").style.display = "none";

  // Ajout d'un nouveau projet
  let addButton = document.getElementById("submit-modal");
  addButton.addEventListener("click", function addProject() {
    document.getElementById("add-work").style.display = "block";
    document.getElementById("content-modal").style.display = "none";
  });

  //////
  //fermeture de la modale au clic sur la croix
  let closeFirst = document.getElementById("js-close");

  closeFirst.addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });

  //fermeture de la modale au clic sur la croix
  let closeBis = document.getElementById("js-close2");

  closeBis.addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
    location.reload();
  });

  //retour arrière modale
  let goingBack = document.getElementById("arrow");

  goingBack.addEventListener("click", function () {
    console.log("retour arrière!");
    document.getElementById("add-work").style.display = "none";
    document.getElementById("content-modal").style.display = "flex";
  });
}

// Déconexion du mode Edition
let logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function () {
  if (token) {
    document.getElementById("edition").style.display = "none";
    document.getElementById("filters").style.display = "flex";
    document.getElementById("button-edition").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "flex";
    localStorage.removeItem("token");
  }
});

//ouverture de la modale en cliquant sur le bouton
let modal = null;
const openModal = function (e) {
  e.preventDefault();

  const target = document.querySelector(e.target.getAttribute("href"));

  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal").style.ariahidden = "false";
  document.getElementById("modal").style.ariamodal = "true";
  modal = target;
};

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
    imageElement.id = works[i].id;
    const idWork = works[i].id;
    oneElement.style.position = "relative";
    imageElement.style.alignItems = "center";

    //ajout icône corbeille suppression
    const basketElement = document.createElement("img");
    basketElement.src = "assets/icons/basket.svg";
    basketElement.setAttribute("data-id", idWork);
    basketElement.setAttribute("id", "basket-element");

    // On positionne les éléments à la section principale gallery
    const sectionGalleryWork = document.querySelector(".works-gallery");

    // On rattache les balises image et title à la div
    sectionGalleryWork.appendChild(oneElement);
    // On rattache l’image à oneElement (la balise div)
    oneElement.appendChild(imageElement);
    oneElement.appendChild(basketElement);

    //Suppression de travaux dans la modale en cliquant sur la corbeille
    console.log("works[i].id", works[i].id);

    basketElement.addEventListener("click", function deleteProject() {
      fetch(`http://localhost:5678/api/works/${works[i].id}`, {
        method: "DELETE",
        headers: {
          // Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => console.log({ response }));
    });
  }

  // Upload de l'image d'un projet dans la modale
  const imageFile = document.getElementById("img-upload");
  const inputFile = document.getElementById("fileInput");
  inputFile.onchange = function () {
    imageFile.src = URL.createObjectURL(inputFile.files[0]);
    document.getElementById("icon-upload").style.display = "none";
    document.getElementById("icon-image").style.padding = "0px";
    document.getElementById("add-button").style.display = "none";
    document.getElementById("img-upload").style.display = "flex";
    imageFile.classList.add("img-upload");
  };
}
//Premier affichage de la page
genererWorks2(works);

//Je sélectionne le formulaire

let form = document.getElementById("formulaire-ajout");

//J'ajoute un évènement au clic sur le bouton Envoyer
form.addEventListener("submit", async (event) => {
  event.preventDefault(); //J'annule le rechargement automatique du formulaire

  let baliseImage = document.getElementById("fileInput"); //Je pointe vers l'image
  let imageWork = baliseImage.files[0]; //Je récupère la valeur renseignée dans le champ Titre

  let baliseTitle = document.getElementById("work-choice"); //Je pointe vers le titre
  let titleWork = baliseTitle.value; //Je récupère la valeur renseignée dans le champ Titre

  let baliseCategory = document.getElementById("category-choice"); //Je pointe vers la catégorie
  let categoryWork = baliseCategory.value; //Je récupère la valeur renseignée dans le champ Titre

  const formData = new FormData();
  formData.append("title", titleWork);
  formData.append("image", imageWork);
  formData.append("category", categoryWork);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      ContentType: "multipart/form-data",
    },
    body: formData,
  });

  console.log(response);
  console.log(imageWork, titleWork, categoryWork); //J'affiche l'email et Password
});
