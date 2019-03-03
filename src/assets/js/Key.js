/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [Key.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ██╗  ██╗███████╗██╗   ██╗         ██╗███████╗
// ██║ ██╔╝██╔════╝╚██╗ ██╔╝         ██║██╔════╝
// █████╔╝ █████╗   ╚████╔╝          ██║███████╗
// ██╔═██╗ ██╔══╝    ╚██╔╝      ██   ██║╚════██║
// ██║  ██╗███████╗   ██║       ╚█████╔╝███████║
// ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚════╝ ╚══════╝
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
 * @class Key
 * @extends {Entity}
 */
export default class Key extends Entity {

    constructor(x, y, sprite, w = 101, h = 83, ...otherArgs) {

        //x, y, speed, sprite
        super(x, y, sprite, w, h);
        // super(y);
        // super(sprite);
        // this.x = 0;
        
        this.name = "key";
        [
            this.numberOfThis = 0, 
            this.numRows = 0
        ] = otherArgs;

        // this.y = y * 65;
        // this.speed = speed;
    }

    renderWithVal(){
        super.render();
        ctx.font = "26px coda,arial";
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillText(String(this.getNumberOfThis()), this.x+(this.width/2)*3, this.y+(this.height/2)+26/1.7);
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
            [winWidth, numRows, numCols] = otherArgs;

        for(let i=0; i < num; i++){
            let c = (i == 0 ? 1 : numRows-2 <= i ? i-1 : i);
            allEntities[i] = new this(Math.floor(Math.random() * ((numCols * 101) - 101)) + 101/2 +(global.startCol), Math.floor(Math.random() * (((numRows-2) * 83) - 83)) + 83 +(global.startRow)/*Math.floor(Math.random() * (65*c) - 65)+85*3*/,'img/Key.png');
        }
        return allEntities;
    }

}