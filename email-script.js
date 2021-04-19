const c = (el) => document.querySelector(el);

let nextPage = '';
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let usersList = [];

//carrega dados da API e armazena em variável
async function loadProducts(url_json) {
    let r = await fetch(url_json);
    let json1 = await r.json();
    return json1;
}

//isola dados recebidos em variáveis correspondentes
function listProducts(url) {
    loadProducts(url).then(json1 => {
        let productsList = json1;
        let products = productsList.products;
        nextPage = productsList.nextPage;
        fillProduct(products);
    });
}
listProducts(url); 

//preenche dados do produto 
function fillProduct(products) {

    products.map((item, index) => {

        //limitar 2 produtos exibidos
        if (index > 1) {
            return;
        }

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
        c('.grid-2').append(productItem);
    });
}

//comando botão direcionar para página principal
c('#email-showMore').addEventListener('click', () => {
    window.location = "index.html";
});

c('#email-buy').addEventListener('click', () => {
    window.location = "index.html";
});

