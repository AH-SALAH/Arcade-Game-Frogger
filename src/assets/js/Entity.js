/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [entity.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ███████╗███╗   ██╗████████╗██╗████████╗██╗   ██╗         ██╗███████╗
// ██╔════╝████╗  ██║╚══██╔══╝██║╚══██╔══╝╚██╗ ██╔╝         ██║██╔════╝
// █████╗  ██╔██╗ ██║   ██║   ██║   ██║    ╚████╔╝          ██║███████╗
// ██╔══╝  ██║╚██╗██║   ██║   ██║   ██║     ╚██╔╝      ██   ██║╚════██║
// ███████╗██║ ╚████║   ██║   ██║   ██║      ██║       ╚█████╔╝███████║
// ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝   ╚═╝      ╚═╝        ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine} from "./engine";
import {Resources} from "./resources";
//================================



/**
 * 
 * 
 * @export
 * @class Entity
 */
export default class Entity{
    constructor(x, y, sprite, w, h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.sprite = sprite;
    }

    render(){
        ctx.globalAlpha = 1;
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
        // this.width = Resources.get(this.sprite).width;
        // this.height = Resources.get(this.sprite).height;
    }

    // static create(num, x, y, sprite, w, h, ...otherArgs){
    //     if(isNaN(num) && !otherArgs instanceof Array) return;
    //     let allEntities = [];
    //     for(let i=0;i<num;i++){
    //         let c = (i == 0 ? 1 : i);
    //         allEntities[i] = new this(x, y, sprite, w, h, otherArgs);
    //     }
    //     return allEntities;
    // }

}