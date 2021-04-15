const c = (el) => document.querySelector(el);

let productsList = '';
let products = '';
let nextPage = '';
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let json1 = '';

async function loadProducts() {
    let r = await fetch(url);
    json1 = await r.json();
    return json1;
}

function listProducts() {
loadProducts().then(json1 => {
    productsList = json1;
    products = productsList.products;
    nextPage = productsList.nextPage;
    fillProduct();
});
}
listProducts(); 

function fillProduct() {

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

        //exibir produtos no grid
        c('.grid-1').append(productItem);
    });
}

c('#showMore').addEventListener('click', () => {
    url = `https://${nextPage}`;
    listProducts();
});
