/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины.
Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

product = ['name', 100, 2];
cart = [];
prodNum = 5;

function generateProduct() {
    product = [];
    len = Math.round(Math.random() * 10) + 2;
    name = '';
    for (var i = 0; i < len; i++) {
        name += String.fromCharCode(Math.round(Math.random() * 26) + 96);
    }
    product.push(name);
    product.push(Math.round(Math.random() * 100));
    product.push(Math.round(Math.random() * 3) + 1);
    return product;
}

function generateCart(prodNum) {
    cart = [];
    for (var i = 0; i < prodNum; i++) {
        cart.push(generateProduct());
    }
    return cart;
}

function countBasketPrice(cart) {
    sum = 0;
    for (var prod of cart) {
        sum += prod[1] * prod[2];
    }
    return sum;
}

function getCartElems(cart) {
    res = '';
    for (prod of cart) {
        res += prod[0] + ' ' + prod[1] + ' ' + prod[2] + '\n';
    }
    return res;
}

cart = generateCart(prodNum);

alert(getCartElems(cart) + '\nTotal price: ' + countBasketPrice(cart));