let span = document.getElementById('span');

let text = document.getElementById('text');

let lastLetter = '';
const letters = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
const strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñ";
let previousLength = 0;
document.addEventListener('keyup', (e) => {
    previousLength = text.value.length;
    // do a mapping of the key
    if (text.value.length < 8 && (text.value.length !== previousLength)) {
        text.value = text.value.substring(0, text.value.length -1);
    }
    if (text.value.length === 8) {
        lastLetter = e.value;
        let res = Number(text.value) % 23;
        console.log(res);
        console.log(letters[res]);
        lastLetter = letters[res];
    } 
    if (text.value.length === 9) {
        text.value.substring(8, 9);
        text.value = text.value.substring(0, 8) + (text.value.substring(8, 9)).toUpperCase(); 
        if (lastLetter != text.value.substring(8, 9)) {
            text.value = text.value.substring(0, 8);
            span.innerText = 'La lletra introduïda és incorrecta per als dígits especificats.';
        } else {
            document.getElementById('span').innerText = '';
        }
        // if (lastLetter !== text.value.charAt(-1))
    }
    else if (text.value.length > 9) {
        text.value = text.value.substring(0, 9);
    }
})

