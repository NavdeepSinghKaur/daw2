document.addEventListener('DOMContentLoaded', () => {
    let products = handleLocalStorage(true);
    showProducts();
    let elementDraggedId = 0;

    const button = document.getElementById('add');

    button.addEventListener('click', (e) => {
        const product = document.getElementById('product');
        const units = document.getElementById('units');

        if (product.value !== '' && units.value !== '') {
            const newProduct = {
                id: parseInt(Math.random()*100000),
                productName: product.value,
                units: units.value,
                bought: false
            };
    
            products.push(newProduct);
    
            product.value = '';
            units.value = '';
            showProducts();
            handleLocalStorage(false);
        }
        console.log(products);
    });

    function showProducts() {
        const ul = document.getElementById('list');
        ul.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.className = 'product' + (product.bought ? ' bought' : '');
            li.id = product.id;
            li.draggable = true;

            const box = document.createElement('input');
            box.type = 'checkbox';
            box.checked = product.bought;
            box.addEventListener('change', () => changeBought(product.id));

            const productText = document.createElement('span');
            productText.className = 'product-text';
            productText.textContent = product.productName;

            const qtySpan = document.createElement('span');
            qtySpan.className = 'product-qty';
            qtySpan.textContent = product.units;

            li.appendChild(box);
            li.appendChild(productText);
            li.appendChild(qtySpan);
            ul.appendChild(li);

            console.log(product.id);
            dragDropAlgorithm(li, product.id);
        })
    }

    function changeBought(id) {
        let product = products.find((product) => product.id === id);
        product.bought = !product.bought;
        handleLocalStorage(false);
        showProducts();
    }

    function handleLocalStorage(isGet) {
        if (isGet) {
            let products = localStorage.getItem('products');
            products = products ? JSON.parse(products) : [];
            console.log(products);
            return products;
        } else {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    function dragDropAlgorithm(li, productId) {
        li.addEventListener('dragstart', (e) => {
            console.log(productId);
            elementDraggedId = productId;
            e.dataTransfer.setData('text/plain', productId);
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => li.classList.add('dragging'), 0)
        });

        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });

        li.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (productId !== elementDraggedId) {
                li.classList.add('dragged');
            }
        });

        li.addEventListener('dragleave', () => {
            li.classList.remove('dragged')
        });

        li.addEventListener('drop', (e) => {
            e.preventDefault();
            li.classList.remove('dragged');

            if (productId !== elementDraggedId) {
                let productToMove = [];
                let movedProduct = [];

                products.forEach((product, i) => {
                    if (product.id == elementDraggedId) {
                        movedProduct.push(product, i);
                    }
                    if (product.id == productId) {
                        productToMove.push(product, i);
                    }
                });
                // console.log(productToMove);
                // console.log(movedProduct);
                products[productToMove[1]] = movedProduct[0];
                products[movedProduct[1]] = productToMove[0];
                handleLocalStorage(false);
                showProducts();
            }
        })
    }

    const bin = document.getElementById('bin');

    bin.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        bin.classList.add('dragged');
    });

    bin.addEventListener('dragleave', (e) => {
        e.preventDefault();
        bin.classList.remove('dragged');
    });

    bin.addEventListener('drop', (e) => {
        e.preventDefault();
        bin.classList.remove('dragged');

        let idx = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == elementDraggedId) {
                idx = i;
            }
        }
        products.splice(idx, 1);
        handleLocalStorage(false);
        showProducts();
    })
})