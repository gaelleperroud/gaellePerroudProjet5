function displayOrder() {
  let url = new URL(window.location.href);
  let orderId = url.searchParams.get("orderId");
  let name = url.searchParams.get("name");
  let displayName = document.createElement("p");
  displayName.textContent = "Merci " + name + " .";
  let displayOrderId = document.createElement("p");
  displayOrderId.textContent =
    "Votre commande porte le numéro: " + orderId + " .";
  let div = document.getElementById("mainContent");
  div.appendChild(displayName);
  div.appendChild(displayOrderId);
}

displayOrder();
