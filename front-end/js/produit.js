import { Camera } from "./camera.js";
const apiUrl = "http://localhost:3000/api/cameras";

let url = new URL(window.location.href); //on recupere l'url de la page courante
let id = url.searchParams.get("id"); //puis son recupere l'id du produit depuis l'url
let apiOneUrl = apiUrl + "/" + id; //on crée un nouvel url qui contient l'id du produit

let cameraId = id;
let cameraCount = 1;
let cameraLense = 0;
let cameraName;
let cameraPrice;
let cameraData;

export function getOneCamera() {
  fetch(apiOneUrl)
    .then((res) => {
      //on affiche le code si la requete est validé ou pas
      console.log(res);
      return res.json();
    })
    .then((value) => {
      let oneCamera = new Camera(
        value._id,
        value.name,
        value.description,
        value.imageUrl,
        value.price,
        value.lenses
      );
      console.log(oneCamera);
      displayOneCamera(oneCamera);
      cameraData = {
        cameraId,
        cameraCount,
        cameraLense,
        cameraName,
        cameraPrice,
      };
      console.log(cameraData);
    })
    .catch(function (err) {
      // fonction catch en cas d'erreur
      console.log(err);
    });
}

function displayOneCamera(camera) {
  cameraName = camera.name;
  cameraPrice = camera.price;
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

function lensesDisplay(lenses) {
  for (let lense of lenses) {
    let option = document.createElement("option");
    option.setAttribute("value", lense);
    option.innerHTML = lense;
    document.getElementById("lenseSelector").appendChild(option);
  }
}

let lenseSelector = document.getElementById("lenseSelector");
lenseSelector.addEventListener("change", function () {
  cameraLense = this.value;
  cameraData = { cameraId, cameraCount, cameraLense, cameraName, cameraPrice };
});

function sameItemInCart(cameraData) {
  let cameraArray = JSON.parse(window.localStorage.getItem("camera"));
  for (let camera of cameraArray) {
    if (
      cameraData.cameraId === camera.cameraId &&
      cameraData.cameraLense === camera.cameraLense
    ) {
      camera.cameraCount++;
      setCamera(cameraArray);
      return 1;
    }
  }
}

function addNewItemInCart(cameraData) {
  let cameraArray = JSON.parse(window.localStorage.getItem("camera"));
  cameraArray.push(cameraData);
  setCamera(cameraArray);
}

function setCamera(camera) {
  let storageJson = JSON.stringify(camera);
  window.localStorage.setItem("camera", storageJson);
  console.log(localStorage);
}

let cartButton = document.getElementById("addToCart");
cartButton.addEventListener("click", function () {
  if (localStorage.length === 0) {
    let cameraStorage = [cameraData];
    setCamera(cameraStorage);
  } else if (sameItemInCart(cameraData) == 1) {
    console.log("deux articles identiques");
  } else {
    addNewItemInCart(cameraData);
  }
});

getOneCamera();
