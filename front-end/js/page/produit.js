import { getOneCamera } from "../services/api.js";
import { Cart } from "../classes/Cart.js";

//-----fonction asynchrone de requete a l'api----------------------------------
async function loadCamera() {
  let url = new URL(window.location.href); //on recupere l'url de la page courante
  let id = url.searchParams.get("id"); //puis son recupere l'id du produit depuis l'url
  const oneCamera = await getOneCamera(id);
  return oneCamera;
}

//------------fonction qui affiche les differents element de notre camera--------------
function displayOneCamera(camera) {
  let img = document.getElementById("imageHere");
  img.src = camera.imageUrl;
  let title = document.getElementById("nameHere");
  title.textContent = camera.name;
  let desc = document.getElementById("descriptionHere");
  desc.textContent = camera.description;
  let price = document.getElementById("priceHere");
  price.textContent = camera.getFormatedPrice() + " €";
  lensesDisplay(camera.lenses);
}

//----------------fonction qui va afficher les differentes lentilles a choisir -----------
function lensesDisplay(lenses) {
  for (let lense of lenses) {
    let option = document.createElement("option");
    option.setAttribute("value", lense);
    option.innerHTML = lense;
    document.getElementById("lenseSelector").appendChild(option);
  }
}

//------on écoute notre bouton d'ajout au panier ----------------
function addToCart(camera) {
  camera.lense = document.getElementById("lenseSelector").value;
  camera.cameraCount = 1;
  if (localStorage.length === 0) {
    //si le localStorage est vide on initie le localStorage
    Cart.getInstance().update([camera]);
  } else {
    Cart.getInstance().addItem(camera);
  }
  window.location.href = "panier.html";
}

//-------------fonction principale.. -------------------------
async function init() {
  let oneCamera = await loadCamera(); //on récuperele resultat de la requete a l'api
  displayOneCamera(oneCamera); //ensuite afficher le résultat a l'écran
  document //puis enfin écouter le bouton d'ajout au panier afin d'envoyer les produits
    .getElementById("addToCart") //dans le localStorage
    .addEventListener("click", () => addToCart(oneCamera));
}

init();
