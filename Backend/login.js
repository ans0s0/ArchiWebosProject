//Je sélectionne le formulaire

let form = document.querySelector("form");

//J'ajoute un évènement au clic sur le bouton Envoyer
form.addEventListener("submit", async (event) => {
  event.preventDefault(); //J'annule le rechargement automatique du formulaire

  let baliseEmail = document.getElementById("myEmail"); //Je pointe vers ID Email
  let myEmail = baliseEmail.value; //Je récupère la valeur renseignée dans le champs Email

  let balisePassword = document.getElementById("myPassword"); //Je pointe vers ID Password
  let myPassword = balisePassword.value; //Je récupère la valeur renseignée dans le champs MDP

  console.log(myEmail, myPassword); //J'affiche l'email et Password

  //Penser à rajouter des règles pour la syntaxe de l'email

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: myEmail,
      password: myPassword,
    }),
  });

  const { userId, token } = await response.json();
  console.log(token);

  if (token) {
    localStorage.setItem("token", token);
    window.location.href = "index.html";
    document.getElementById("edition").style.display = "block";
  } else {
    document.getElementById("error").style.display = "block";
  }
});
