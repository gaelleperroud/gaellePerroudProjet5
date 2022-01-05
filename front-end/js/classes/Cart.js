export class Cart {
  instance = null;

  constructor() {
    this.items = JSON.parse(window.localStorage.getItem("camera"));
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Cart();
    }
    return this.instance;
  }

  getItems() {
    return this.items;
  }

  //--------renvoie le prix formaté correctement (ici en enlevant les deux derniers 0)---
  formatedPrice(data) {
    return data / 100;
  }

  //---------envoie les artiles dans le local storage----
  update(data) {
    let jsonToStorage = JSON.stringify(data);
    window.localStorage.setItem("camera", jsonToStorage);
  }

  //---fonction qui va ajouter un article au panier--------
  addItem(item) {
    let newArticle = true;
    let cartArray = this.getItems();

    for (let camera of cartArray) {
      if (item._id === camera._id && item.lense === camera.lense) {
        camera.cameraCount++;
        this.update(cartArray);
        newArticle = false;
      }
    }

    if (newArticle) {
      cartArray.push(item);
      this.update(cartArray);
    }
  }

  // ----fonction qui va enlever un article du panier-----------
  removeItem(item, array) {
    if (item.cameraCount == 1) {
      let index = array.indexOf(item);
      if (index > -1 && array.length > 1) {
        array.splice(index, 1);
        this.update(array);
        window.location.reload();
      } else if (index > -1 && array.length == 1) {
        window.localStorage.clear();
        window.location.reload();
      }
    } else {
      item.cameraCount--;
      this.update(array);
    }
  }

  //------ fonction qui va calculer la somme des articles------------
  getTotalValue() {
    let cartArray = this.getItems();
    let priceArray = [];
    cartArray.forEach((camera) => {
      priceArray.push(camera.price * camera.cameraCount);
    });
    let totalSum = priceArray.reduce((a, b) => a + b);
    let formatedSum = this.formatedPrice(totalSum);
    return formatedSum;
  }

  //fonction qui va vider le panier
  cleanCart() {
    window.localStorage.clear();
    window.location.reload();
  }
}
