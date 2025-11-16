let resultBox = document.getElementById('result');
let form = document.getElementById('register_user');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultBox.innerHTML = '';
    let isValidMail = false;
    let isValidPassword = true;
    let email = document.getElementById('email');

    let pass1 = document.getElementById('password1');
    let pass2 = document.getElementById('password2');
    console.log(email.value);
    
    if (email.value.includes("@")) {
        let nameVar = email.value.split("@")[0];
        let mailName = email.value.split("@")[1];

        if (
            nameVar.length >= 1 
            && mailName.length >= 2 
            && mailName.includes('.')
        ) {
            let domain = mailName.split(".")[1];
            if (domain.length >= 2) {
                isValidMail = true
            }
        }
    }

    if (!isValidMail) {
        resultBox.insertAdjacentHTML('beforeend', '<p style="color:red">Correu amb format invàlid</p>')
    }
    
    let upperCaseLetters = 0;
    let numbers = 0;
    
    for (let i of pass1.value) {
        if (i >= '0' && i<= '9') { numbers += 1; }
        else if (i >= 'A' && i <= 'Z') { upperCaseLetters += 1; }
    }
    
    if (numbers < 1 ) {
        isValidPassword = false;
        resultBox.insertAdjacentHTML('beforeend', '<p style="color:red">El password ha de contenir mínim 1 número</p>');
    }
    if (upperCaseLetters < 2) {
        isValidPassword = false;
        resultBox.insertAdjacentHTML('beforeend', '<p style="color:red">El password ha de contenir mínim 2 majúscules</p>');
    }
    if (pass1.value.length < 9 || pass2.value.length < 9 ) {
        isValidPassword = false;
        resultBox.insertAdjacentHTML('beforeend', '<p style="color:red">Longitud mínima del password 9</p>');
    }
    if (pass1.value != pass2.value || pass2.value.length !== pass1.value.length) {
        isValidPassword = false;
        resultBox.insertAdjacentHTML('beforeend', '<p style="color:red">Password 1 i 2 no coincideixen</p>');

    }
    if (isValidMail && isValidPassword) {
        resultBox.insertAdjacentHTML('beforeend', '<p style="color: green">Dades de registre correctes</p>')
    }
});