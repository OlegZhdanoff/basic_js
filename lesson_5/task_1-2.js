/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8,
столбцы – латинскими буквами A, B, C, D, E, F, G, H.
2*. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п.,
*/

const mainDiv = document.getElementById('chess');
const chessTable = document.createElement('table');
const chessGame = document.getElementById('chess_game');
chessTable.classList.add("chess_table");
mainDiv.appendChild(chessTable);
chessGame.classList.add('hidden');


class ChessTable {

    constructor() {
        self.containerElement = document.getElementsByClassName('chess_table')[0];
        self.containerElement.innerHTML = '';
        self.cellElements = [];
        self.figures = [];
        self.isCellActive = false;
        self.activeCellX = null;
        self.activeCellY = null;
    }


    initCells() {
        let isBlack = true;

        for (let row = 0; row < 9; row++) {
            const tr = document.createElement('tr');
            self.containerElement.appendChild(tr);

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
                td.setAttribute('id', `${row}-${col}`);
                tr.appendChild(td);
                self.cellElements.push(td);
            }
        }
    }

    initFigures() {
        self.figures.push(new Figure('king', false, 7, 5));
        self.figures.push(new Figure('king', true, 0, 5));
        self.figures.push(new Figure('queen', false, 7, 4));
        self.figures.push(new Figure('queen', true, 0, 4));
        self.figures.push(new Figure('bishop', false, 7, 3));
        self.figures.push(new Figure('bishop', false, 7, 6));
        self.figures.push(new Figure('bishop', true, 0, 3));
        self.figures.push(new Figure('bishop', true, 0, 6));
        self.figures.push(new Figure('knight', false, 7, 2));
        self.figures.push(new Figure('knight', false, 7, 7));
        self.figures.push(new Figure('knight', true, 0, 2));
        self.figures.push(new Figure('knight', true, 0, 7));
        self.figures.push(new Figure('castle', false, 7, 1));
        self.figures.push(new Figure('castle', false, 7, 8));
        self.figures.push(new Figure('castle', true, 0, 1));
        self.figures.push(new Figure('castle', true, 0, 8));
        for (let i = 0; i < 16; i++) {
            i > 7 ? self.figures.push(new Figure('pawn', false, 6, i - 7)) : self.figures.push(new Figure('pawn', true, 1, i + 1));
        }
    }


    render() {
        for (let fig of self.figures) {
            const td = document.getElementById(`${fig.x}-${fig.y}`);
            td.innerText = fig.name;
            if (fig.isBlack) {
                td.classList.remove('fig_white');
                td.classList.add('fig_black');
            } else {
                td.classList.remove('fig_black');
                td.classList.add('fig_white');
            }
        }
    }


    cellHandler(event) {
        function isMath(element) {
            return (element.x == self.activeCellX && element.y == self.activeCellY);
        }
        const pos = event.path[0].getAttribute('id');
        const x = parseInt(pos[0]);
        const y = parseInt(pos[2]);
        if (x < 8 && y > 0) {
            if (self.isCellActive) {
                self.isCellActive = false;
                const source = document.getElementById(`${self.activeCellX}-${self.activeCellY}`);
                const target = document.getElementById(`${x}-${y}`);
                const idx = self.figures.findIndex(isMath); // не смог сделать через стрелочную функцию :(
                if (source == target) {
                    self.figures.splice(idx, 1);
                } else {
                    console.log(target);
                    console.log(idx, self.figures[idx]);
                    target.innerText = self.figures[idx].name;
                    self.figures[idx].x = x;
                    self.figures[idx].y = y;
                }
                source.innerText = '';
                // не смог вызвать метод render(), к сожалению пока плохо разбираюсь в js :(
                for (let fig of self.figures) {
                    const td = document.getElementById(`${fig.x}-${fig.y}`);
                    td.innerText = fig.name;
                    if (fig.isBlack) {
                        td.classList.remove('fig_white');
                        td.classList.add('fig_black');
                    } else {
                        td.classList.remove('fig_black');
                        td.classList.add('fig_white');
                    }
                }

            } else {
                self.isCellActive = true;
                self.activeCellX = x;
                self.activeCellY = y;
            }
        }
    }
};


class Figure {
    x = null;
    y = null;
    name = '';
    isBlack = true;

    constructor(name, isBlack, x, y) {
        this.name = name;
        this.isBlack = isBlack;
        this.x = x;
        this.y = y;
    }
};


table = new ChessTable();

table.initCells();
table.initFigures();
table.render();

chessTable.addEventListener('click', table.cellHandler);
