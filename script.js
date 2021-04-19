const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

let nextPage = '';
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let usersList = [];
let friendList = [];

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

//comando botão carregar mais produtos
c('#showMore').addEventListener('click', () => {
    url = `https://${nextPage}`;
    listProducts(url);
});

//comando botão comprar
function buy() {
    alert("Preencha o cadastro para continuar");
}

//comando botão enviar cadastro
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

//verifica preenchimento correto dos campos do cadastro
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

function sendFriend (event) {
    // não recarregar após envio do form
    event.preventDefault();
    event.stopPropagation();

    //valida form completo
    if (!validateFriend()) {
        return;
    }

    //armazena dados do form
    let friend = {
        friendName: c("#friendName").value,
        userEmail: c("#friendEmail").value,
    };
    friendList.push(friend);

    //limpa form
    document.querySelector("form").reset();
    console.log(friendList);

    //abre página newsletter
    window.location = "index-email.html";
}

//verifica preenchimento correto dos campos do cadastro newsletter
function validateFriend () {
    let friendName = c("#friendName");
    if (friendName.value == 0) {
        alert("Informar nome do seu amigo");
        friendName.focus();
        return false;
    }

    let friendEmail = c("#friendEmail");
    if (friendEmail.value == 0 || friendEmail.value.indexOf('@') == -1 || friendEmail.value.indexOf('.') == -1) {
        alert("Preencha e-mail do amigo corretamente");
        friendEmail.focus();
        return false;
    }

    if (usersList == 0) {
        alert("Preencha cadastro!");
        return false;
    }

    return true;
}
