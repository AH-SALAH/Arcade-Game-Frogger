/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [Modal.js]
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ███╗   ███╗ ██████╗ ██████╗  █████╗ ██╗              ██╗███████╗
// ████╗ ████║██╔═══██╗██╔══██╗██╔══██╗██║              ██║██╔════╝
// ██╔████╔██║██║   ██║██║  ██║███████║██║              ██║███████╗
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══██║██║         ██   ██║╚════██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║  ██║███████╗    ╚█████╔╝███████║
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝     ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//================================
//import needed files
// import {Engine as ctx} from "./engine";
import {Resources} from "./resources";
// import Entity from "./Entity";
// import Player from "./Player";
// import "../../../node_modules/gifler/gifler";

//================================



/**
 * 
 * 
 * @export
 * @class Modal
 */
export default class Modal{
    constructor(...args){
        [
            this.canvas, 
            this.x,
            this.y,
            this.width, 
            this.height,
            this.leftArr = true,
            this.rightArr = false,
            // this.gifler = gifler
        ] = args;
    }
    
    // render method which get needed parameters to render Modal with corresponding game state data.
    render(...args){
        let [state, level, player, keyCode, img] = args;

        /* draw base Modal rect */

        // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.font = '26px coda,arial';
        // ctx.shadowBlur = 10;
        // ctx.shadowOffsetX = 10;
        // ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // ctx.beginPath();
        ctx.rect((this.canvas.width/2)/4,(this.canvas.height/2)/4,(this.canvas.width/2)*1.5,(this.canvas.height/2)*1.5);
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.textAlign ='center';
        ctx.fill();
        // ctx.clip();
        // ctx.closePath();

        /* show suitable state's Modal template */
        switch (state) {
            case 'paused':
                this.pauseTemplate(level, player, keyCode, state, img);
                break;
            case 'won':
                this.winningTemplate(level, player, keyCode, state, img);
                break;
            case 'lost':
                this.loseTemplate(level, player, keyCode, state, img);
                break;
            case 'stopped':
                this.defaultTemplate(level, player, keyCode, state, img);
                break;
            default:
            this.defaultTemplate(level, player, keyCode, state, img);
                break;
        }
  
    }


    /*
        Methods to actualy set the dialogue displayed by the render() method
    */
    winningTemplate(level, player, keyCode, state, img) {
        ctx.font = '28px coda,arial';
        ctx.fillStyle = 'mediumseagreen';
        ctx.fillText('YES! YOU WIN',(this.canvas.width/2),(this.canvas.height/2)/2);

        ctx.fillStyle = 'rgba(0,0,0,0.0)';
        ctx.fillRect((this.canvas.width/5),(this.canvas.height/2)/3, 150, 200);
        ctx.beginPath();
        ctx.rect((this.canvas.width/5),(this.canvas.height/2)/3, 150, 200);
        ctx.strokeStyle = 'mediumseagreen';
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'gold';
        ctx.fillText('Lifes: '+ player.lifes, (this.canvas.width/4),(this.canvas.height/2)/2);
        ctx.fillText('Gems: '+ player.gems, (this.canvas.width/4),(this.canvas.height/2)/2+50);
        ctx.fillText('Keys: '+ player.keys, (this.canvas.width/4),(this.canvas.height/2)/2+100);
        ctx.drawImage(Resources.get('img/Star.png'), (this.canvas.width/4.7),(this.canvas.height/2)/2+125);

        ctx.fillStyle = '#fff';
        ctx.fillText('Hit Enter key to play again',(this.canvas.width/2),(this.canvas.height/2)/2+50);
        // ctx.drawImage(Resources.get('img/Selector.png'), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
        if(img){
            // ctx.drawImage(Resources.get(img), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
            ctx.save();
            this.onDrawFrame(ctx, player, img);
            ctx.restore();
        }
        ctx.fillStyle = 'mediumseagreen';
        ctx.fillText('Congratulation Bug thieve!', global.mx+120, global.my);

    }

