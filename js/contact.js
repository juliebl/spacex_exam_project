const form = document.querySelector("#contactForm");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
let nameHasError = false;

const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
let lastNameHasError = false;

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
let messageHasError = false;

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
let emailHasError = false;

const submitMessage = document.querySelector("#submitMessage");
const submitButton = document.querySelector(".button");
form.addEventListener("submit", validateForm);

function validateForm() {
    event.preventDefault();

    const nameValue = name.value;
    if (validateLength(nameValue, 2) === true) {
        nameError.style.display = "none";
        nameHasError = false;
    } else {
        nameError.style.display = "inline-block";
        nameHasError = true;
    }

    const lastNameValue = lastName.value;
    if (validateLength(lastNameValue, 2) === true) {
        lastNameError.style.display = "none";
        lastNameHasError = false;
    } else {
        lastNameError.style.display = "inline-block";
        lastNameHasError = true;
    }

    const messageValue = message.value;
    if (validateLength(messageValue, 10) === true) {
        messageError.style.display = "none";
        messageHasError = false;
    } else {
        messageError.style.display = "inline-block";
        messageHasError = true;
    }

    const emailValue = email.value;
    if (validateEmail(emailValue)) {
        emailError.style.display = "none";
        emailHasError = false;
    } else {
        emailError.style.display = "inline-block";
        emailHasError = true;
    }

    if (nameHasError === true || lastNameHasError === true || messageHasError === true || emailHasError === true) {
        submitMessage.innerHTML = "Please check that your information is correct";
        submitMessage.style.display = "inline-block";
    } else {
        submitMessage.style.display = "none";
        submitButton.innerHTML = `Message sent <i class="
        fas fa-check message-sent-icon"></i>`;
        submitButton.style.color = "rgb(0, 122, 61)";
    }
}

function validateLength(value, lengthToCheck) {
    const trimmedValue = value.trim();

    if (trimmedValue.length >= lengthToCheck) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(emailValue) {
    const regEx = /\S+@\S+\.\S+/;

    if (regEx.test(emailValue)) {
        return true;
    } else {
        return false;
    }
}