// La récupération des éléments 
const form = document.querySelector("#form");
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const submitBtn = document.querySelector('#submitBtn');

const usernameField = document.querySelector('#usernameField');
const emailField = document.querySelector('#emailField');
const passwordField = document.querySelector('#passwordField');
const password2Field = document.querySelector('#password2Field');

// Masquer les champs au départ
emailField.classList.add('hidden');
passwordField.classList.add('hidden');
password2Field.classList.add('hidden');
submitBtn.classList.add('hidden');
submitBtn.disabled = true;

// Événements
username.addEventListener('input', () => validateField(username, emailField, username_verify));
email.addEventListener('input', () => validateField(email, passwordField, email_verify));
password.addEventListener('input', () => validateField(password, password2Field, password_verify));
password2.addEventListener('input', () => validateField(password2, submitBtn, password2_verify));

form.addEventListener('submit', e => {
    e.preventDefault();
    if (form_verify()) {
        showSuccessMessage();
    }
});

function validateField(field, nextField, validationFunc) {
    if (validationFunc(field.value.trim())) {
        setSuccess(field);
        if (nextField) {
            nextField.classList.remove('hidden');
        }
    } else {
        setError(field, "Invalid value");
        if (nextField) {
            nextField.classList.add('hidden');
        }
    }
    toggleSubmitButton();
}

// Fonctions
function form_verify() {
    const userValue = username.value.trim();
    const emailValue = email.value.trim();
    const pwdValue = password.value.trim();
    const pwd2Value = password2.value.trim();
    let isValid = true;

    if (userValue === "") {
        let message = "Username ne peut pas être vide";
        setError(username, message);
        isValid = false;
    } else if (!userValue.match(/^[a-zA-Z]/)) {
        let message = "Username doit commencer par une lettre";
        setError(username, message);
        isValid = false;
    } else {
        let letterNum = userValue.length;
        if (letterNum < 3 || letterNum > 15) {
            let message = "Username doit etre comprise entre 3 - 15 caractères";
            setError(username, message);
            isValid = false;
        } else {
            setSuccess(username);
        }
    }

    if (emailValue === "") {
        let message = "Email ne peut pas être vide";
        setError(email, message);
        isValid = false;
    } else if (!email_verify(emailValue)) {
        let message = "Email non valide";
        setError(email, message);
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (pwdValue === "") {
        let message = "Le passeword ne peut pas être vide";
        setError(password, message);
        isValid = false;
    } else if (!password_verify(pwdValue)) {
        let message = "le mot de passe doit contenire au minimum 8 caractéres";
        setError(password, message);
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (pwd2Value === "") {
        let message = "Le passeword confirm ne peut pas être vide";
        setError(password2, message);
        isValid = false;
    } else if (pwdValue !== pwd2Value) {
        let message = "Les mot de passes ne correspondent pas";
        setError(password2, message);
        isValid = false;
    } else {
        setSuccess(password2);
    }
    return isValid;
}

function setError(elem, message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = "form-control error";
}

function setSuccess(elem) {
    const formControl = elem.parentElement;
    formControl.className = 'form-control success';
}

function username_verify(username) {
    return /^[a-zA-Z][a-zA-Z0-9]{2,14}$/.test(username);
}

function email_verify(email) {
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

function password_verify(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(password);
}

function password2_verify(password2) {
    return password2 === password.value.trim();
}
function toggleSubmitButton() {
    if (username.parentElement.classList.contains('success') &&
        email.parentElement.classList.contains('success') &&
        password.parentElement.classList.contains('success') &&
        password2.parentElement.classList.contains('success')) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
function showSuccessMessage() {
    form.style.display = 'none';
    const alertBox = document.createElement('div');
    alertBox.className = 'alert alert-success';
    alertBox.role = 'alert';
    alertBox.innerText = 'Toutes les données sont valides !';

    document.body.appendChild(alertBox);
}
