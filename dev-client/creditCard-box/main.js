let box = document.getElementById('text-box');

let letterHasIterated = [];

document.addEventListener('input', (e) => {
    if (e.data >= '0' && e.data <= '9') {
        if (box.value.length <= 19) {
            for (let index = 0; index < box.value.length; index++) {
                console.log(index)
                if (index === 4 && box.value[4] !== '-') {
                    console.log(box.value[4]);
                    box.value = box.value.substring(0, 4) + '-' + box.value.substring(4);
                    // box.value[index] += '-'
                } else if (index === 9 && box.value[9] !== '-') {
                    console.log(box.value[10])
                    box.value = box.value.substring(0, 9) + '-' + box.value.substring(9);
                } else if (index === 14 && box.value[14] !== '-') {
                    box.value = box.value.substring(0, 14) + '-' + box.value.substring(14);
                }
            }
        } else {
            box.value = box.value.substring(0, 19)
        }
    } else {
        let boxValues = box.value.split("");
        let filteredValues = ""
        boxValues.forEach(value => {
            if (value >= 0 && value <= 9) {
                filteredValues += value;
            } else if (value === '-') {
                filteredValues += value;
            }
        });
        box.value = filteredValues;
    }
});