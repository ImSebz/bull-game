let startBtn, mContext;

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        mContext = this;

        startBtn.on('pointerdown', function () {
            startBtn.setScale(1.6);
            setTimeout(() => {
                mContext.scene.start('Game');
            }, 350);
        });

        startBtn.on('pointerout', () => {
            startBtn.setScale(1.8);
        });
    }

    init() {
        this.add.image(0, 0, 'background').setOrigin(0);
        startBtn = this.add.image(((this.game.config.width) / 2), (this.game.config.height) - 350, 'start-btn').setScale(1).setInteractive();
    }
}