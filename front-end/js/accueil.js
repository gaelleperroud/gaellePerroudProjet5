import { getAllCameras } from "./api.js";

//--fonction asynchrone qui va envoyer une requete a l'api pour toutes les caméras-------------
async function loadCameras() {
    const cameraList = await getAllCameras();
    cameraList.forEach(camera => displayCameraCard(camera));
};

//----fonction qui va afficher nos differentes cameras sous formes de cartes-------------------
function displayCameraCard(camera) {       
    let title = document.createElement("h2");       
    title.innerHTML = camera.name; 
    title.classList.add("col-8");
    let img = document.createElement("img");
    img.src = camera.imageUrl;   
    img.classList.add("card-img-top");
    let button = document.createElement("button");  
    button.textContent = "Voir le produit";
    button.classList.add("col-4");
    button.classList.add("bg-primary");
    let card = document.createElement("div");
    card.classList.add("cameraCard");
    card.classList.add("row");
    let link = document.createElement("a"); 
    link.classList.add("row");
    link.href = "produit.html" + "?id=" + camera._id;
    link.appendChild(title);
    link.appendChild(button); 
    card.appendChild(img); 
    card.appendChild(link); 
    const div = document.getElementById("mainContent"); 
    div.appendChild(card); 
}

loadCameras();