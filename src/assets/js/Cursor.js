/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [cursor.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ╔═╗┬ ┬┬─┐┌─┐┌─┐┬─┐   ┬┌─┐
// ║  │ │├┬┘└─┐│ │├┬┘   │└─┐
// ╚═╝└─┘┴└─└─┘└─┘┴└─  └┘└─┘
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine as ctx} from "./engine";
// import {Resources} from "./resources";
// import Entity from "./Entity";
//================================


/**
 * 
 * 
 * @export
 * @class Cursor
 */
export default class Cursor{

    constructor(x, y, sprite, w, h, ...otherArgs) {//startX, startY, stepX = 101, stepY = 83

        //x, y, speed, sprite
        // super(x,y,sprite, w, h);

        this.name = "cursor";
        // this.startX = this.x;
        // this.startY = this.y;
        // this.stepX = stepX;
        // this.stepY = stepY;
        // this.width = this.stepX;
        // this.height = this.stepY;
        this.x = x,
        this.y = y,
        this.width = 101,
        this.height = 90
        this.sprite = sprite;
        this.i = 0;
        [
            this.players = [],
            this.stepX = 190,
            this.stepY = 90,
            this.startX = this.x,
            this.startY = this.y,
        ] = otherArgs;

        // let cord = [];
        // if(players){
        //     players.forEach((player) => {
        //         cord.push({x:player.x,y:player.y,w:player.width,h:player.height});
        //     });
        // }
        // this.x = 0;
        // this.y = 0;
        // this.speed = 1;

    }

    update(){
        return new Promise(resolve => this.handleInput().then(res => resolve(res)));
    }

    render(entity){
        // let cord = [];
        // entity.forEach((player) => {
        //     // let arr = [player.x,player.y,player.w,player.h];
        //     cord.push({x:player.x,y:player.y,w:player.width,h:player.height});
        // });

        // ctx.strokeStyle = 'blue';
        // ctx.lineWidth = 5;
        // ctx.strokeRect(this.x, this.y+45, this.width, this.height+15);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y+45, this.width, this.height+15);
        // this.update();

    }

    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }

    handleInput(){

        return new Promise(resolve=>{

            document.addEventListener('keyup', (e) =>{
                var allowedKeys = {
                    37: 'left',
                    38: 'up',
                    39: 'right',
                    40: 'down',
                    13: 'enter'
                };

                // for (let i = 0; i < this.players.length; i++) {
                //     let player = this.players[i];
                    
                this.y = this.players[this.i].y + this.players[this.i].y/2;
                    
                    switch (allowedKeys[e.keyCode]){
                        case 'left':
                        // if(this.x > this.stepX*2){
                        //     this.x -= this.stepX;
                        // }
                        if(this.i == 0) {
                            this.x = this.players[this.i].x;
                        }else{ 
                            this.x -= this.players[this.i].x - this.players[this.i-1].x;
                            this.i--;
                        }
                        break;
                        case 'right':
                        // if(this.x < ctx.canvas.width - (this.stepX*2.5)){
                        //     this.x += this.stepX;
                        //     // ctx.strokeRect(this.x, this.y, this.width, this.height);
                        // }
                        if(this.i == this.players.length-1) {
                            this.x = this.players[this.players.length-1].x;
                        }else{ 
                            this.x += this.players[this.i+1].x - this.players[this.i].x;
                            this.i++;
                        }
                        break;
                        // case 'up':
                        // if(this.y > this.stepY){
                        //     this.y -= this.stepY;
                        // }
                        // // console.log(this.y);
                        // break;
                        // case 'down':
                        // if(this.y < ctx.canvas.height - (this.stepY*3)){
                        //     this.y += this.stepY;
                        // }
                        // // console.log(this.y);
                        // break;
                        case 'enter':
                            resolve({keyCode: allowedKeys[e.keyCode], player: this.players[this.i]});
                            break;
                    }
                // }
                    
            });
        });

    }


    static createMultiple(num, ...otherArgs){
        if(isNaN(num)) return;
        let allEntities = [],
            [numRows] = otherArgs;

        for(let i=0; i < num; i++){
            let speed = Math.floor(Math.random() * 150) + 101,
                c = (i == 0 ? 1 : numRows-2 <= i ? i-1 : i);
            allEntities[i] = new this(101*i,numRows*83-101,'img/char-boy.png');
        }
        return allEntities;
    }

}