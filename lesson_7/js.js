/*
1. Выводить счёт в режиме реального времени.
2. Генерировать временные препятствия на поле.
3. *Убрать границы поля. Т.е. при пересечении границы поля змейка появляется с противоположной стороны.
*/

"use strict";

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
    blockCount: 10,
};

const config = {
    settings,
    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    getBlockCount() {
        return this.settings.blockCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Значение rowsCount должно быть в диапазоне от 10 до 30 включительно.');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Значение colsCount должно быть в диапазоне от 10 до 30 включительно.');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Значение speed должно быть в диапазоне от 1 до 10 включительно.');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Значение winFoodCount должно быть в диапазоне от 5 до 50 включительно.');
        }

        if (this.getBlockCount() < 0 || this.getBlockCount() > this.getWinFoodCount()) {
            result.isValid = false;
            result.errors.push(`Неверные настройки. Значение winFoodCount должно быть больше нуля и меньше ${this.getWinFoodCount()}.`);
        }

        return result;
    },
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {}; // {x1_y1: td, x1_y2: td}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, blockPointsArray) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            // console.log(snakeCell);
            // console.log(point.x, point.y);
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        blockPointsArray.forEach((point, index) => {
            const pointCell = this.cells[`x${point.x}_y${point.y}`];
            pointCell.classList.add('block');
            this.usedCells.push(pointCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.getBody().some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep(cols = 0, rows = 0) {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint(cols, rows));
        this.body.pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint); // {...lastBodyPoint}
        this.body.push(lastBodyPointClone);
    },

    getNextStepHeadPoint(cols = 0, rows = 0) {
        const firstPoint = this.getBody()[0];
        // console.log(config.getRowsCount());

        switch (this.direction) {
            case 'up':
                if ((firstPoint.y - 1) >= 0) {
                    return { x: firstPoint.x, y: firstPoint.y - 1 };
                } else {
                    return { x: firstPoint.x, y: cols - 1 };
                }
            case 'right':
                if ((firstPoint.x + 1) < rows) {
                    return { x: firstPoint.x + 1, y: firstPoint.y };
                } else {
                    return { x: 0, y: firstPoint.y };
                }
            // return { x: firstPoint.x + 1, y: firstPoint.y };
            case 'down':
                if ((firstPoint.y + 1) < cols) {
                    return { x: firstPoint.x, y: firstPoint.y + 1 };
                } else {
                    return { x: firstPoint.x, y: 0 };
                }
            // return { x: firstPoint.x, y: firstPoint.y + 1 };
            case 'left':
                if ((firstPoint.x - 1) >= 0) {
                    return { x: firstPoint.x - 1, y: firstPoint.y };
                } else {
                    return { x: rows - 1, y: firstPoint.y };
                }
            // return { x: firstPoint.x - 1, y: firstPoint.y };
        }
    },

    setDirection(direction) {
        this.direction = direction;
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },

};

const blocks = {
    coords: [],

    getBlocks() {
        return this.coords;
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.getBlocks().some(block => block.x === point.x && block.y === point.y);
    },

    addBlock(point) {
        this.coords.push(point);
    },

    reset() {
        this.coords = [];
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    blocks,
    tickInterval: null,

    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();
        if (!validation.isValid) {
            for (const err of validation) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setScore();

        this.setEventHandlers();
        this.reset();
    },

    setScore() {
        const scoreTag = document.getElementById('score');
        scoreTag.innerHTML = '';
        scoreTag.insertAdjacentHTML('afterbegin',
            `${this.snake.getBody().length - 1} : ${this.config.getWinFoodCount()}`);

    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.blocks.reset();
        this.render();
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButtonState('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButtonState('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButtonState('Игра закончена', true);
    },

    isBlockAdd() {
        const blockInterval = Math.floor(this.config.getWinFoodCount() / this.config.getBlockCount());
        return !((this.snake.getBody().length - 1) % blockInterval)
            && this.blocks.getBlocks().length < this.config.getBlockCount();
    },

    tickHandler() {
        if (!this.canMakeStep()) {
            return this.finish();
        }

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint(this.config.getColsCount(), this.config.getRowsCount()))) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isBlockAdd()) {
                this.blocks.addBlock(this.getRandomFreeCoordinates());
            }

            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep(this.config.getColsCount(), this.config.getRowsCount());
        this.render();
    },

    setPlayButtonState(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.blocks.getBlocks());
        this.setScore();
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.blocks.getBlocks()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    playClickHandler() {
        // if (this.status.isPlaying()) this.stop();
        // if (this.status.isStopped()) this.play();
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint(this.config.getColsCount(), this.config.getRowsCount());

        return !this.snake.isOnPoint(nextHeadPoint)
            // && nextHeadPoint.x < this.config.getColsCount()
            // && nextHeadPoint.y < this.config.getRowsCount()
            // && nextHeadPoint.x >= 0
            // && nextHeadPoint.y >= 0
            && !this.blocks.isOnPoint(nextHeadPoint);
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },
};

game.init({ speed: 2 });
