/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [Gem.js]
 */

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  ██████╗ ███████╗███╗   ███╗         ██╗███████╗
// ██╔════╝ ██╔════╝████╗ ████║         ██║██╔════╝
// ██║  ███╗█████╗  ██╔████╔██║         ██║███████╗
// ██║   ██║██╔══╝  ██║╚██╔╝██║    ██   ██║╚════██║
// ╚██████╔╝███████╗██║ ╚═╝ ██║    ╚█████╔╝███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚═╝     ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine} from "./engine";
// import {Resources} from "./resources";
import Entity from "./Entity";
//================================



/**
 * 
 * 
 * @export
 * @class Gem
 * @extends {Entity}
 */
export default class Gem extends Entity{
    constructor(x, y, sprite, w = 101, h = 83, color, ...otherArgs) {

        //x, y, speed, sprite
        super(x, y, sprite, w, h);

        this.name = "gem";
        this.color = color;
        // this.width = w;
        // this.height = h;
        // this.numberOfThis = numberOfThis;
        // this.numRows = numRows;
        // if(otherArgs instanceof Array){
            [
                this.winWidth = window.innerWidth, 
                this.gemColor = [], 
                this.numberOfThis = 0, 
                this.numRows = 0
            ] = otherArgs;
        // }
        // this.y = y * 65;
        // this.speed = speed;
    }

    update(dt){
        //reverse move
        // if(this.x+this.speed >= ctx.canvas.width || this.x < 0){
        //     this.speed = this.x > 0 ? -this.speed : -this.speed * this.speed;
        // }
        if(this.x > ctx.canvas.width){
            this.x = -this.speed;
        }else{
            this.x += Math.floor(this.speed * dt);
        }
    }

    renderWithVal(){
        super.render();
        ctx.font = "26px coda,arial";
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillText(String(this.getNumberOfThis()), this.x+(this.width/2)*3, this.y+(this.height/2)+26/1.4);
    }

    countUp(){
        this.numberOfThis++;
    }
    
    countDown(){
        this.numberOfThis--;
    }

    getNumberOfThis(){
        return this.numberOfThis;
    }

    static createMultiple(num, ...otherArgs){
        if(isNaN(num)) return;
        let allEntities = [],
            reverse = false,
            i = 0,
            c = 0,
            y = 0,
            [winWidth, gemColor, numCols] = otherArgs;

        for(i; i < num;){
            // y = (i == 0 || y == 0 ? i+1 : y < 4 ? y+1 : y-1);
            
            while(y<=4 && reverse == false && i < num){
                // c = (i == 0 ? 1 : i+1);
                if(y==3) {
                    reverse = true;
                }
                y++;
                allEntities[i] = new this(c*101, y *(y == 1 ? 101 : 101)+global.startRow,`img/Gem ${gemColor[i > gemColor.length-1 ? 0 : i]}.png`);
                c++;
                i++;
            }

            while(reverse && i < num && i > 3){
                // c = (i == 0 ? 1 : i+1);
                if(y==2){
                    reverse = false;
                }
                y--;
                allEntities[i] = new this(c*101, y *(y == 1 ? 101 : 101)+global.startRow,`img/Gem ${gemColor[Math.floor(Math.random()*(gemColor.length) - 0)+0]}.png`);
                c++;
                i++;
            }

                // y = (i == 0 || y == 0 ? 1 : c > 4 ? y == 0 ? y+1 : y >= 4 ? y-1 : y : c);
            // allEntities[i] = new this(c*Math.floor((num*numCols-(101))) + 101, y *101,`img/Gem ${gemColor[i > gemColor.length-1 ? 0 : i]}.png`);
        }
        return allEntities;
    }

}