let nameVar, local;
let domain;

let form = document.getElementById('register_user');
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

let checkCredentials = () => {
    let email = document.getElementById('email');

    let pass1 = document.getElementById('password1');
    let pass2 = document.getElementById('password2');
    console.log(email.value);

    if (!email.value.includes("@")) {
    } else {
        if (!email.value.split("@")) {
        } else {
            console.log("the email has a @")
            nameVar = email.value.split("@")[0];
            local = email.value.split("@")[1];
            console.log(local.length <= 2)
            if (nameVar.length < 1 || local.length <= 2) {
                console.log("The email has an invalid length");
            } else {
                if (!local.split('.')) {
                    console.log("the email doesn't have a .");
                } else {
                    domain = local.split(".")[1];
                    console.log(domain);
                    if (domain.length < 2) {
                    } else {
                        console.log("The email is valid");
                    }
                }
            }
        } 
    }

    if (pass1 !== pass2) {
        console.log("Passwords should match!");
    }
    // Només comprovo la contrasenya ja que la pass2 ha de ser igual que la pass1
    if (pass1.length < 9 || pass2 < 9) {
        console.log("The length of the passwords should be at least 9 characters");
    } else {

        let upperCaseLetters = 0;
        let numbers = 0;
        let uppercaseChars = "ABCÇDEFGHIJKLMNÑOPQRSTUVWXYZ";

        for (let i = 0; i < pass1.value.length; i++) {
            console.log(isNaN(Number(pass1.value.charAt(i))))
            if (!isNaN(Number(pass1.value.charAt(i)))) {
                numbers += 1;
            } else if (uppercaseChars.includes(pass1.value.charAt(i))) {
                upperCaseLetters += 1;
            }
        }
        console.log(numbers);
        console.log(upperCaseLetters);
    }
    console.log(pass1.value);
    console.log(pass2.value);


}