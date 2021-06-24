class CintaP2V2 extends Phaser.Scene {
    constructor() {
        super({ key: "CintaP2V2" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
        this.online = this.data.escena.online;
    }

    preload() {
        this.data.escena.blurGD.alpha = 1;

    }

    create() {



        this.cinta = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height * 0.75, 'CintaA');
        this.cinta.play('CintaA');
        this.cinta.displayHeight = this.cinta.height * 0.55
        this.cinta.displayWidth = this.cinta.width * 0.55

     
      
        this.teclado = new Array();
    
        this.contF = 0;
        this.puntuacion = 0;

        if (this.online && this.data.escena.yo.side == 2) {
            this.keyboard = this.input.stopPropagation().keyboard.addKeys('A,D,E');
            this.input.keyboard.on('keyup-' + 'A', this.unlock.bind(this));
            this.input.keyboard.on('keyup-' + 'D', this.unlock.bind(this));

        } else if (this.online && this.data.escena.yo.side == 1) {
            this.onMensajeHandler();
        } else {

            this.keyboard = this.input.keyboard.addKeys('LEFT,RIGHT');

            this.input.keyboard.on('keyup-' + 'LEFT', this.unlock.bind(this));
            this.input.keyboard.on('keyup-' + 'RIGHT', this.unlock.bind(this));
        }


      
        this.tope = 50;
        this.texto = this.add.text(this.game.canvas.width/2-30, 75+this.game.canvas.height/2).setScrollFactor(0).setFontSize(21).setColor('#2874A6');
        this.keyLock = false;



    }
    unlock() {
  
        if (this.online) {
            var msg = {
                tipo: "PRUEBA",
                a: false,
                d: false,
                w: false,
                s: false,
                e: false

            }
            this.data.escena.handler.send(JSON.stringify(msg));
        }
        this.keyLock = false;
    }


    update() {

        if (this.online&& this.data.escena.yo.side == 2) {


            if (this.keyboard.A.isDown == true && this.keyLock == false) {

                this.keyLock = true;
                this.teclado.push('A');

                if (this.online) {
                    var msg = {
                        tipo: "PRUEBA",
                        a: true,
                        d: false,
                        w: false,
                        s: false,
                        e: false

                    }
                    this.data.escena.handler.send(JSON.stringify(msg));

                }

            }
            if (this.keyboard.D.isDown == true && this.keyLock == false) {
                this.keyLock = true;
                this.teclado.push('D');
                if (this.online) {
                    var msg = {
                        tipo: "PRUEBA",
                        a: false,
                        d: true,
                        w: false,
                        s: false,
                        e: false

                    }
                    this.data.escena.handler.send(JSON.stringify(msg));
                }
            }



        } else if(!this.online|| this.online===null || this.online===undefined) {
            if (this.keyboard.LEFT.isDown == true && this.keyLock == false) {
                this.keyLock = true;
                this.teclado.push('A');

            }
            if (this.keyboard.RIGHT.isDown == true && this.keyLock == false) {
                this.keyLock = true;
                this.teclado.push('D');

            }

        }



        if (this.teclado[0] != undefined) {
            if (this.ultimaL != this.teclado[0]) {
                console.log("corrido un paso");
                this.cinta.setFrame(this.contF)
                this.contF++;
                this.puntuacion++;
                //Sonido
                this.soundManager.play('Paso1');
                
                if (this.contF >= 3)
                    this.contF = 0;
            } if(this.ultimaL==this.teclado[0]) {
                console.log("Te has tropezado");
                this.cinta.setFrame(3);
                this.puntuacion=0;
            }
            this.ultimaL = this.teclado.shift();
            console.log(this.ultimaL)
        }

        if (this.puntuacion >= this.tope) {
            this.data.escena.escenasActivas[1] = false;
            this.data.escena.escenarios[0].completadoP2D=true;
            this.data.escena.blurGD.alpha = 0;
            this.data.escena.particlesCPD.destroy()
            this.data.escena.CP2.destroy()
            this.data.escena.crearRayosP2()
            if (this.online && this.data.escena.yo.side == 1) {

                if (this.data.escena.online) {
                    this.data.escena.onMensajeHandler();

                }
            }

            this.scene.stop(this);
        }

        this.texto.setText([this.puntuacion+'/' + this.tope])
    }

    onMensajeHandler() {
        var that = this;
        this.data.escena.handler.onmessage = function (msg) {

            var message = JSON.parse(msg.data)
            //console.log("message, "+ message.tipo ,message);
            if (message.tipo === "POSICION") {
                that.data.escena.PlayerPositionMnj(message);
            } else if (message.tipo === "BOTONES") {
                that.data.escena.playerPulseMnj(message);
            } else if (message.tipo === "EVENTOS") {
                that.data.escena.gameEventMnj(message);
            } else if (message.tipo === "PRUEBA") {

                if (message.a === true) {
                    console.log("AAAAAAA")
                    that.teclado.push('A');
                }
                if (message.d === true) {
                    that.teclado.push('D');
                }
            }else if (message.tipo = "PLATFORM") {
                //console.log("LO QUE ME LLEGÓ", message);                
                that.data.escena.adjustplatforms(message);
            }

        }


    }


}
export default CintaP2V2;