class Camera{            //Création de la classe Camera avec un constructeur
    constructor(_id, name, description, imageUrl, price, lenses){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.lenses = lenses;   
    }    
};
export {Camera};