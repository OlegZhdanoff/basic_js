function eventHandler(event) {
    console.log(event);
    const sourceID = event.path[0].getAttribute('id');
    const chessGame = document.getElementById('chess_game');
    const mainPage = document.getElementById('main_page');
    const shopPage = document.getElementById('shop_page');

    switch (sourceID) {
        case 'chess_btn':
        case 'chess_link': {
            chessGame.classList.remove('hidden');
            mainPage.classList.add('hidden');
            shopPage.classList.add('hidden');
            break;
        }
        case 'home_link':
            chessGame.classList.add('hidden');
            mainPage.classList.remove('hidden');
            shopPage.classList.add('hidden');
            break;
        case 'shop_link':
        case 'shop_btn': {
            chessGame.classList.add('hidden');
            mainPage.classList.add('hidden');
            shopPage.classList.remove('hidden');
        }
    }

}

const chessLink = document.getElementById('chess_link');
const chessBtn = document.getElementById('chess_btn');
const homeLink = document.getElementById('home_link');
const shopLink = document.getElementById('shop_link');
const shopBtn = document.getElementById('shop_btn');

chessLink.addEventListener('click', eventHandler);
chessBtn.addEventListener('click', eventHandler);
homeLink.addEventListener('click', eventHandler);
shopBtn.addEventListener('click', eventHandler);
shopLink.addEventListener('click', eventHandler);
