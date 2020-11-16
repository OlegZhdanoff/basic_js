const shopPage = document.getElementById('shop_page');
// const chessTable = document.createElement('table');
// const chessGame = document.getElementById('chess_game');
// chessTable.classList.add("chess_table");
// mainDiv.appendChild(chessTable);
shopPage.classList.add('hidden');

class Product {
    constructor(name, price, imgPath, desc, num) {
        var that = this;
        that.name = name;
        that.price = price;

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
        // that.prodImg.setAttribute('width', 200);
        // that.prodImg.setAttribute('height', 200);
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

prodList = [];
const desc1 = 'Если вам необходимо стандартное устройство, которое отлично справляется со своими функциями, то прекрасным решением является проводная оптическая мышь LOGITECH B100. Она отлично подойдет для оснащения офиса или учебного класса. Классическая форма делает ее удобной в работе, к тому же присутствует возможность управления правой и левой рукой. Проводная оптическая мышь LOGITECH B100 подключается к компьютеру через разъем USB, который можно найти в любом современном устройстве. Длина провода составляет 1,8 метра, что дает большое пространство для свободы движения. Чувствительность устройства на отличном уровне обеспечивается оптическим сенсором с разрешением в 800 dpi.'
const desc2 = 'Теперь клавиатура Magic Keyboard с цифровой панелью доступна в цвете «серый космос». Вы оцените её расширенную раскладку с дополнительными клавишами навигации для быстрой прокрутки документов и полноразмерными клавишами-стрелками для игр. Механизм «ножницы» повышает стабильность клавиш, а низкий профиль и оптимизированный ход обеспечивают точный и удобный ввод текста.'
prodList.push(new Product('mouse', 500, 'img/mouse.png', desc1, 1));
prodList.push(new Product('keyboard', 1000, 'img/keybrd.jpg', desc2, 2));

for (itm of prodList) {
    shopPage.appendChild(itm.prodDivMain);
}
// shopPage.appendChild(prod_one.prodDivMain);
// shopPage.appendChild(prod_two.prodDivMain);