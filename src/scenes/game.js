// Useful vars
let width, height, mContext, floor, player, elemsFall = [],
    scoreText, elemsInterval;

// Movements
let goRight = false, goLeft = false, leftBtn, rightBtn;

// Filled
const AREPAVELOCITY = 480;
const FALLING_ELEMENTS = ['bull1', 'bull2', 'bull3', 'bull4']; // Agregar claves de los elementos

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        mContext = this;
        leftBtn.on('pointerdown', function () {
            leftBtn.setScale(1.3);
            goLeft = true;
        });

        leftBtn.on('pointerup', function () {
            goLeft = false;
        });

        leftBtn.on('pointerout', () => {
            leftBtn.setScale(1.5);
            goLeft = false;
        });

        // --------------------------------------

        rightBtn.on('pointerdown', function () {
            rightBtn.setScale(1.3);
            goRight = true;
        });

        rightBtn.on('pointerup', function () {
            goRight = false;
        });

        rightBtn.on('pointerout', () => {
            rightBtn.setScale(1.5);
            goRight = false;
        });

        this.physics.world.on('worldstep', () => {
            player.setAngularVelocity(
                Phaser.Math.RadToDeg(player.body.velocity.x / player.body.halfWidth)
            );
        });

        // Elems Fall
        elemsInterval = setInterval(() => {
            let elemKey = FALLING_ELEMENTS[this.getRandomNumber(0, FALLING_ELEMENTS.length)];
            let elem = this.physics.add.sprite(Phaser.Math.Between(20, (width - 20)), 0, elemKey).setScale(1.2);
            elemsFall.push(elem);
        }, 600);

        // Time
        setTimeout(() => {
            this.popUp();
        }, 30000);

        // Colliders
        this.physics.add.collider(player, floor);
        this.physics.add.overlap(player, elemsFall, this.hitElem, null, this);
    }

    update() {
        if (goLeft) {
            player.setVelocityX(-AREPAVELOCITY);
        } else if (goRight) {
            player.setVelocityX(AREPAVELOCITY);
        } else {
            player.setVelocityX(0);
        }

        elemsFall.forEach(elem => {
            elem.setAngularVelocity(Phaser.Math.RadToDeg(elem.body.velocity.y / 1250));
        });
    }

    init() {
        width = this.game.config.width;
        height = this.game.config.height;

        this.add.image(0, 0, 'background2').setOrigin(0);
        floor = this.physics.add.staticGroup();
        floor.create(15, (height - 190), '').setSize(width, 20).setOffset(0, 20).setAlpha(0.001);

        leftBtn = this.add.image(250, height - 72, 'left-btn').setScale(1.5).setInteractive().setDepth(1);
        rightBtn = this.add.image(leftBtn.x + 200, height - 72, 'right-btn').setScale(1.5).setInteractive().setDepth(1);

        player = this.physics.add.sprite((width / 2), height - 400, 'player', 0).setScale(0.5);
        player.setSize(270, 260, true);
        player.score = 0;
        player.setCollideWorldBounds(true);

        this.add.image(width - 100, 100, 'score').setDepth(1);
        scoreText = this.add.text(width - 135, 78, 'PTS: 0', { font: '40px primary-font', fill: '#fff' }).setDepth(1);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    hitElem(player, elem) {
        if (elemsInterval) { player.score += 1; }
        scoreText.setText(`PTS: ${player.score}`);
        elemsFall.splice(elemsFall.indexOf(elem), 1);
        elem.destroy();
    }

    popUp() {
        clearInterval(elemsInterval);
        elemsInterval = null;

        let popUp = this.add.image((width / 2), (height / 2), 'popUp').setScale(1.5).setDepth(1);
        if (player.score > 19) {
            let title = this.add.text((width / 2) - 230, (height / 2) - 150, 'GANASTE', { font: '180px primary-font', fill: '#fff' }).setDepth(2);
        } else {
            let title = this.add.text((width / 2) - 150, (height / 2) - 195, 'INTENTALO\nDE NUEVO', { font: '100px primary-font', fill: '#fff', align: 'center' }).setDepth(2);
        }
        let pts = this.add.text((width / 2) - 70, (height / 2) + 20, `${player.score} puntos`, { font: '50px primary-font', fill: '#fff' }).setDepth(2);
        let volver = this.add.image((width / 2) + 10, (height / 2) + 220, 'volver').setScale(1.2).setInteractive().setDepth(2);

        volver.on('pointerdown', function () {
            volver.setScale(1);
            setTimeout(() => {
                window.location.reload();
            }, 350);
        });

        volver.on('pointerout', () => {
            volver.setScale(1.2);
        });
    }
}