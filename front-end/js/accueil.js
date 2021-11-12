import { getAllCameras } from "./api.js";

async function loadCameras() {
    const cameraList = await getAllCameras();
    cameraList.forEach(camera => displayCameraCard(camera));
};

function displayCameraCard(camera) {       // crée une carte camera
    let title = document.createElement("h2");       //crée un element titre
    title.innerHTML = camera.name;  // avec le nom de la camera qu'on a recuperé sur l'api
    title.classList.add("col-8");
    let img = document.createElement("img");   // crée une image
    img.src = camera.imageUrl;   // avec la source qu'on a recup sur l'api
    img.classList.add("card-img-top");
    let button = document.createElement("button");   // on crée un bouton
    button.textContent = "Voir le produit";
    button.classList.add("col-4");
    button.classList.add("bg-primary");
    let card = document.createElement("div"); //on crée une div avec la classe row
    card.classList.add("cameraCard");
    card.classList.add("row");
    let link = document.createElement("a");  // on crée un lien
    link.classList.add("row");
    link.href = "produit.html" + "?id=" + camera._id;
    link.appendChild(title); //on met le titre dans le lien
    link.appendChild(button);  //on met le bouton dans le lien
    card.appendChild(img); // on met l'image dans la carte
    card.appendChild(link);  //on met le lien dans la carte
    const div = document.getElementById("mainContent");  //selection de l'emplacement dans le dom
    div.appendChild(card);  //on met la carte dans le contenant parent dans le html
}

loadCameras();




