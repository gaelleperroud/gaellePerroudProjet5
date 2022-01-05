function validateName(input, border) {
  if (/^[a-zA-ZÀ-ÿ\-]*$/.test(input) == false || input == "") {
    document.getElementById(border).style.borderColor = "red";
    return 1;
  } else {
    document.getElementById(border).style.borderColor = "green";
  }
}

function validateMail(input, border) {
  if (/([\w-\.]+@[\w\.]+\.{1}[\w]+)/.test(input) == false) {
    document.getElementById(border).style.borderColor = "red";
    return 1;
  } else {
    document.getElementById(border).style.borderColor = "green";
  }
}

function validateAddress(input, border) {
  if (/^[a-zA-Z0-9À-ÿ\s]*$/.test(input) == false || input == "") {
    document.getElementById(border).style.borderColor = "red";
    return 1;
  } else {
    document.getElementById(border).style.borderColor = "green";
  }
}

export function testForm() {
  let formError = [];
  let lastName = document.getElementById("lastName");
  let firstName = document.getElementById("firstName");
  let email = document.getElementById("email");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  if (validateName(lastName.value, "lastName") == 1) {
    formError.push("Nom de famille invalide.");
  }
  if (validateName(firstName.value, "firstName") == 1) {
    formError.push("Prénom invalide.");
  }
  if (validateMail(email.value, "email") == 1) {
    formError.push("Email invalide.");
  }
  if (validateAddress(address.value, "address") == 1) {
    formError.push("Adresse invalide.");
  }
  if (validateName(city.value, "city") == 1) {
    formError.push("Ville invalide.");
  }
  return formError;
}
