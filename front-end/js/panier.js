function displayStorage(){
    if(localStorage.length === 0){
        let p = document.createElement("p");
        p.textContent = "Il n'y a actuellement aucun article dans votre panier.";
        let panier = document.getElementById("panier");
        panier.appendChild(p);
        let form = document.getElementById("formulaire");
        form.style.display = "none";
    }
    else{
        let storage = JSON.parse(window.localStorage.getItem("camera"));
        for (let camera of storage) {
            displayCart(camera);    
        }
        cleanCart();
    }
}

function displayCart(camera){
    let title = document.createElement("h3");       
    title.innerHTML = camera.cameraName;  
    let price = document.createElement("p");
    price.textContent = camera.cameraPrice / 100 + " €";
    let qty = document.createElement("p");
    qty.textContent = "quantité : " + camera.cameraCount;
    let totalPriceForDifferentItem = (camera.cameraPrice /100) * camera.cameraCount;
    let totalPrice = document.createElement("p");
    totalPrice.textContent = "Prix total : " + totalPriceForDifferentItem + " €";
    let lense = document.createElement("p");
    lense.textContent = "lentille personnalisée : " + camera.cameraLense;
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("row"); 
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(qty);
    card.appendChild(addButton);
    card.appendChild(lense);
    card.appendChild(totalPrice);
    const div = document.getElementById("panier");  
    div.appendChild(card);
    return totalPriceForDifferentItem;
}


function cleanCart(){
    let div = document.createElement("div");
    let tool = document.getElementById("cartTools");
    tool.appendChild(div);
    let cleanButton = document.createElement("button");
    cleanButton.textContent = "Vider le panier";
    div.appendChild(cleanButton);
    cleanButton.classList.add("bg-primary");
    cleanButton.addEventListener("click", function(){
        window.localStorage.clear();
        window.location.reload();
    });
}

displayStorage();



