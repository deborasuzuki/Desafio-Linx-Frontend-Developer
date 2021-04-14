const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

let productsList = null;
let products = null;

async function loadProducts() {
    const url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1';
    const r = await fetch(url);
    const json = await r.json();
    return json;
}

loadProducts().then(json => {
    productsList = json;
    products = productsList.products;
    fillProduct();
});

function fillProduct() {

    /*console.log(products)*/

    products.map((item, index) => {

        let productItem = c('.models .product-item').cloneNode(true);

        //identificar produto
        productItem.setAttribute('data-key', index);

        //preencher as informações em productItem
        productItem.querySelector('.products-item--img img').src = item.image;
        productItem.querySelector('.products-item--name').innerHTML = item.name;
        productItem.querySelector('.products-item--description').innerHTML = item.description;
        productItem.querySelector('.products-item--oldPrice').innerHTML = `De: R$${item.oldPrice.toFixed(2)}`;
        productItem.querySelector('.products-item--price').innerHTML = `Por: R$${item.price.toFixed(2)}`;
        productItem.querySelector('.products-item--installments').innerHTML = `ou ${item.installments.count}x de R$${item.installments.value.toFixed(2)}`;

        c('.grid-1').append(productItem);
    });
}


