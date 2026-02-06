let inputBox = document.getElementById('itemToAdd');
let spanBox = document.getElementById('itemList');

function loadItems() {
    spanBox.innerHTML = '';
    let storedItems = localStorage.getItem("products");
    if (storedItems) {
        let formattedItems = JSON.parse(storedItems);
    
        for (item of formattedItems) {
            spanBox.insertAdjacentHTML('beforeend', `<li id="${item[1]}"><p>${item[0]}</p> <button onclick="editElement('${item[1]}')">editar</button> <button onclick="deleteItem('${item[1]}')">borrar</button></li>`);
        }
    }
}

loadItems();

function addItem() {
    let text = inputBox.value;

    let actualItems = localStorage.getItem('products');
    if (actualItems) {
        actualItems = JSON.parse(actualItems); 
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
    for (const item of storedItems) {
        if (item[1] !== itemId) {
            newItems.push(item);
        }
    }
    localStorage.setItem('products', JSON.stringify(newItems));
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
    let newName = prompt("Inserta el nou nom: ",element.textContent);

    element.textContent = newName;

    let storedItems = JSON.parse(localStorage.getItem('products'));
    for (const item of storedItems) {
        if (item[1] === elementId) {
            item[0] = newName;
        }
    }
    localStorage.setItem('products', JSON.stringify(storedItems));
}