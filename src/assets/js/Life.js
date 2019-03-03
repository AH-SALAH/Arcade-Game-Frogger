/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [lifes.js]
*/

//================================
//import needed files
// import {Engine} from "./engine";
// import {Resources} from "./resources";
import Entity from "./Entity"
//================================

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ███████╗████████╗ █████╗ ██████╗ ████████╗     █████╗ ██████╗ ██████╗          ██╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗         ██║██╔════╝
// ███████╗   ██║   ███████║██████╔╝   ██║       ███████║██████╔╝██████╔╝         ██║███████╗
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██╔══██║██╔═══╝ ██╔═══╝     ██   ██║╚════██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║       ██║  ██║██║     ██║         ╚█████╔╝███████║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝          ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


export default class Life extends Entity{

    constructor(x, y, sprite, w = 53, h = 90, ...otherArgs) {

        //x, y, speed, sprite
        super(x, y, sprite, w, h);
        // super(y);
        // super(sprite);
        // this.x = 0;
        this.name = "life";
        [
            this.numberOfThis = 0, 
        ] = otherArgs;
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
        ctx.fillText(String(this.getNumberOfLifes()), this.x+(this.width/2)*3, this.y+(this.height/2)+26/2);
        // this.width = Resources.get(this.sprite).width;
        // this.height = Resources.get(this.sprite).height;
    }

    reset(){
        this.x = Math.floor(Math.random() * ((window.innerWidth-101) - 101)) + 101;
        this.y = Math.floor(Math.random() * ((this.numRows*65) - 55*2)) + 65;
    }

    addLife(){
        this.numberOfThis++;
    }
    
    subtractLife(){
        this.numberOfThis == 0 ? this.numberOfThis : this.numberOfThis--;
    }

    getNumberOfLifes(){
        return this.numberOfThis;
    }

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
//     this.x += this.x * dt;
//     this.y += this.y * dt;
//     this.speed += 1 * dt;
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// var allEnemies = [Enemy];
// export default {allEnemies};
// Place the player object in a variable called player
// }