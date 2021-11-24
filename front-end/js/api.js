import { Camera } from "./camera.js";

//------fonction qui envoie une requete au serveur de la liste des caméras a afficher-------
export function getAllCameras() {
  return fetch("http://localhost:3000/api/cameras")
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((value) => {
      //on effectue une boucle for..of
      let cameraList = [];
      for (let camera of value) {
        // on crée une nouvelle instance de la classe a chaque boucle
        cameraList.push(
          new Camera(
            camera._id,
            camera.name,
            camera.description,
            camera.imageUrl,
            camera.price,
            camera.lenses
          )
        );
      }
      return cameraList;//on retourne un tableau de caméras 
    })
    .catch(function (err) {  // fonction catch en cas d'erreur
      console.log(err);
    });
}

//---fonction qui envoie une requete au serveur d'une seule camera a afficher grace a son id--

let url = new URL(window.location.href); //on recupere l'url de la page courante
let id = url.searchParams.get("id"); //puis son recupere l'id du produit depuis l'url
export function getOneCamera(){
  return fetch ("http://localhost:3000/api/cameras/" + id)
  .then((res) =>{
    console.log(res);
    return res.json();
  })
  .then((value) => {  //on instancie une classe avec les données récuperées
    let oneCamera = new Camera(
      value._id,
      value.name,
      value.description,
      value.imageUrl,
      value.price,
      value.lenses
    )
    return oneCamera; //on retourne l'objet camera créé
  })
  .catch(function (err){  // fonction catch en cas d'erreur
    console.log(err);
  });
}

//----------fonction qui va envoyer noes données(formulaire et panier) à l'api---------------

export function sendOrder(data){
  return fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",   //on utilise post afin d'envoyer des données
    headers: {   
      'Accept': 'application/json', //avec ce header on prépare l'api a recevoir du json
      'Content-Type': 'application/json' 
    },
      body: JSON.stringify(data)  //on envoie nos données en format json
  })
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((value) => {  //on va retourner les données reçu (n° de commande etc)
    let commandResult = value;
    return commandResult;
  })
  .catch(function (err) {  // fonction catch en cas d'erreur 
    console.log(err);
  });  
}
