const form = document.querySelector(".form");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const validateUsername = () => {
    const usernameValue = username.value.trim();

    if(usernameValue === ''){
       displayError(username, "required")
    }
    else if(usernameValue.length > 10){
        displayError(username, "username should be less than 10 characters")
    }
    else{
        displaySuccess(username)
    }
}

const validateEmail = () => {
    const emailValue = email.value.trim();

    if(emailValue === ''){
        displayError(email, "required")
    }
    else if(!isEmailValid(emailValue)){
        displayError(email, "email must be valid")
    }
    else{
        displaySuccess(email)
    }
}

const validatePassword = () => {
    const passwordValue = password.value.trim();

    if(passwordValue === ''){
        displayError(password, "required")
    } 
    else if(!isPasswordValid(passwordValue)){
        displayError(password, "Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
    }
    else{
        displaySuccess(password)
    }
}

const validateConfirmPassword = () => {
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if(confirmPasswordValue === ''){
        displayError(confirmPassword, "required")
    } 
    else if(passwordValue !== confirmPasswordValue){
        displayError(confirmPassword, "both passwords must be the same")
    }
    else if(!isPasswordValid(confirmPasswordValue)){
        displayError(confirmPassword, "Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
    }
    else{
        displaySuccess(confirmPassword)
    }
}

const isEmailValid = (email) => {
    const regexForEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexForEmail.test(email)
}
const isPasswordValid = (password) => {
    const regexForPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/;
    return regexForPassword.test(password)
}

const displayError = (input, message) => {
    const formField = input.parentElement.parentElement;
    const errorMessage = formField.querySelector(".error-message")

    errorMessage.innerText = message;
    formField.className = "form-field error"
}

const displaySuccess = (input) => {
    const formField = input.parentElement.parentElement;
    formField.className = "form-field success"
}

form.addEventListener("submit", (e) => {
e.preventDefault();
validateUsername();
validateEmail();
validatePassword();
validateConfirmPassword();

})

username.addEventListener("focusout", () => validateUsername())
email.addEventListener("focusout", () => validateEmail())
password.addEventListener("focusout", () => validatePassword())
confirmPassword.addEventListener("focusout", () => validateConfirmPassword())

const showPasswordIcons = document.querySelectorAll(".bi-eye-slash-fill");
const hidePasswordIcons = document.querySelectorAll(".bi-eye-fill");

showPasswordIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        password.type="text";
        confirmPassword.type="text";
        password.parentElement.classList.add("visible");
        confirmPassword.parentElement.classList.add("visible");
    })
})

hidePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        password.type="password";
        confirmPassword.type="password";
        password.parentElement.classList.remove("visible");
        confirmPassword.parentElement.classList.remove("visible");
    })
})