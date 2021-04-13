let productsList = [];

async function loadProducts() {

    const url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1';

    const r = await fetch(url);
    const json = await r.json();

    productsList.push(json);

}
loadProducts();

