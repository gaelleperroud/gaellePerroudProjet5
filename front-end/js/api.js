import { Camera } from "./camera.js";

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
      return cameraList;
    })
    .catch(function (err) {
      // fonction catch en cas d'erreur
      console.log(err);
    });
}
