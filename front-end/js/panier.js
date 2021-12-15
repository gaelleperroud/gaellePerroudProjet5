import { Cart } from "./cart.js";
import { sendOrder } from "./api.js";
import { testForm } from "./regex.js";
//import { validateMail } from "./regex.js";
//import { validateAddress } from "./regex.js";
import { Camera } from "./camera.js";

function displayStorage() {
  if (localStorage.length === 0) {
    //si le localStorage est vide:
    emptyCartDisplay();
  }
  //sinon on va afficher le panier ainsi qu'un bouton pour le vider et la somme du panier
  else {
    let cart = new Cart();
    let cartArray = cart.getItems();
    for (let i = 0; i < cartArray.length; i++) {
      let camera = cartArray[i];
      displayCart(camera, cartArray);
    }
    cleanCart();
    createTotalPrice();
  }
}

//-----fonction qui va afficher un texte a l'écran et cacher le formulaire--------
function emptyCartDisplay() {
  let p = document.createElement("p");
  p.textContent = "Il n'y a actuellement aucun article dans votre panier.";
  document.getElementById("panier").appendChild(p);
  document.getElementById("formulaire").style.display = "none";
}

//-----fonction qui va afficher le prix total du panier---------------------
function createTotalPrice() {
  let sum = document.createElement("p");
  document.getElementById("cartTools").appendChild(sum);
  let totalSum = Cart.getTotalValue();
  console.log(totalSum);
  sum.textContent = "Montant du panier : " + totalSum +" €";
}

//---------------------fonction qui va enler un article de la quantité----------------
function removeItem(camera, array) {
  if (camera.cameraCount == 1) {
    let index = array.indexOf(camera);
    if (index > -1 && array.length > 1) {
      array.splice(index, 1);
      Cart.initCart(array);
      window.location.reload();
    } else if (index > -1 && array.length == 1) {
      window.localStorage.clear();
      window.location.reload();
    }
  } else {
    camera.cameraCount--;
    Cart.initCart(array);
    updateCardBottom(camera, array);
  }
}

//--------------------fonction qui va ajouter un article de la quantité-------------------
function addItem(camera, array) {
  camera.cameraCount++;
  Cart.initCart(array);
  updateCardBottom(camera, array);
}

//----fonction qui va modifier la quantité et le prix sur la carte affiché----------------
function updateCardBottom(camera, array) {
  let quantity = document.getElementsByClassName("quantity");
  let price = document.getElementsByClassName("totalPricePerItem");
  let index = array.indexOf(camera);
  quantity[index].textContent = "quantité : " + camera.cameraCount;
  price[index].textContent =
    "Prix total : " +
    Cart.formatedPrice(camera.price) * camera.cameraCount +
    " €";
  //cartFinalSum(array);
}

//------------fonction qui crée une carte pour chaque camera du panier-------------------
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
  price.textContent = Cart.formatedPrice(camera.price) + " €";
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
    "Prix total : " +
    Cart.formatedPrice(camera.price) * camera.cameraCount +
    " €";
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
  document.getElementById("cartTools").appendChild(div);
  let cleanButton = document.createElement("button");
  cleanButton.classList.add("bg-primary");
  cleanButton.textContent = "Vider le panier";
  div.appendChild(cleanButton);
  cleanButton.addEventListener("click", () => Cart.cleanCart());
}

//fonction qui apres avoir les données de l'api va vider le panier et envoyer l'utilisateur sur
//la page validation tout en passant le numero de commande et le prenom en parametre de l'url
async function receiveOrder(data) {
  const orderReturn = await sendOrder(data);
  window.location.href =
    "validation.html?name=" +
    orderReturn.contact.firstName +
    "&orderId=" +
    orderReturn.orderId;
  window.localStorage.clear();
}

//----------fonction qui va créer l'objet contact---------------------
function getFormData() {
  let lastName = document.getElementById("lastName").value;
  let firstName = document.getElementById("firstName").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let contact = { lastName, firstName, email, address, city };
  return contact;
}

//--fonction qui va tester les données du formulaire puis si elles sont valides--------
//--------va créer les objets a envoyer puis envoyer les données a l'api
function activateSendButton() {
  let button = document.getElementById("sendButton");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let error = testForm();
    if (error.length !== 0) {
      alert(error);
    } else {
      let contact = getFormData();
      let products = [];
      let cart = new Cart;
      let storage = cart.getItems();
      storage.forEach((camera) => {
        let cameraIdToSend = camera._id;
        products.push(cameraIdToSend);
      });
      let order = { contact, products };
      receiveOrder(order);
      window.localStorage.clear();
    }
  });
}

activateSendButton();
displayStorage();
