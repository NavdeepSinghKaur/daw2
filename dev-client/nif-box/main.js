let span = document.getElementById('span');
let text = document.getElementById('text');

let lastLetter = '';
const letters = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

document.addEventListener('input', () => {
    span.textContent = ''; 

    if (text.value.length < 8 && !(text.value.substring(text.value.length-1, text.value.length) >= 0)) {
        text.value = text.value.substring(0, text.value.length -1);
    }

    if (text.value.length === 8) { lastLetter = letters[Number(text.value) % 23]; }

    if (text.value.length === 9) {
        text.value = text.value.substring(0, 8) + (text.value.substring(8, 9)).toUpperCase();
        if (lastLetter != text.value.substring(8, 9)) {
            text.value = text.value.substring(0, 8);
            span.textContent = 'La lletra introduïda és incorrecta per als dígits especificats.';
        } else {
            span.textContent = 'Document vàlid.';
        }
    }
    
    else if (text.value.length > 9) { text.value = text.value.substring(0, 9); }
})