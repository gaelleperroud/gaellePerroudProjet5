export function validateName(input, field){
    let nameRegex = /^[a-zA-ZÀ-ÿ\-]*$/;
    let result = nameRegex.test(input);
    if (result == false){
        field.style.borderColor = "red";
        return false;
    } else {
        field.style.borderColor = "green";
        console.log("trueName");
        return true;
    }
}

export function validateMail(input, field){
    let mailRegex = /([\w-\.]+@[\w\.]+\.{1}[\w]+)/;
    let result = mailRegex.test(input);
    if (result == false){
        field.style.borderColor = "red";
        return false;
    } else {
        field.style.borderColor = "green";
        console.log("trueMail");
        return true;
    }
}

export function validateAddress(input, field){
    let addressRegex = /^[a-zA-Z0-9À-ÿ\s]*$/;
    let result = addressRegex.test(input);
    if (result == false){
        field.style.borderColor = "red";
        return false;
    } else {
        field.style.borderColor = "green";
        console.log("trueAddress");
        return true;
    }
}
