    /* lose state template */ 
    loseTemplate(level, player, keyCode, state, img) {
        ctx.font = '28px coda,arial';
        ctx.fillStyle = 'tomato';
        ctx.fillText('GAME OVER !',(this.canvas.width/2),(this.canvas.height/2)/2);
        ctx.fillStyle = '#fff';
        ctx.font = '24px arial';
        ctx.fillText('Hit Enter to start a new game',(this.canvas.width/2),(this.canvas.height/2)/2+50);
        if(img){
            // ctx.drawImage(Resources.get(img), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
            ctx.save();
            this.onDrawFrame(ctx, player, img);
            ctx.restore();
        }
        ctx.fillText('Loser! @J@', global.mx+60, global.my);
    }

    /* pause state template */
    pauseTemplate(level, player, keyCode, state, img) {
        ctx.font = '28px coda,arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('GAME PAUSED',(this.canvas.width/2),(this.canvas.height/2)/2);
        ctx.font = '24px arial';
        ctx.fillText('Hit the escape key again to resume',(this.canvas.width/2),(this.canvas.height/2)/2+50);
        if(img){
            // ctx.drawImage(Resources.get(img), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
            ctx.save();
            this.onDrawFrame(ctx, player, img);
            ctx.restore();
        }
        ctx.fillText('Zzzzzzzz', global.mx+60, global.my);

    }

