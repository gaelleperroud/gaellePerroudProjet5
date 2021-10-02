const url = "http://localhost:3000/api/cameras";
let cameraArray = [];

function getItems(){
    fetch (url)
    .then ((res) => {
        console.log(res);
        return res.json();
    })
    .then ((value) => {
     for(let camera of value)
     cameraArray.push(camera);
     return cameraArray; 
    })
    .catch (function(err){
        console.log(err);
    });
};

class Camera{            //Création de la classe Camera
    constructor(_id, name, description, imageUrl, price, lenses){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.lenses = lenses;
        this.imageUrl = imageUrl;
    }
}

function cameraCard(){    
}

getItems();
console.log(cameraArray);

