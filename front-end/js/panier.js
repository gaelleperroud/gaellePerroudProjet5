import { initStorage } from "./storage.js";
import { cleanStorage } from "./storage.js";
import { sendOrder } from "./api.js";
import { validateName } from "./regex.js";
import { validateMail } from "./regex.js";
import { validateAddress } from "./regex.js";

function displayStorage() {
  //si le local storage est vide on va afficher un texte a l'écran et cacher le formulaire
  if (localStorage.length === 0) {
    let p = document.createElement("p");
    p.textContent = "Il n'y a actuellement aucun article dans votre panier.";
    document.getElementById("panier").appendChild(p);
    document.getElementById("formulaire").style.display = "none";
  }
  //sinon on va afficher le panier ainsi qu'un bouton pour le vider et la somme du panier
  else {
    let storage = JSON.parse(window.localStorage.getItem("camera"));   
    for (let i = 0; i < storage.length; i++) {
      let camera = storage[i];
      displayCart(camera, storage);  
    }
    cleanCart();
    createTotalPrice(storage);
  }
}

//-----fonction qui va afficher le prix total du panier------------a faire
function cartFinalSum(array) {
  let priceArray = [];
  array.forEach(camera => getPrice(camera, priceArray));
  let cartSum = priceArray.reduce((a, b) => a + b);
  document.querySelector("#cartTools p").textContent = "Montant du panier : " + cartSum + " €";
}

function getPrice(camera, array){
  let totalPrice = (camera.price / 100) * camera.cameraCount;
  array.push(totalPrice);
  return array;
}

function createTotalPrice(array){
  let sum = document.createElement("p");
  document.getElementById("cartTools").appendChild(sum);
  cartFinalSum(array);
}

//---------------------fonction qui va enler un article de la quantité----------------
function removeItem(camera, array) {
  if (camera.cameraCount == 1) {
    let index = array.indexOf(camera);
    if (index > -1 && array.length > 1) {
      array.splice(index, 1);
      initStorage(array);
      window.location.reload();
    } else if (index > -1 && array.length == 1) {
      window.localStorage.clear();
      window.location.reload();
    }
  } else {
    camera.cameraCount--;
    initStorage(array);
    updateCardBottom(camera, array);
  }
}

//--------------------fonction qui va ajouter un article de la quantité-------------------
function addItem(camera, array) {
  camera.cameraCount++;
  initStorage(array);
  updateCardBottom(camera, array); 
}

//----fonction qui va modifier la quantité et le prix sur la carte affiché----------------
function updateCardBottom(camera, array){
  let quantity = document.getElementsByClassName("quantity");
  let price = document.getElementsByClassName("totalPricePerItem");
  let index = array.indexOf(camera);
  quantity[index].textContent = "quantité : " + camera.cameraCount;
  price[index].textContent = "Prix total : " + (camera.price / 100) * camera.cameraCount + " €";
  cartFinalSum(array);
}

//-----fonction qui crée une carte pour chaque camera du panier-------------------
function createCard() {
  const panier = document.getElementById("panier");
  let card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("container");
  card.classList.add("border-primary");
  panier.appendChild(card);
  return card;
}

//----fonction qui va créer le header de la carte avec le nom et le prix de la caméra--
function createCardHeader(camera) {
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("row");
  cardHeader.classList.add("cardHeader");
  let title = document.createElement("h3");
  title.innerHTML = camera.name;
  cardHeader.appendChild(title);
  let price = document.createElement("p");
  price.textContent = camera.price / 100 + " €";
  cardHeader.appendChild(price);
  return cardHeader;
}

//----fonction qui va créer le milieu de la carte: la partie lentille personnalisée----
function createCardLense(camera) {
  let selectedLense = document.createElement("p");
  selectedLense.classList.add("row");
  selectedLense.classList.add("cardLense");
  selectedLense.textContent = "lentille personnalisée : " + camera.lense;
  return selectedLense;
}

