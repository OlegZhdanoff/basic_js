/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8,
столбцы – латинскими буквами A, B, C, D, E, F, G, H.
*/

const mainDiv = document.querySelector('div');
const chessTable = document.createElement('table');
chessTable.classList.add("chess_table")
mainDiv.appendChild(chessTable);

function initCells(chessTable) {
    chessTable.innerHTML = '';
    chessTable.cellElements = [];
    let isBlack = true;

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        chessTable.appendChild(tr);

        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            if (col === 0 && row === 8) {
                td.classList.add('cellTitle');
            } else if (col === 0 && row < 8) {
                td.classList.add('cellTitle');
                td.textContent = 8 - row;
            } else if (row === 8 && col > 0) {
                td.classList.add('cellTitle');
                td.textContent = String.fromCharCode(64 + col);
            } else if (isBlack) {
                td.classList.add('cell_black');
            } else {
                td.classList.add('cell_white');
            }
            isBlack = !isBlack;
            tr.appendChild(td);
            chessTable.cellElements.push(td);
        }
    }
}

initCells(chessTable);
