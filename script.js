const c = (el) => document.querySelector(el);

let productsList = '';
let products = '';
let nextPage = '';
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let json1 = '';
let user = {};
let usersList = [];

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


function check() {

    let = enterName = '';
    let enterEmail = '';
    let enterCpf = '';


    enterName = c("#name");
    if (enterName.value == 0) {
        alert("Informar nome");
        name.focus();
        return;
    }

    enterEmail = c("#email");
    if (enterEmail.value == 0 || enterEmail.value.indexOf('@') == -1 || enterEmail.value.indexOf('.') == -1) {
        alert("Preencha e-mail corretamente");
        email.focus();
        return;
    }

    enterCpf = c("#cpf");
    if (enterCpf.value == 0 || enterCpf.value.length != 11) {
        alert("CPF inválido");
        cpf.focus();
        return;
    }

    let genderEnter = 0;
    function checkGender() {
        const item = document.querySelectorAll("input[class^='gender']:checked");
        if (item.length === 1) {
            genderEnter = item[0].value;
            return genderEnter;
        }
        alert('Informar Masculino / Feminino');
        return false;
    }
    checkGender();


    function usersData () {
   
        user = {
            userName: c("#name").value,
            userEmail: c("#email").value,
            userCpf: c("#cpf").value,
            userGender: genderEnter
        }
    }
    usersData();

    usersList.push(user);

    console.log(usersList);

}


