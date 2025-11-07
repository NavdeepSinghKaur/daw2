let inputBox = document.getElementById('itemToAdd');
let spanBox = document.getElementById('itemList');

function addItem() {

    let text = inputBox.value;


    console.log(inputBox.value);
    spanBox.innerHTML += '<li>' + text + ' <button onclick="delete(1)">editar</button> <button onclick="">borrar</button>' + '</li>'; // change the arguments later (automatize)
    let actualItems = localStorage.getItem('products');
    if (actualItems) {
        actualItems = JSON.parse(actualItems); // error here
        actualItems.push(text);
        localStorage.setItem('actualItems');
    } else {
        
        localStorage.setItem('products', text);
    }
}