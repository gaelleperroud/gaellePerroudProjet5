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
    

     // fonction qui ajoute un article dans le panier
    static addItem(item) {         
        let cart = new Cart;
        let cartArray = cart.getItems()
        cartArray.push(item); 
        Cart.initCart(cartArray);    
    }

    //fonction qui verifie si les deux articles sont identiques et ajoute une quantité
    static addSameItem(item) {
        let cart = new Cart;
        let cartArray = cart.getItems()
        for (let camera of cartArray) {
          if (  //on va faire une boucle avec le tableau d'article et verifier si 
            item._id === camera._id &&   //l'id et la lentille sont identiques
            item.lense === camera.lense
          ) {
            Cart.addQuantity(camera, cartArray)
            return 1;
          }
        }  
    }

    static addQuantity(item, array){
        item.cameraCount++;
        Cart.initCart(array);
    }

    static removeQuantity(item, array){
        item.cameraCount--;
        Cart.initCart(array);
    }

    // ----fonction qui va enlever une quantité du panier
    static removeItem(item, array) {
        if (item.cameraCount == 1) {
            let index = array.indexOf(item);
            if (index > -1 && array.length > 1) {
              array.splice(index, 1);
              Cart.initCart(array);
              window.location.reload();
            } else if (index > -1 && array.length == 1) {
              window.localStorage.clear();
              window.location.reload();
            }
          } else {
            Cart.removeQuantity(item, array);}
    }

    //------ fonction qui va calculer la somme des articles    
    static getTotalValue() {
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
    
    //fonction qui va vider le panier
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