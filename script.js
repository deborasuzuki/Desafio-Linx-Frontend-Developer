const c = (el) => document.querySelector(el);

let nextPage = '';
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let usersList = [];

async function loadProducts(url_json) {
    let r = await fetch(url_json);
    let json1 = await r.json();
    return json1;
}

function listProducts(url) {
    loadProducts(url).then(json1 => {
        let productsList = json1;
        let products = productsList.products;
        nextPage = productsList.nextPage;
        fillProduct(products);
    });
}
listProducts(url); 

function fillProduct(products) {

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
    listProducts(url);
});


function check(event) {
    // não recarregar após envio do form
    event.preventDefault();
    event.stopPropagation();
   
    //valida form completo
    if (!validateForm()) {
        return;
    }

    //armazena dados do form
    let user = {
        userName: c("#name").value,
        userEmail: c("#email").value,
        userCpf: c("#cpf").value,
        userGender: document.querySelectorAll("input[class^='gender']:checked")[0].value
    };
    usersList.push(user);

    //limpa form
    document.querySelector("form").reset();
    console.log(usersList);
}


function validateForm() {
    let enterName = c("#name");
    if (enterName.value == 0) {
        alert("Informar nome");
        enterName.focus();
        return false;
    }

    let enterEmail = c("#email");
    if (enterEmail.value == 0 || enterEmail.value.indexOf('@') == -1 || enterEmail.value.indexOf('.') == -1) {
        alert("Preencha e-mail corretamente");
        enterEmail.focus();
        return false;
    }

    let enterCpf = c("#cpf");
    if (enterCpf.value == 0 || enterCpf.value.length != 11) {
        alert("CPF inválido");
        enterCpf.focus();
        return false;
    }

    let genderEnter = 0;
    const gender = document.querySelectorAll("input[class^='gender']:checked");
    if (gender.length === 0) {
        alert('Informar Masculino / Feminino');
        return false;
    }

    genderEnter = gender[0].value;

    return true;
}