function chessStart(event) {
    console.log(event);
    const sourceID = event.path[0].getAttribute('id');
    const chessGame = document.getElementById('chess_game');
    const mainPage = document.getElementById('main_page');
    switch (sourceID) {
        case 'chess_btn':
        case 'chess_link': {
            chessGame.classList.remove('hidden');
            mainPage.classList.add('hidden');
            break;
        }
        case 'home_link':
            chessGame.classList.add('hidden');
            mainPage.classList.remove('hidden');
            break;
    }

}

const chessLink = document.getElementById('chess_link');
const chessBtn = document.getElementById('chess_btn');
const homeLink = document.getElementById('home_link');

chessLink.addEventListener('click', chessStart);
chessBtn.addEventListener('click', chessStart);
homeLink.addEventListener('click', chessStart);
