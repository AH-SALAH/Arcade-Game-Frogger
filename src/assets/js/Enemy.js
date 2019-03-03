/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [enemy.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ███████╗███╗   ██╗███████╗███╗   ███╗██╗   ██╗         ██╗███████╗
// ██╔════╝████╗  ██║██╔════╝████╗ ████║╚██╗ ██╔╝         ██║██╔════╝
// █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║ ╚████╔╝          ██║███████╗
// ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║  ╚██╔╝      ██   ██║╚════██║
// ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║   ██║       ╚█████╔╝███████║
// ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝   ╚═╝        ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine as ctx} from "./engine";
import {Resources} from "./resources";
import Entity from "./Entity";
//================================



/**
 * 
 * 
 * @export
 * @class Enemy
 * @extends {Entity}
 */
export default class Enemy extends Entity{

    constructor(x, y, sprite, w = 83, h = 101, ...otherArgs) { //x, y, sprite, w = 83, h = 101, speed = 101, numberOfThis = 0, numRows = 0

        //x, y, speed, sprite
        super(x, y, sprite, w, h); 
        // super(y);
        // super(sprite);
        // this.x = 0;
        this.name = "bug";
        [
            this.speed = 101, 
            this.numberOfThis = 0, 
            this.numRows = 0
        ] = otherArgs;
        
        // this.height = w;
        // this.width = h;
        // this.y = y * 65;
        // this.speed = speed;
        // this.numberOfThis = numberOfThis;
        // this.numRows = numRows;

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

    render(){
        super.render();
        this.width = Resources.get(this.sprite).width;
        this.height = Resources.get(this.sprite).height;
    }

    /* create multiple of this */
    static createMultiple(num, ...otherArgs){
        if(isNaN(num)) return;
        let allEntities = [],
            [numRows] = otherArgs;

        for(let i=0; i < num; i++){
            let speed = Math.floor(Math.random() * 150) + 101*i+1,
                c = (i == 0 ? 1 : numRows-2 <= i ? i-1 : i);
            allEntities[i] = new this(-(101+Math.floor(Math.random()*(150+2-(101+1))))+global.startCol, c*65 +global.startRow-45, 'img/enemy-bug.png', undefined, undefined, speed);
        }
        return allEntities;
    }

}