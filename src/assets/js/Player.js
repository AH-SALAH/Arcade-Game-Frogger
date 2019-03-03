/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [player.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗          ██╗███████╗
// ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗         ██║██╔════╝
// ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝         ██║███████╗
// ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗    ██   ██║╚════██║
// ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║    ╚█████╔╝███████║
// ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚════╝ ╚══════╝
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
 * @class Player
 * @extends {Entity}
 */
export default class Player extends Entity{

    constructor(x, y, sprite, w = 101, h = 83, ...otherArgs) {//startX, startY, stepX = 101, stepY = 83

        //x, y, speed, sprite
        super(x,y,sprite, w, h);

        this.name = "hero";
        // this.startX = this.x;
        // this.startY = this.y;
        // this.stepX = stepX;
        // this.stepY = stepY;
        // this.width = this.stepX;
        // this.height = this.stepY;
        [
            this.lifes = 5,
            this.gems = 0,
            this.keys = 0,
            this.startX = this.x,
            this.startY = this.y,
            this.stepX = 101,
            this.stepY = 83,
            this.width = w,
            this.height = h
        ] = otherArgs;
        // this.x = 0;
        // this.y = 0;
        // this.speed = 1;
    }

    update(){
        this.move();
    }

    render(){
        super.render();
        this.width = Resources.get(this.sprite).width;
        this.height = Resources.get(this.sprite).height;
    }

    renderWithVal(){
        super.render();
        ctx.font = "26px coda,arial";
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        this.name = this.sprite.substring(this.sprite.lastIndexOf('/'),this.sprite.lastIndexOf('.'));
        this.name = this.name.search(/boy/gi) > -1 ? 
            'Boy' :
            this.name.search(/cat/gi) > -1 ? 
            'Cat Girl' : 
            this.name.search(/horn/gi) > -1 ?
            'Horn Girl' : 
            this.name.search(/pink/gi) > -1 ? 
            'Pink Girl' : 
            this.name.search(/princess/gi) > -1 ?
            'Princess Girl' : 
            this.name; 
            ctx.fillStyle = "#e00";
        ctx.fillText(this.name, this.x-(this.width*2.1), this.y+(this.height/2)+26/1.4, 101);
    }

    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }

    move(key){

        switch (key){
            case 'left':
                if(this.x > this.stepX/2){
                    this.x -= this.stepX;
                }
            break;
            case 'right':
                if(this.x < ctx.canvas.width - (this.stepX*2)){
                    this.x += this.stepX;
                }
            break;
            case 'up':
                if(this.y > this.stepY){
                    this.y -= this.stepY;
                }
                // console.log(this.y);
            break;
            case 'down':
                if(this.y < ctx.canvas.height - (this.stepY*3)){
                    this.y += this.stepY;
                }
                // console.log(this.y);
            break;
        }
    }


    static createMultiple(num, ...otherArgs){
        if(isNaN(num)) return;
        let allEntities = [],
            [numRows, sprite] = otherArgs;

        for(let i=0; i < num; i++){
            let speed = Math.floor(Math.random() * 150) + 101,
                c = (i == 0 ? 1 : numRows-2 <= i ? i-1 : i);
            allEntities[i] = new this(101*i+global.startCol, (numRows*83-101)+global.startRow, sprite);
        }
        return allEntities;
    }

    
}