    /* default state template [at start] */
    defaultTemplate(level, player, keyCode, state, img) {
        ctx.font = '28px coda,arial';
        ctx.fillStyle = '#fff';
        if(this.leftArr && state == 'stopped'){
            ctx.fillText('Get The Key!',(this.canvas.width/2),(this.canvas.height/2)/2);
            ctx.font = '24px arial';
            ctx.fillStyle = 'goldenrod';
            ctx.fillText('Hit Enter to start a new game',(this.canvas.width/2),(this.canvas.height/2)/2+60);
            ctx.fillText('Left Arrow [<] to Go to Settings / Instructions',(this.canvas.width/2),(this.canvas.height/2)/2+100);
            if(img){

                // this.gifler(img).frames(this.canvas, this.onDrawFrame);
                // this.gifler(img).animate(this.canvas);
                // ctx.drawImage(this.gifler(img).frames(this.canvas, this.onDrawFrame), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
                // ctx.drawImage(Resources.get(img), (this.canvas.width/2 - (player.width/1)),(this.canvas.height/2)/2+150);
                ctx.save();
                this.onDrawFrame(ctx, player, img);
                ctx.restore();
            }
        }

        /* show arrows [left or right] upon which key pressed with it's suitable data */

        if(this.rightArr && state == 'stopped'){
            ctx.font = '24px arial';
            ctx.fillStyle = 'gold';
            ctx.fillText('Note: Press Esc to pause/resume game',(this.canvas.width/2),(this.canvas.height/2)/2);
            ctx.fillText('Use [ L ] key to set game difficulty',(this.canvas.width/2),(this.canvas.height/2)/2+50);

            ctx.fillStyle = level == 'Easy' ? 'mediumslateblue' : level == 'Medium' ? 'mediumseagreen' : 'crimson';
            ctx.fillRect((this.canvas.width/2)-200/2,(this.canvas.height/2)/2+73, 200, 40);
            ctx.strokeStyle = level == 'Easy' ? 'mediumslateblue' : level == 'Medium' ? 'mediumseagreen' : 'crimson';
            ctx.lineWidth = 3;
            
            ctx.fillStyle = '#fff';
            ctx.fillText(level,(this.canvas.width/2),(this.canvas.height/2)/2+100);
            
            ctx.fillText('Choose player with Space key',(this.canvas.width/2),(this.canvas.height/2)/2+150);
            ctx.drawImage(Resources.get('img/Selector.png'), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
            ctx.drawImage(Resources.get(player.sprite), (this.canvas.width/2 - (player.width/2)),(this.canvas.height/2)/2+190);
        }

        /* drawing arrows */

        if(this.leftArr && state == 'stopped'){
            ctx.beginPath();
            ctx.moveTo(((this.canvas.width/2)/4)-20, (this.canvas.height/2)/1.35);
            ctx.lineTo(((this.canvas.width/2)/4)-70, (this.canvas.height/2));        
            ctx.lineTo(((this.canvas.width/2)/4)-20, (this.canvas.height/2)*1.30);
            ctx.lineTo(((this.canvas.width/2)/4)-20, (this.canvas.height/2)/1.35);
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fill();
            ctx.closePath();
        }
        if(this.rightArr && state == 'stopped'){
            ctx.beginPath();
            ctx.moveTo(((this.canvas.width/2)/4)+20+(this.canvas.width/2)*1.5, (this.canvas.height/2)/1.35);
            ctx.lineTo(((this.canvas.width/2)/4)+20+(this.canvas.width/2)*1.5+50, (this.canvas.height/2));        
            ctx.lineTo(((this.canvas.width/2)/4)+20+(this.canvas.width/2)*1.5, (this.canvas.height/2)*1.30);
            ctx.lineTo(((this.canvas.width/2)/4)+20+(this.canvas.width/2)*1.5, (this.canvas.height/2)/1.35);
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fill();
            ctx.closePath();
        }

        /* switch arrows depending on key code pressed */
        if(keyCode && keyCode == 'left' && state == 'stopped') { this.rightArr = true; this.leftArr = false; }
        if(keyCode && keyCode == 'right' && state == 'stopped') { this.leftArr = true; this.rightArr = false; }

    }

    /* Draw circle and desired img inside */
    onDrawFrame(ctx, frame, img) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.imageSmoothingQuality = 'high';
        // frame.interlaced = true;
        ctx.beginPath();
        ctx.arc(ctx.canvas.width/2,(ctx.canvas.height/2)/2+250, 100, 0 , 2*Math.PI);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.stroke();
        // ctx.fill();
        ctx.clip();
        // ctx.drawImage(frame.buffer,(ctx.canvas.width/2 - (frame.width/3)),(ctx.canvas.height/2)/2+150, 250, 200);
        if(img == 'img/Key.png'){
            ctx.drawImage(Resources.get(img), (ctx.canvas.width/2 - (frame.width/1)+50),(ctx.canvas.height/2)/2+150);
        }else{
            ctx.drawImage(Resources.get(img), (ctx.canvas.width/2 - (frame.width/1)), (ctx.canvas.height/2)/2+150, 250, 200);
        }
        ctx.closePath();
    }

    // playersTemplate(num, playersImg){
    //     // Resources.load(playersImg);
    //     // Resources.onReady(generate);

    //     return (function generate(){
    //         let allEntities = [];
    //         for (let i = 0; i < num; i++) {
    //             let c = (i == 0 ? 1 : i+1),
    //                 x = ((this.canvas.width/2)/4)*c+120,
    //                 y = ((this.canvas.height/2)/4)+65;

    //             if(x > (this.canvas.width-this.width)){
    //                 c = (c == 1 ? c+1 : num - c);
    //                 x = ((this.canvas.width/2)/4)*(c == 0 ? c+2 : c)+120;                    
    //                 y = (((this.canvas.height/2)/4)+65) * (c == 0 ? c+2 : c+1);
    //             }

    //             allEntities[i] = new Player(x, y, Array.isArray(playersImg) ? playersImg[i] : playersImg);
                
    //             // allEntities[i].render();
    //         }
    //         return allEntities;
    //     }).call(this);
    // }

    /* static method to create itself */
    static create(...args){
        let [
                canvas, 
                x,
                y,
                w, 
                h, 
                ...otherArgs
            ] = args;
        
        return new this(canvas, x = (canvas.width/2)/4, y = (canvas.height/2)/4, w = (canvas.width/2)*0.5, h = (canvas.height/1)*0.5, otherArgs);
    }

}