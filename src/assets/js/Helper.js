/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [helper.js]
 */

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗          ██╗███████╗
// ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗         ██║██╔════╝
// ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝         ██║███████╗
// ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗    ██   ██║╚════██║
// ██║  ██║███████╗███████╗██║     ███████╗██║  ██║    ╚█████╔╝███████║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝     ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine as ctx} from "./engine";
// import {Resources} from "./resources";
// import Entity from "./Entity";
// import Enemy from "./Enemy";
// import Player from "./Player";
// import Gem from "./Gem";
// import Rock from "./Rock";
// import Life from "./Life";
// import Key from "./Key";
//================================



/**
 * 
 * 
 * @export
 * @class Helper
 */
export default class Helper{
    constructor() {
        this.isCollided = false;
    }
    /* check Collision */
    checkCollisions(entity1 = null, entity2 = null, canvas = null, onCollision = ()=>{}){
        if(!entity1 && !entity2 && !canvas) return;

        let enemies = Array.isArray(entity1) ? entity1 : entity2,
            player = !Array.isArray(entity1) ? entity1 : entity2; 
        
        return new Promise((resolve,reject)=>{

            if(Array.isArray(enemies)){

                for (let enemy of enemies) { // let i = 0; i < enemies.length; i++
                    // let enemy = enemies[i];
                
                    if(this.checkZone(player, canvas) == this.checkZone(enemy, canvas)){
                    
                        let bugSpace = enemy.name == 'bug' ? 100 : 0,
                            xCollide = player.x < enemy.x+enemy.width && player.y+bugSpace < enemy.y+enemy.height,
                            yCollide = player.x+player.width > enemy.x && player.y+player.height > enemy.y+bugSpace;
                            
                        if(xCollide && yCollide){
                            this.isCollided = true;
                            onCollision();
                            resolve({player, enemy, isCollided : this.isCollided});
                            // return {isCollided: this.isCollided, entities : {player, enemy}};
                        }else{
                            this.isCollided = false;
                            // reject(player, enemy, this.isCollided);
                            // return {isCollided: this.isCollided, entities : {player, enemy}};
                        }
                    }
                }

            }else{
                if(this.checkZone(player, canvas) == this.checkZone(enemies, canvas)){
                
                    let xCollide = (player.x < enemies.x+enemies.width-25 && player.x+player.width > enemies.x),
                        yCollide = player.y < enemies.y+enemies.height/3 && player.y+player.height/3 > enemies.y;
                        
                    if(xCollide && yCollide){
                        this.isCollided = true;
                        onCollision();
                        resolve({player, enemies, isCollided: this.isCollided});
                        // return {isCollided: this.isCollided, entities : {player, enemy:enemies}};
                    }else{
                        this.isCollided = false;
                        // reject(player, enemies, this.isCollided);
                        // return {isCollided: this.isCollided, entities : {player, enemy:enemies}};
                    }
                }
            }

            //TO DO : case of both are Arrays
        });

    }

    /* check entity Zone if same zone do check collision above */
    // z1 | z2
    //---------
    // z3 | z4
    checkZone(entity = null, ctx = null){
        if(!entity || !ctx) return;

        // let zone = 0;

        //[{x:x,y:y,w:w,h:h},{x:x,y:y,w:w,h:h},{x:x,y:y,w:w,h:h},{x:x,y:y,w:w,h:h}]
        let [zone1,zone2,zone3,zone4] = [
            {x:0,y:0,w:ctx.width/2,h:ctx.height/2},
            {x:ctx.width/2,y:0,w:ctx.width - (ctx.width/2),h:ctx.height/2},
            {x:0,y:ctx.height/2,w:ctx.width/2,h:ctx.height - (ctx.height/2)},
            {x:ctx.width/2,y:ctx.height/2,w:ctx.width - (ctx.width/2),h:ctx.height - (ctx.height/2)}
        ],
        quad = [zone1,zone2,zone3,zone4],
        entX = entity.x+entity.width/2,
        entY = entity.y+entity.height/2;

        for (let c = 0; c < quad.length; c++) {
            let z = quad[c];
            if(entX < z.w && entY < z.h){ //in zone1
                // console.log("entity in zone 1");
                return 1;
            }else if(entX > z.w && entX < ctx.width && entY < z.h){ //in zone2
                // console.log("entity in zone 2");
                return 2;
            }else if(entX < z.w && entY > z.h && entY < ctx.height){ //in zone3
                // console.log("entity in zone 3");
                return 3;
            }else if(entX > z.w && entX < ctx.width && entY > z.h && entY < ctx.height){ //in zone4
                // console.log("entity in zone 4");
                return 4;
            }
            
        }

    }


}