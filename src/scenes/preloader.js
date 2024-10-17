export class Preloader extends Phaser.Scene {
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        this.load.setPath('public/assets');
        /* AREPAS */
        this.load.image('player', './elems/arepa.png');
        this.load.image('arepa-huevo', './elems/arepa-huevo.png');
        this.load.image('arepa-carne', './elems/arepa-carne.png');
        this.load.image('arepa-mq', './elems/arepa-mq.png');        
        
        /* BUTTONS */
        this.load.image('left-btn', './botones/left.png');
        this.load.image('right-btn', './botones/right.png');
        this.load.image('pause-btn', './botones/pause.png');
        this.load.image('resume-btn', './botones/resume.png');
        this.load.image('score', './botones/score.png');
        this.load.image('start-btn', './botones/start.png');
        this.load.image('popUp', './botones/popUp.png');        
        this.load.image('volver', './botones/volver.png');        

        /* ELEMS */
        this.load.image('background', './elems/fondo_inicio.png');
        this.load.image('background2', './elems/fondo_juego.png');
        this.load.image('presentaciones', './elems/presentaciones.png');
        this.load.image('presentaciones2', './elems/presentaciones2.png');
        this.load.image('floor', './elems/FloorTwo.png');
        this.load.image('bull1', './elems/bull_1.png');
        this.load.image('bull2', './elems/bull_2.png');
        this.load.image('bull3', './elems/bull_3.png');
        this.load.image('bull4', './elems/bull_4.png');
        this.load.image('logo-pan', './elems/pan.png');        
    }

    create ()
    {
        this.scene.start('Menu');
    } 
}