//---fonction qui va créer le bas de la carte avec la quantité, les boutons et la somme----
function createCardBottom(camera, array) {
  let cardContent = document.createElement("div");
  cardContent.classList.add("row");
  cardContent.classList.add("cardContent");
  let quantityDiv = document.createElement("div");
  quantityDiv.classList.add("quantityDiv");
  cardContent.appendChild(quantityDiv);
  let quantity = document.createElement("p");
  quantity.classList.add("quantity");
  quantity.textContent = "quantité : " + camera.cameraCount;
  quantityDiv.appendChild(quantity);
  let removeButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.classList.add("buttn");
  removeButton.classList.add("removeBtn");
  quantityDiv.appendChild(removeButton);  
  let addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.classList.add("buttn");
  addButton.classList.add("addBtn");
  quantityDiv.appendChild(addButton);  
  let totalPricePerItem = document.createElement("p");
  totalPricePerItem.classList.add("totalPricePerItem");
  totalPricePerItem.textContent =
    "Prix total : " + (camera.price / 100) * camera.cameraCount + " €";
  cardContent.appendChild(totalPricePerItem);
  removeButton.addEventListener("click", () => removeItem(camera, array));
  addButton.addEventListener("click", () => addItem(camera, array));
  return cardContent;
}

//-----------fonction qui assembler toute les parties de la carte et l'afficher-------------
function displayCart(camera, array) {
  let card = createCard();
  let cardHeader = createCardHeader(camera);
  let lense = createCardLense(camera);
  let cardContent = createCardBottom(camera, array);
  card.appendChild(cardHeader);
  card.appendChild(lense);
  card.appendChild(cardContent);
}

//-----------------fonction qui crée un bouton pour vider le panier------------------------
function cleanCart() {
  let div = document.createElement("div");
  let tool = document.getElementById("cartTools");
  tool.appendChild(div);
  let cleanButton = document.createElement("button");
  cleanButton.classList.add("bg-primary");
  cleanButton.textContent = "Vider le panier";
  div.appendChild(cleanButton);
  cleanButton.addEventListener("click", () => cleanStorage());
}

//fonction qui apres avoir les données de l'api va vider le panier et envoyer l'utilisateur sur
//la page validation tout en passant le numero de commande et le prenom en parametre de l'url
async function receiveOrder(data) {
  const orderReturn = await sendOrder(data);
  window.location.href =
    "validation.html?name=" + orderReturn.contact.firstName + "&orderId=" + orderReturn.orderId;
  window.localStorage.clear();
}

let sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", function (e) {
  e.preventDefault();
  let lastName = document.getElementById("lastName").value;
  let firstName = document.getElementById("firstName").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let contact = { lastName, firstName, email, address, city };
  let storage = JSON.parse(window.localStorage.getItem("camera"));
  let products = [];
  storage.forEach((camera) => {
    let cameraIdToSend = camera._id;
    products.push(cameraIdToSend);
  });
  let order = { contact, products };
  receiveOrder(order);
  window.localStorage.clear();
});

//-------------------------------regex-----------------------------------
const fieldLastName = document.getElementById("lastName");
fieldLastName.addEventListener("change", (e) => validateName(e.target.value, fieldLastName));

let fieldfirstName = document.getElementById("firstName");
fieldfirstName.addEventListener("change", (e) => validateName(e.target.value, fieldfirstName));

let fieldEmail = document.getElementById("email");
fieldEmail.addEventListener("change", (e) => validateMail(e.target.value, fieldEmail));

let fieldAddress = document.getElementById("address");
fieldAddress.addEventListener("change", (e) => validateAddress(e.target.value, fieldAddress));

let fieldCity = document.getElementById("city");
fieldCity.addEventListener("change", (e) => validateName(e.target.value, fieldCity));

let input = document.querySelector("input");
let button = document.getElementById("sendButton");
//button.disabled = true;
input.addEventListener("change", (e) => {
  console.log("test");
  if (validateName(e.target.value, fieldLastName) == true && 
      validateName(e.target.value, fieldLastName) == true &&
      validateMail(e.target.value, fieldEmail) == true &&
      validateAddress(e.target.value, fieldAddress) == true &&
      validateName(e.target.value, fieldCity) == true){
        console.log("regex ok")
        button.disabled = false;
      }
});
//----------------------fin regex-----------------------------------

displayStorage();
