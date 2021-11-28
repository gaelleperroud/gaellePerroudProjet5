//--------------initialiser le localStorage: mettre un premier article dedans------------------
export function initStorage(data) {
    let jsonToStorage = JSON.stringify(data);
    window.localStorage.setItem("camera", jsonToStorage);
    console.log(localStorage);
}

//--------ajouter une quantité en cas d'article identique------------------------------------

export function sameItemInCart(data) {
    //on va récuperer le contenu du localStorage
    let cameraArray = JSON.parse(window.localStorage.getItem("camera"));
    for (let camera of cameraArray) {
      if (  //puis faire une boucle avec le tableau d'article et verifier si 
        data._id === camera._id &&   //l'id et la lentille sont identiques
        data.lense === camera.lense
      ) {
        camera.cameraCount++;    //si oui on va ajouter une quantité 
        initStorage(cameraArray);   //et le renvoyer dans le localStorage
        return 1;
      }
    }  
}

//---------ajouter un article non-similaire dans le localStorage------------------------------
export function addNewItemInCart(data) {
    //on récupere le contenu du localStorage
    let cameraArray = JSON.parse(window.localStorage.getItem("camera"));
    cameraArray.push(data); //on ajoute un element au tableau
    initStorage(cameraArray);  //on renvoie dans le localStorage
}

//--------------vider le localStorage et recharger la page------------------------------------
export function cleanStorage(){
    window.localStorage.clear();
    window.location.reload();
}