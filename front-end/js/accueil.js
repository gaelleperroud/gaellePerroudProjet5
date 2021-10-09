import {Camera} from "./camera.js";
//import {getAllCameras} from "./api.js";
const url = "http://localhost:3000/api/cameras";


function getItems(){    // la fonction qui envoie une requete avec fetch get et l'url de l'api
    fetch (url)
    .then ((res) => {   //on affiche le code si la requete est validé ou pas
        console.log(res);
        return res.json();        
    })
    .then ((value) => {   //on effectue une boucle for..of 
        for (let camera of value){   // on crée une nouvelle instance de la classe a chaque boucle
            let newCamera = new Camera(camera._id, camera.name, camera.description, camera.imageUrl, camera.price, camera.lenses);
            createCard(newCamera); //on appelle la fonction qui crée une carte avec chaque instance de la classe
        }
    })
    .catch (function(err){  // fonction catch en cas d'erreur
        console.log(err);
    });
};

const div = document.getElementById("mainContent");  //selection de l'emplacement dans le dom
function createCard(camera){       // crée une carte camera
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
        link.href = "produit.html" + "?" + camera._id;
        link.appendChild(title); //on met le titre dans le lien
        link.appendChild(button);  //on met le bouton dans le lien
        card.appendChild(img); // on met l'image dans la carte
        card.appendChild(link);  //on met le lien dans la carte
        div.appendChild(card);  //on met la carte dans le contenant parent dans le html
}

getItems();
//displayCamera();



