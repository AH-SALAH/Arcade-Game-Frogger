/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [rock.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ██████╗  ██████╗  ██████╗██╗  ██╗        ██╗███████╗
// ██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝        ██║██╔════╝
// ██████╔╝██║   ██║██║     █████╔╝         ██║███████╗
// ██╔══██╗██║   ██║██║     ██╔═██╗    ██   ██║╚════██║
// ██║  ██║╚██████╔╝╚██████╗██║  ██╗██╗╚█████╔╝███████║
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine as ctx} from "./engine";
// import {Resources} from "./resources";
import Entity from "./Entity";
//================================

/**
 * 
 * 
 * @export
 * @class Rock
 * @extends {Entity}
 */
export default class Rock extends Entity{
    constructor(x, y, sprite, w = 83, h = 83, ...otherArgs) {

        //x, y, speed, sprite
        super(x, y, sprite, w, h);

        this.name = "rock";
        // this.width = w;
        // this.height = h;
        [
            this.numberOfThis = 0, 
            this.numRows = 0
        ] = otherArgs;

    }

    // render(){
    //     super.render();
    // }

    static createMultiple(num, ...otherArgs){
        if(isNaN(num)) return;
        let allEntities = [],
            [winWidth, numRows, numCols] = otherArgs;

        for(let i=0; i < num; i++){
            let c = (i == 0 ? 1 : numRows-2 <= i ? i-1 : i);
            allEntities[i] = new this(c * 101+global.startCol+10, c * 101+global.startRow, 'img/Rock.png');
            // allEntities[i] = new this(Math.floor(Math.random() * ((numCols * 101) - 101)) + 101, Math.floor(Math.random() * (((numRows-2) * 83) - 83)) + 83,'img/Rock.png');
        }
        return allEntities;
    }

}