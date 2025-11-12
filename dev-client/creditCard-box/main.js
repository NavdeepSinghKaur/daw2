let box = document.getElementById('text-box');

document.addEventListener('input', (e) => {
    if (e.data >= '0' && e.data <= '9') {
        if (box.value.length > 19) {
            box.value = box.value.substring(0, 19);
        }
        
        let nums = "";
        for (let i = 0; i < box.value.length; i++) {
            if (box.value[i] >= '0' && box.value[i] <= '9') {
                nums += box.value[i];
            }
        }

        let formattedCard = "";
        for (let i = 0; i < nums.length; i++) {
            if (i === 3 && formattedCard || i === 7 || i === 11) {
                formattedCard += nums[i] + '-';
            } else {
                formattedCard += nums[i];
            }
        }

        box.value = formattedCard;
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