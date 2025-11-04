let box = document.getElementById('text-box');
userInputs = 0;
document.addEventListener('keyup', (e) => {
    
    if(e.key === 'Backspace') {
        userInput--;
    }
    // if (box.value.length < 19) {
    //     if (Number(e.key) >= 0 && Number(e.key) <= 9 && e.key !== ' ') userInput++;

    //     else box.value = box.value.substring(0, box.value.length -1);

    //     // if (userInput%4 == 0 && userInput > 0 && userInput < 16) box.value += '-';
    // } else 
    //     box.value = box.value.substring(0, 19);
    
    if (userInputs > 15) {
        box.value = box.value.substring(0, 19);
    } 
    else {
        if (Number(e.key) >= 0 && Number(e.key) <= 9 && e.key !== ' ') {
            userInputs++;
        }
        if (!(Number(e.key) >= 0 && Number(e.key) <= 9 && e.key !== ' ')) {
            box.value = box.value.substring(0, box.value.length -1);
        } else if (userInputs%4 === 0 && userInputs > 0 && userInputs < 15) {
            box.value += '-';
        }
    }
});