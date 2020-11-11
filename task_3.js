/*
3.Продолжить работу с интернет-магазином:
3.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
3.2. Реализуйте такие объекты.
3.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/

"use strict";

/**
 * Реализация в псевдо ООП. Описали сущность корзины.
 * @type {{goods: *[], countBasketPrice(): *}}
 */
const Basket = {
    goods: [
        {
            id_product: 123,
            product_name: "Ноутбук",
            price: 45600,
            quantity: 1
        },
        {
            id_product: 456,
            product_name: "Мышка",
            price: 1000,
            quantity: 2
        }
    ],
    countBasketPrice() {
        return this.goods.reduce((totalPrice, cartItem) => totalPrice += cartItem.price * cartItem.quantity, 0);
    }
};

console.log(Basket.countBasketPrice());