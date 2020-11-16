const shopPage = document.getElementById('shop_page');
shopPage.classList.add('hidden');

class Product {
    constructor(name, price, imgPath, desc, num) {
        var that = this;
        that.name = name;
        that.price = price;
        that.id = num;

        that.prodDivMain = document.createElement('div');
        that.prodDivMain.classList.add('card', 'mb-3', 'shop_item');
        that.prodDivMain.style['max-width'] = '540px;';

        that.prodDivRow = document.createElement('div');
        that.prodDivRow.classList.add('row', 'no-gutters');
        that.prodDivMain.appendChild(that.prodDivRow);

        that.prodDivImg = document.createElement('div');
        that.prodDivImg.classList.add('col-md-4');
        that.prodDivRow.appendChild(that.prodDivImg);

        that.prodImg = document.createElement('img');
        that.prodImg.setAttribute('src', imgPath);
        that.prodImg.setAttribute('alt', name);
        that.prodImg.classList.add('card-img');
        that.prodDivImg.appendChild(that.prodImg);

        that.prodDivCol = document.createElement('div');
        that.prodDivCol.classList.add('col-md-8');
        that.prodDivRow.appendChild(that.prodDivCol);

        that.prodDivBody = document.createElement('div');
        that.prodDivBody.classList.add('card-body');
        that.prodDivCol.appendChild(that.prodDivBody);

        that.prodBodyH5 = document.createElement('h5');
        that.prodBodyH5.classList.add('card-title');
        that.prodBodyH5.textContent = name;
        that.prodDivBody.appendChild(that.prodBodyH5);

        that.prodBodyText = document.createElement('p');
        that.prodBodyText.classList.add('card-text');
        that.prodBodyText.textContent = desc;
        that.prodDivBody.appendChild(that.prodBodyText);

        that.prodBodyText = document.createElement('p');
        that.prodBodyText.classList.add('card-text');
        that.prodBodyText.textContent = 'Цена: ' + price + ' руб.';
        that.prodDivBody.appendChild(that.prodBodyText);

        that.prodBodyBtn = document.createElement('a');
        that.prodBodyBtn.classList.add('btn', 'btn-primary', 'btn-sm');
        that.prodBodyBtn.setAttribute('href', '#');
        that.prodBodyBtn.setAttribute('role', 'button');
        that.prodBodyBtn.setAttribute('id', `shop_itm_${num}`);
        that.prodBodyBtn.textContent = 'Добавить в корзину';
        that.prodDivBody.appendChild(that.prodBodyBtn);
    }
}

var prodList = [];
const desc1 = 'Если вам необходимо стандартное устройство, которое отлично справляется со своими функциями, то прекрасным решением является проводная оптическая мышь LOGITECH B100. Она отлично подойдет для оснащения офиса или учебного класса. Классическая форма делает ее удобной в работе, к тому же присутствует возможность управления правой и левой рукой. Проводная оптическая мышь LOGITECH B100 подключается к компьютеру через разъем USB, который можно найти в любом современном устройстве. Длина провода составляет 1,8 метра, что дает большое пространство для свободы движения. Чувствительность устройства на отличном уровне обеспечивается оптическим сенсором с разрешением в 800 dpi.'
const desc2 = 'Теперь клавиатура Magic Keyboard с цифровой панелью доступна в цвете «серый космос». Вы оцените её расширенную раскладку с дополнительными клавишами навигации для быстрой прокрутки документов и полноразмерными клавишами-стрелками для игр. Механизм «ножницы» повышает стабильность клавиш, а низкий профиль и оптимизированный ход обеспечивают точный и удобный ввод текста.'
const desc3 = 'Our thinnest LCD display yet. 6.3 mm at its thinnest point. has a sleek design thats easy on the eyes. And the crisp, vibrant view from almost any angle comes at an ultra-affordable price.';
prodList.push(new Product('mouse', 500, 'img/mouse.jpg', desc1, 1));
prodList.push(new Product('keyboard', 1000, 'img/keybrd.jpg', desc2, 2));
prodList.push(new Product('monitor', 10000, 'img/monitor.png', desc3, 3));

var cartQty = {};

function cartRender() {
    const cartDiv = document.getElementById("cart_list");
    let uList = document.getElementById("cart_Ulist");
    // console.log(uList);
    if (uList) {
        uList.remove();
        const cartItmPr = document.getElementById("cartItemPrice");
        if (cartItmPr) {
            cartItmPr.remove();
        }
    }
    const emptyCart = document.getElementById("empty_cart");
    if (emptyCart) {
        emptyCart.remove();
    }
    uList = document.createElement('ul');
    uList.setAttribute('id', 'cart_Ulist');
    cartDiv.appendChild(uList);

    let totalPrice = 0;
    if (Object.keys(cartQty).length) {
        for (let key in cartQty) {
            const prod = prodList.find(item => item.id == key);

            const cartItem = document.createElement('li');
            cartItem.classList.add('cart_items');
            uList.appendChild(cartItem);

            const cartItemName = document.createElement('p');
            cartItemName.classList.add('cart_item_name');
            cartItemName.textContent = prod.name;
            cartItem.appendChild(cartItemName);

            const cartItemPrice = document.createElement('p');
            cartItemPrice.classList.add('cart_item_price');
            const price = prod.price * cartQty[key];
            totalPrice += price;
            cartItemPrice.textContent = 'Цена ' + prod.price + ' x ' + cartQty[key] + ' = ' + price + ' руб.';
            cartItem.appendChild(cartItemPrice);
        }
        const totalP = document.createElement('p');
        totalP.textContent = 'Всего на сумму: ' + totalPrice + ' руб.';
        totalP.setAttribute('id', 'cartItemPrice');
        cartDiv.appendChild(totalP);
    } else {
        const emptyCart = document.createElement('p');
        emptyCart.textContent = 'Корзина пуста...';
        emptyCart.setAttribute('id', 'empty_cart');
        cartDiv.appendChild(emptyCart);
    }
}

function eventCartHandler(event) {
    // console.log(event);
    const prodID = parseInt(event.path[0].getAttribute('id').slice(9));
    prodID in cartQty ? cartQty[prodID]++ : cartQty[prodID] = 1;
    // console.log(cartQty);
    cartRender(cartQty);
}

function eventClearCartHandler(event) {
    cartQty = {};
    cartRender();
}

for (idx in prodList) {
    shopPage.appendChild(prodList[idx].prodDivMain);
    const addCartBtn = document.getElementById(`shop_itm_${parseInt(idx) + 1}`);
    addCartBtn.addEventListener('click', eventCartHandler);
}

cartRender();
const clearCartBtn = document.getElementById('cart_clear');
clearCartBtn.addEventListener('click', eventClearCartHandler);