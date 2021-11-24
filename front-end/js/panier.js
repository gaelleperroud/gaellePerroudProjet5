import { initStorage } from "./storage.js";
import { sendOrder } from "./api.js";
import { validateName } from "./regex.js";
import { validateMail } from "./regex.js";
import { validateAddress } from "./regex.js";

function displayStorage() {
  if (localStorage.length === 0) {
    let p = document.createElement("p");
    p.textContent = "Il n'y a actuellement aucun article dans votre panier.";
    let panier = document.getElementById("panier");
    panier.appendChild(p);
    let form = document.getElementById("formulaire");
    form.style.display = "none";
  } else {
    let storage = JSON.parse(window.localStorage.getItem("camera"));
    let priceArray = [];
    for (let i = 0; i < storage.length; i++) {
      let camera = storage[i];
      displayCart(camera, storage);

      let totalPrice = (camera.cameraPrice / 100) * camera.cameraCount;
      priceArray.push(totalPrice);
    }

    cleanCart();
    cartFinalSum(priceArray);
  }
}

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
    //quantity.textContent = "quantité : " + camera.cameraCount;
    //totalPricePerItem.textContent =
    //  "Prix total : " + (camera.cameraPrice / 100) * camera.cameraCount + " €";
  }
}

function cartFinalSum(array) {
  let cartSum = array.reduce((a, b) => a + b);
  let sum = document.createElement("p");
  let cartTools = document.getElementById("cartTools");
  cartTools.appendChild(sum);
  sum.textContent = "Montant du panier : " + cartSum + " €";
}

function displayCart(camera, array) {
  const panier = document.getElementById("panier");
  let card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("container");
  card.classList.add("border-primary");
  panier.appendChild(card);
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("row");
  cardHeader.classList.add("cardHeader");
  card.appendChild(cardHeader);
  let title = document.createElement("h3");
  title.innerHTML = camera.cameraName;
  cardHeader.appendChild(title);
  let price = document.createElement("p");
  price.textContent = camera.cameraPrice / 100 + " €";
  cardHeader.appendChild(price);
  let lense = document.createElement("p");
  lense.textContent = "lentille personnalisée : " + camera.cameraLense;
  card.appendChild(lense);
  lense.classList.add("row");
  lense.classList.add("cardLense");
  let cardContent = document.createElement("div");
  cardContent.classList.add("row");
  card.appendChild(cardContent);
  cardContent.classList.add("cardContent");
  let quantityDiv = document.createElement("div");
  quantityDiv.classList.add("quantityDiv");
  cardContent.appendChild(quantityDiv);
  let quantity = document.createElement("p");
  quantity.textContent = "quantité : " + camera.cameraCount;
  quantityDiv.appendChild(quantity);
  let removeButton = document.createElement("button");
  let addButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.classList.add("buttn");
  quantityDiv.appendChild(removeButton);
  removeButton.addEventListener("click", () => removeItem(camera, array));
  addButton.textContent = "+";
  addButton.classList.add("buttn");
  quantityDiv.appendChild(addButton);
  addButton.addEventListener("click", function () {
    camera.cameraCount++;
    initStorage(array);
    quantity.textContent = "quantité : " + camera.cameraCount;
    totalPricePerItem.textContent =
      "Prix total : " + (camera.cameraPrice / 100) * camera.cameraCount + " €";
  });
  let totalPricePerItem = document.createElement("p");
  totalPricePerItem.textContent =
    "Prix total : " + (camera.cameraPrice / 100) * camera.cameraCount + " €";
  cardContent.appendChild(totalPricePerItem);
  totalPricePerItem.classList.add("totalPricePerItem");
}

function cleanCart() {
  let div = document.createElement("div");
  let tool = document.getElementById("cartTools");
  tool.appendChild(div);
  let cleanButton = document.createElement("button");
  cleanButton.textContent = "Vider le panier";
  div.appendChild(cleanButton);
  cleanButton.classList.add("bg-primary");
  cleanButton.addEventListener("click", function () {
    window.localStorage.clear();
    window.location.reload();
  });
}
async function receiveOrder(data) {
  const orderReturn = await sendOrder(data);
  let orderNumber = orderReturn.orderId;
  let contact = orderReturn.contact;
  window.location.href =
    "validation.html?name=" + contact.firstName + "&orderId=" + orderNumber;
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
    let cameraIdToSend = camera.cameraId;
    products.push(cameraIdToSend);
  });
  let order = { contact, products };
  receiveOrder(order);
  window.localStorage.clear();
});
//-------------------------------regex-----------------------------------
/*let fieldLastName = document.getElementById("lastName");
let inputLastName = fieldLastName.value;
fieldLastName.addEventListener("change", function () {
  let inputLastName = fieldLastName.value;
  validateName(inputLastName, fieldLastName);
});

let fieldfirstName = document.getElementById("firstName");
let inputFirstName = fieldfirstName.value;
fieldfirstName.addEventListener("change", function(){
  let inputFirstName = fieldfirstName.value;
  validateName(inputFirstName, fieldfirstName);
});

let fieldEmail = document.getElementById("email");
let inputEmail = fieldEmail.value;
fieldEmail.addEventListener("change", function(){
  let inputEmail = fieldEmail.value;
  validateMail(inputEmail, fieldEmail);
});

let fieldAddress = document.getElementById("address");
let inputAddress = fieldAddress.value;
fieldAddress.addEventListener("change", function(){
  let inputAddress = fieldAddress.value;
  validateAddress(inputAddress, fieldAddress);
});

let fieldCity = document.getElementById("city");
let inputCity = fieldCity.value;
fieldCity.addEventListener("change", function(){
  let inputCity = fieldCity.value;
  validateName(inputCity, fieldCity);
});

let input = document.querySelector("input");
let button = document.getElementById("sendButton");
button.disabled = true;
input.addEventListener("change",function(){
  if (validateName(inputLastName, fieldLastName) == true || 
      validateName(inputFirstName, fieldfirstName) == true ||
      validateMail(inputEmail, fieldEmail) == true ||
      validateAddress(inputAddress, fieldAddress) == true ||
      validateName(inputCity, fieldCity) == true){
        button.disabled = false;
      }
});*/
//----------------------fin regex-----------------------------------

displayStorage();
