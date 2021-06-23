class ElectricidadTP1 extends Phaser.Scene {
    constructor() {
        super({ key: "ElectricidadTP1" });

    }
    init(data) {
        this.data = data;
        this.soundManager = data.soundManager
    }

    preload() {
        this.data.escena.gimBU.alpha = 1;
    }


    create() {


        this.prueba = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'PruebaElectricidad');
        this.prueba.displayHeight = this.prueba.height * 0.55
        this.prueba.displayWidth = this.prueba.width * 0.55
        
        


        this.pieza1=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'PruebaElectricidadPieza1');
        this.pieza1.displayHeight=22;
        this.pieza1.displayWidth=5;
        this.pieza1.y=170;
        this.pieza1.x=465;
        this.pieza1.angle=90;


        this.pieza4=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'PruebaElectricidadPieza2');
        this.pieza4.displayHeight=10;
        this.pieza4.displayWidth=20;
        this.pieza4.y=217;
        this.pieza4.x=558;
        this.pieza4.angle=90;


        this.pieza3=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'PruebaElectricidadPieza1');
        this.pieza3.displayHeight=22;
        this.pieza3.displayWidth=5;
        this.pieza3.y=167;
        this.pieza3.x=509;
        this.pieza3.angle=90;


        this.pieza2=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'PruebaElectricidadPieza1');
        this.pieza2.displayHeight=22;
        this.pieza2.displayWidth=5;
        this.pieza2.y=175;
        this.pieza2.x=620;
        this.pieza2.angle=90;



        this.pieza5=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'PruebaElectricidadPieza1');
        this.pieza5.displayHeight=22;
        this.pieza5.displayWidth=5;
        this.pieza5.y=208;
        this.pieza5.x=501;
        this.pieza5.angle=0;

        this.bombilla=this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 4, 'BombillaEncendida');
        this.bombilla.scale=0.6
        this.bombilla.y=292;
        this.bombilla.x=536;
        this.bombilla.alpha=0;

        window.bombilla=this.bombilla;


        this.piezas=new Array();
        this.piezas[0]=this.pieza1
        this.piezas[1]=this.pieza5
        this.piezas[2]=this.pieza3
        this.piezas[3]=this.pieza4
        this.piezas[4]=this.pieza2

        this.solucion= new Array();
        this.solucion[0]={uno:0,dos:-180};
        this.solucion[1]={uno:90,dos:-90};
        this.solucion[2]={uno:0,dos:-180};
        this.solucion[3]={uno:0,dos:-180};
        this.solucion[4]={uno:0,dos:-180};



        this.marco=this.add.sprite(this.piezas[2].x,this.piezas[2].y,"Marco");
        this.marco.scale=0.33;
        this.posicion=2;

        this.keyboard = this.input.stopPropagation().keyboard.addKeys('A,D,S,W');
        this.input.keyboard.on('keyup-' + 'A', this.unlock.bind(this));
        this.input.keyboard.on('keyup-' + 'D', this.unlock.bind(this));
        this.input.keyboard.on('keyup-' + 'W', this.unlock.bind(this));
        this.input.keyboard.on('keyup-' + 'S', this.unlock.bind(this));
        this.keyLock = false;

    }
    unlock() {
        //console.log("unlock")

        this.keyLock = false;
    }


    update() {


        if (this.keyboard.A.isDown == true && this.keyLock == false) {
            this.posicion--;
            if(this.posicion<0){
                this.posicion=this.piezas.length-1;
            }
            this.actualizarMarco();
            this.keyLock = true;
        }
        if (this.keyboard.D.isDown == true && this.keyLock == false) {
            
            this.posicion++;
            if(this.posicion>this.piezas.length-1){
                this.posicion=0;
            }

            this.actualizarMarco();
            this.keyLock = true;

        }


        //*/

        if (this.keyboard.W.isDown === true && this.keyLock == false) {
            this.keyLock = true;
            this.piezas[this.posicion].angle+=90;
            this.completado();
            this.soundManager.play('electricidad');  //Sonido cada vez que mueves la pieza
            //console.log("La pieza: " +this.posicion+" tiene este angulo : "+this.piezas[this.posicion].angle);
        }

        if (this.keyboard.S.isDown === true && this.keyLock == false) {
            this.keyLock = true;
            this.piezas[this.posicion].angle-=90;
            this.completado();
            this.soundManager.play('electricidad');  //Sonido cada vez que mueves la pieza
            //console.log("La pieza: " +this.posicion+" tiene este angulo : "+this.piezas[this.posicion].angle);
        }

    }

    actualizarMarco(){
        console.log(this.posicion)
        this.marco.x=this.piezas[this.posicion].x;
        this.marco.y=this.piezas[this.posicion].y;
    }
    completado(){
        let casos = new Array(false,false,false,false,false);
        if(this.piezas[0].angle==this.solucion[0].uno || this.piezas[0].angle==this.solucion[0].dos){
            casos[0]=true;
        }
        if(this.piezas[1].angle==this.solucion[1].uno || this.piezas[1].angle==this.solucion[1].dos){
            casos[1]=true;
        }
        if(this.piezas[2].angle==this.solucion[2].uno || this.piezas[2].angle==this.solucion[2].dos){
            casos[2]=true;
        }
        if(this.piezas[3].angle==this.solucion[3].uno || this.piezas[3].angle==this.solucion[3].dos){
            casos[3]=true;
        }
        if(this.piezas[4].angle==this.solucion[4].uno || this.piezas[4].angle==this.solucion[4].dos){
            casos[4]=true;
        }
        if(casos[0]==true && casos[1]==true&&casos[2]==true&&casos[3]==true&&casos[4]==true){
            console.log("Completado")
            console.log("Cerrando");

            this.bombilla.alpha=1;

            

            setTimeout(()=>{this.scene.stop(this)
                this.data.escena.escenasActivas[0] = false;
                this.data.escena.gimBU.alpha = 0;
                this.scene.stop(this)
            },500);
        }
        console.log(casos)
    }





}
export default ElectricidadTP1;