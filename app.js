const grid = document.querySelector('.grid')

function createBoard() {
    for (let i = 0; i < 441; i++) {
        grid.innerHTML += `
        <div class="grid-tile">
        </div>`
    }
    addDeath();
}

const children = grid.children;

// Selects the perimeter and gives it the death class - snakes body will also have death class
// When the head touches a block with the death class the game will end

function addDeath() {
    for (let i = 0; i < 21; i++) {
        children[i].classList.remove('grid-tile');
        children[i].classList.add('death');

        children[441 - i - 1].classList.remove('grid-tile');
        children[441 - i - 1].classList.add('death');
    }

    for (let i = 0; i < 441; i += 21) {
        children[i].classList.remove('grid-tile');
        children[i].classList.add('death');
        children[i + 20].classList.remove('grid-tile');
        children[i + 20].classList.add('death');
    }
}

createBoard();

class Snake {

    constructor() {
        this.length = 1;
        this.score = 0;
        this.headLocation = 44;
        this.direction;
        this.createHead();
    }

    createHead() {
        children[44].classList.remove('grid-tile');
        children[44].classList.add('head');
        this.move('right');
    }

    move(direction) {
        this.direction = direction;
        switch (direction) {
            case 'right':
                children[this.headLocation].classList.remove('head');
                children[this.headLocation].classList.add('grid-tile');
                this.headLocation++;
                children[this.headLocation].classList.add('head');
                children[this.headLocation].classList.remove('grid-tile');
                this.checkIfDead();
                break;
            case 'left':
                children[this.headLocation].classList.remove('head');
                children[this.headLocation].classList.add('grid-tile');
                this.headLocation--;
                children[this.headLocation].classList.add('head');
                children[this.headLocation].classList.remove('grid-tile');
                this.checkIfDead();
                break;
            case 'up':
                children[this.headLocation].classList.remove('head');
                children[this.headLocation].classList.add('grid-tile');
                this.headLocation -= 21;
                children[this.headLocation].classList.add('head');
                children[this.headLocation].classList.remove('grid-tile');
                this.checkIfDead();
                break;
            case 'down':
                children[this.headLocation].classList.remove('head');
                children[this.headLocation].classList.add('grid-tile');
                this.headLocation += 21;
                children[this.headLocation].classList.add('head');
                children[this.headLocation].classList.remove('grid-tile');
                this.checkIfDead();
                break;
        }
    }

    getDirection() {
        return this.direction;
    }

    checkIfDead() {
        if (children[this.headLocation].classList.contains('death')) {
            document.body.innerHTML = '<div>Game Over</div>';
        }
    }

}

let player = new Snake();

setInterval(() => {
    // player.move(player.getDirection());
    player.move('down')
}, 200);