// Useful vars
let width, height, mContext, floor, player, elemsFall = [],
    scoreText, elemsInterval;

// Movements
let goRight = false, goLeft = false, leftBtn, rightBtn, gamepad1;

// Filled
const CARRITOVELOCITY = 600;
const FALLING_ELEMENTS = ['bull1', 'bull2', 'bull3', 'bull4']; // Agregar claves de los elementos

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
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

        //Girar
        // this.physics.world.on('worldstep', () => {
        //     player.setAngularVelocity(
        //         Phaser.Math.RadToDeg(player.body.velocity.x / player.body.halfWidth)
        //     );
        // });

        // Elems Fall
        elemsInterval = setInterval(() => {
            let elemKey = FALLING_ELEMENTS[this.getRandomNumber(0, FALLING_ELEMENTS.length)];
            let elem = this.physics.add.sprite(Phaser.Math.Between(20, (width - 20)), 0, elemKey).setScale(1.2);
            elemsFall.push(elem);
        }, 600);

        // Time
        setTimeout(() => {
            this.popUp();
            /** GAMEPADS **/
            mContext.input.gamepad.once('down', function (gamepad, button, value) {
                mContext.GamepadControls();
            });
            /****/
        }, 30000);

        // Colliders
        this.physics.add.collider(player, floor);
        this.physics.add.overlap(player, elemsFall, this.hitElem, null, this);
    }

    update() {
        if (goLeft) {
            player.setVelocityX(-CARRITOVELOCITY);
        } else if (goRight) {
            player.setVelocityX(CARRITOVELOCITY);
        } else {
            player.setVelocityX(0);
        }

        // ---------------- GAMEPAD -------------- //
        if (this.input.gamepad.total === 0)
        {
            return;
        }

        gamepad1 = this.input.gamepad.getPad(0);

        if (gamepad1 && gamepad1.axes.length)
        {
            const axisH = gamepad1.axes[0].getValue();

            if (axisH < 0){
                goLeft = true;
                goRight = false;
            }else if (axisH > 0){
                goRight = true;
                goLeft = false;
            }
            else {
                goRight = false;
                goLeft = false;
            }
        }

        elemsFall.forEach(elem => {
            elem.setAngularVelocity(Phaser.Math.RadToDeg(elem.body.velocity.y / 2500));
        });
    }

    init() {
        width = this.game.config.width;
        height = this.game.config.height;

        this.add.image(0, 0, 'background2').setOrigin(0);
        floor = this.physics.add.staticGroup();
        floor.create(15, (height - 160), '').setSize(width, 20).setOffset(0, 20).setAlpha(0.001);

        leftBtn = this.add.image(250, height - 72, 'left-btn').setScale(1.5).setInteractive().setDepth(1);
        rightBtn = this.add.image(leftBtn.x + 200, height - 72, 'right-btn').setScale(1.5).setInteractive().setDepth(1);

        player = this.physics.add.sprite((width / 2), height - 400, 'player-idle', 0).setScale(0.5);
        player.setSize(280, 260, true);
        player.score = 0;
        player.setCollideWorldBounds(true);

        this.add.image(width - 100, 100, 'score').setDepth(1);
        scoreText = this.add.text(width - 147, 78, 'PTS: 0', { font: '40px primary-font', fill: '#fff' }).setDepth(1);

        // ANIMATIONS
        this.anims.create({
            key: 'player-idle',
            frames: this.anims.generateFrameNumbers('player-idle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        player.play('player-idle');
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
            let title = this.add.text((width / 2) - 200, (height / 2) - 150, 'GANASTE', { font: '150px primary-font', fill: '#fff' }).setDepth(2);
        } else {
            let title = this.add.text((width / 2) - 150, (height / 2) - 195, 'INTENTALO\nDE NUEVO', { font: '100px primary-font', fill: '#fff', align: 'center' }).setDepth(2);
        }
        let pts = this.add.text((width / 2) - 75, (height / 2) + 20, `${player.score} puntos`, { font: '50px primary-font', fill: '#fff' }).setDepth(2);
        let volver = this.add.image((width / 2), (height / 2) + 220, 'volver').setScale(1.2).setInteractive().setDepth(2);

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

    GamepadControls(){
        gamepad1.on('down', function (pad, button, value) {
            if (pad === 2){
                setTimeout(() => {
                    window.location.reload();
                }, 350);
            }
    
        });

        gamepad1.on('up', function (pad, button, index) {
            if (pad === 2){
                setTimeout(() => {
                    window.location.reload();
                }, 350);
            }
        });
    }
}