import { getOneCamera } from "./api.js";
import { initStorage } from "./storage.js";
import { sameItemInCart } from "./storage.js";
import { addNewItemInCart } from "./storage.js";

//--mise en place de l'objet cameraData qui sera réutilisé a plusieurs reprises-----
let cameraName;
let cameraPrice;
let cameraId;
let cameraCount = 1;
let cameraLense = "non";
let cameraData = {
  cameraId,
  cameraCount,
  cameraLense,
  cameraName,
  cameraPrice,
};

//-----fonction asynchrone de requete a l'api----------------------------------
async function loadCamera() {
  const oneCamera = await getOneCamera();
  displayOneCamera(oneCamera);
}


//------------fonction qui affiche les differents element de notre camera--------------
function displayOneCamera(camera) {
  cameraName = camera.name;
  cameraPrice = camera.price;
  cameraId = camera._id;
  cameraData = { cameraId, cameraCount, cameraLense, cameraName, cameraPrice };
  let img = document.getElementById("imageHere");
  img.src = camera.imageUrl;
  let title = document.getElementById("nameHere");
  title.textContent = camera.name;
  let desc = document.getElementById("descriptionHere");
  desc.textContent = camera.description;
  let price = document.getElementById("priceHere");
  price.textContent = camera.price / 100 + " €";
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

//----on ecoute l'evenement quand l'utilisateur choisi une lentille ----------------
let lenseSelector = document.getElementById("lenseSelector");
lenseSelector.addEventListener("change", function () {
  cameraLense = this.value;
  cameraData = { cameraId, cameraCount, cameraLense, cameraName, cameraPrice };
  //et on modifie l'objet cameraData en conséquence
});

//------on écoute notre bouton d'ajout au panier ----------------
let cartButton = document.getElementById("addToCart");
cartButton.addEventListener("click", function () {
  if (localStorage.length === 0) { //si le localStorage est vide on initie le localStorage
    let cameraStorage = [cameraData];
    initStorage(cameraStorage);
  } else if (sameItemInCart(cameraData) == 1) {//si deux articles identiques,ajoute une quantité
    console.log("deux articles identiques");
  } else {//sinon on ajoute un article au localStorage
    addNewItemInCart(cameraData);
  }
});

loadCamera();