export class Cart {
    
    constructor() {
        this.items = JSON.parse(window.localStorage.getItem("camera"));    
    }

    getItems() {
        return this.items
    }

    static formatedPrice(data){
        return data/100;
    }
    
    static initCart(data) {
        let jsonToStorage = JSON.stringify(data);
        window.localStorage.setItem("camera", jsonToStorage);
        console.log(localStorage);
    }
    

    static addItem(item) {   // fonction qui ajoute un article dans le panier       
        let cart = new Cart;
        let cartArray = cart.getItems()
        cartArray.push(item); 
        initCart(cartArray);    
    }

    static addSameItem(item) {
        let cart = new Cart;
        let cartArray = cart.getItems()
        for (let camera of cartArray) {
          if (  //on va faire une boucle avec le tableau d'article et verifier si 
            item._id === camera._id &&   //l'id et la lentille sont identiques
            item.lense === camera.lense
          ) {
            camera.cameraCount++;    //si oui on va ajouter une quantité 
            Cart.initCart(cartArray);   //et le renvoyer dans le localStorage
            return 1;
          }
        }  
    }

    removeItem(item) {
        // fonction to remove an item from cart
    }

    static getTotalValue() {
        // fonction qui va calculer la somme des articles
        let cart = new Cart;
        let cartArray = cart.getItems();        
        let priceArray = [];
        cartArray.forEach((camera) => {
            priceArray.push(camera.price * camera.cameraCount);            
            let totalSum = priceArray.reduce((a, b) => a + b);
            console.log(totalSum);
            return totalSum;
        });    
    }
    
    static cleanCart(){
        window.localStorage.clear();
        window.location.reload();
    }
}
/*function cartFinalSum(array) {
    let priceArray = [];
    array.forEach((camera) => getPrice(camera, priceArray));
    let cartSum = priceArray.reduce((a, b) => a + b);
    
  }
  
  function getPrice(camera, array) {
    array.push(camera.getFormatedPrice() * camera.cameraCount);
    return array;
  }*/