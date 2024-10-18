let startBtn, mContext, gamepad1;

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        mContext = this;

        startBtn.on('pointerdown', function () {
            startBtn.setScale(0.8);
            setTimeout(() => {
                mContext.scene.start('Game');
            }, 350);
        });

        startBtn.on('pointerout', () => {
            startBtn.setScale(0.9);
        });

        /** GAMEPADS **/
        mContext.input.gamepad.once('down', function (gamepad, button, value) {
            mContext.GamepadControls();
        });
        /****/
    }

    init() {
        this.add.image(0, 0, 'background').setOrigin(0);
        startBtn = this.add.image(((this.game.config.width) / 2), (this.game.config.height) - 350, 'start-btn').setScale(1).setInteractive();
    }

    GamepadControls(){
        gamepad1 = this.input.gamepad.getPad(0);
        gamepad1.on('down', function (pad, button, value) {
            if (pad === 2){
                setTimeout(() => {
                    mContext.scene.start('Game');
                }, 350);
            }
        });
    }
}