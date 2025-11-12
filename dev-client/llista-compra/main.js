let inputBox = document.getElementById('itemToAdd');
let spanBox = document.getElementById('itemList');

loadItems();

function loadItems() {
    spanBox.innerHTML = '';
    let storedItems = localStorage.getItem("products");
    if (storedItems) {
        let formattedItems = JSON.parse(storedItems);
        console.log(formattedItems);
        for (item of formattedItems) {
            spanBox.insertAdjacentHTML('beforeend', `<li id="${item[1]}"><p>${item[0]}</p> <button onclick="editElement('${item[1]}')">editar</button> <button onclick="deleteItem('${item[1]}')">borrar</button></li>`); // change the arguments later (automatize)
        }
    }
}

function addItem() {
    let text = inputBox.value;
    console.log(inputBox.value);
    // spanBox.insertAdjacentHTML('beforeend', `<li id="${item[1]}"><p>${item[0]}</p> <button onclick="editElement('${item[1]}')">editar</button> <button onclick="deleteItem('${item[1]}')">borrar</button></li>`); // change the arguments later (automatize)
    let actualItems = localStorage.getItem('products');
    if (actualItems) {
        actualItems = JSON.parse(actualItems); // error here
        actualItems.push([text, generateRanodmId()]);
        localStorage.setItem('products', JSON.stringify(actualItems));
    } else {
        localStorage.setItem('products', JSON.stringify([[text, generateRanodmId()]]));
    }
    loadItems();
}

function deleteItem(itemId) {
    let element = document.getElementById(itemId);
    element.remove();
    let storedItems = JSON.parse(localStorage.getItem('products'));
    let newItems = [];
    // console.log(storedItems);
    for (const item of storedItems) {
        if (item[1] !== itemId) {
            // console.log(item)
            newItems.push(item);
        }
    }
    localStorage.setItem('products', JSON.stringify(newItems));
    // console.log(newItems);
    // element.outerHTML = '';
}

function generateRanodmId() {
    let letters = "ABCDEFGHIJ"
    let randomId = "";
    for (let i = 0; i < 12; i++) {
        let randomNumber = Math.random() * 10;
        randomId += letters.charAt(randomNumber);
    }
    
    return randomId;
}

function editElement(elementId) {
    let element = document.getElementById(elementId).firstChild;
    console.log(element)
    console.log(elementId);
    let newName = prompt("Inserta el nou nom: ",element.textContent);
    console.log(newName);
    element.textContent = newName;

    let storedItems = JSON.parse(localStorage.getItem('products'));
    let newItems = [];
    // console.log(storedItems);
    for (const item of storedItems) {
        if (item[1] === elementId) {
            // console.log(item)
            item[0] = newName;
        }
    }
    localStorage.setItem('products', JSON.stringify(storedItems));
}