//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  ██████╗  █████╗ ███╗   ███╗███████╗         ██╗███████╗
// ██╔════╝ ██╔══██╗████╗ ████║██╔════╝         ██║██╔════╝
// ██║  ███╗███████║██╔████╔██║█████╗           ██║███████╗
// ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██   ██║╚════██║
// ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚█████╔╝███████║
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// import {Resources} from "./resources";
import Engine from './engine';
import Enemy from "./Enemy";
import Player from "./Player";
import Gem from "./Gem";
import Rock from "./Rock";
import Life from "./Life";
import Key from "./Key";
import Modal from "./Modal";
// import Cursor from "./Cursor";
import Helper from "./Helper";




/********************************************************************************
   Game class: the class wich will hold the game object and handle all modification
*******************************************************************************/
/**
 * 
 * 
 * @export
 * @class Game
 */
export default class Game {
    constructor() {

        // Difficulty levels (0: easy to 3: difficult) for arr levels[0,1,2,..] indx count
        this.levelCount = 0;
        // init lvl val
        this.level = 'Easy';
        // levels
        this.levels = ['Easy','Medium','Hard'];
        // Current state of the game
        this.state = 'stopped';
        // Array of images of all possible players character
        this.players = [
            'img/char-boy.png',
            'img/char-cat-girl.png',
            'img/char-horn-girl.png',
            'img/char-pink-girl.png',
            'img/char-princess-girl.png'
        ];
        this.loserImgs = [
            'img/loo-ser.gif',
            // 'img/happybug.gif',
            'img/happybugs.gif'
        ];
        this.winnerImg = [
            'img/clapping.gif',
            'img/congs.gif',
            'img/seaotter.gif',
            // 'img/thumbsup.gif'
        ];
        this.zzz = [
            'img/zzz.gif'
        ];
        this.startImg = [
            'img/Key.png'
        ];
        // Current player index sprite used to change it
        this.currentSprite = 0;

        this.canvas = ctx.canvas;
        this.winWidth = this.canvas.width;
        this.winHeight = this.canvas.height;
        this.numRows = numRows;
        this.numCols = numCols;
        this.numOfBugs = 6;
        this.numOfKeys = 1;
        this.numOfRocks = 1;
        this.gemColor = ['Blue','Green','Orange'];
        this.allBugs=[];
        this.bugsSpeeds = [];
        this.allGems=[];
        this.allKeys=[];
        this.allRocks=[];
        this.player = new Player(101*2,this.numRows*83-101, this.players[this.currentSprite]);
        this.heroPlayer = new Player(this.winWidth-101,-30,this.players[this.currentSprite], 60, 90);
        this.life = new Life(101,-22,'img/Heart.png', 43, 80, 5);
        this.gemCounter = new Gem(101*2,-22,`img/Gem ${this.gemColor[2]}.png`, 33, 70);
        this.keyCounter = new Key(101*3,-17,'img/Key.png', 33, 70);
        this.keyIsCollidedPromise = ()=>{};
        this.keyIsCollided = new Promise((resolve,reject)=> this.keyIsCollidedPromise = resolve);
        this.keyIsRenderedPromise = ()=>{};
        this.keyIsRendered = new Promise((resolve,reject)=> this.keyIsRenderedPromise = resolve);
        this.helper = new Helper();
        this.modal = Modal.create(ctx.canvas);
        this.keyCode = '';
        this.randomWinImg = '';
        this.randomLoseImg = '';
        this.randomPauseImg = '';
        // this.randomPlayerImg = '';


    }
    /*******************************************************************************
            Methods of Game class
    *******************************************************************************/
    /*
        Method to start a new game, initialization of everything in the game
    */
    initGame() {

        this.state = 'stopped';
        this.bugsSpeeds = []; // empty bug speed with every init

        // change the state and create entities depending on the choosed lvl
        switch(this.level) {
            case 'Easy':
                this.numOfBugs = 4;

                this.allBugs = Enemy.createMultiple(this.numOfBugs, this.numRows);
                this.allGems = Gem.createMultiple(this.gemColor.length+2, this.winWidth, this.gemColor, this.numCols);
                this.allRocks = [];
                // for caching original bug speed as it'll be stoped or zerolized [= 0] upon pause state
                for (let bug of this.allBugs) {
                    this.bugsSpeeds.push(bug.speed);
                }

                this.changeState(this.state, this.bugsSpeeds);
            break;
            case 'Medium':
                this.numOfBugs = 5;
                this.numOfRocks = 2;

                this.allBugs = Enemy.createMultiple(this.numOfBugs, this.numRows);
                this.allGems = Gem.createMultiple(this.numCols/1.6, this.winWidth, this.gemColor, this.numCols);
                this.allRocks = Rock.createMultiple(this.numOfRocks, this.winWidth, this.numRows, this.numCols);
            
                for (let bug of this.allBugs) {
                    this.bugsSpeeds.push(bug.speed);
                }

                this.changeState(this.state, this.bugsSpeeds);
            break;
            case 'Hard':
                this.numOfBugs = 7;
                this.numOfRocks = 3;

                this.allBugs = Enemy.createMultiple(this.numOfBugs, this.numRows);
                this.allGems = Gem.createMultiple(this.numCols, this.winWidth, this.gemColor, this.numCols);
                this.allRocks = Rock.createMultiple(this.numOfRocks, this.winWidth, this.numRows, this.numCols);
            
                for (let bug of this.allBugs) {
                    this.bugsSpeeds.push(bug.speed);
                }

                this.changeState(this.state, this.bugsSpeeds);
            break;
        };
        // random img for game states to show in modal
        this.randomWinImg = this.winnerImg[Math.floor(Math.random() * ((this.winnerImg.length-1)-0) + 1) + 0];
        this.randomLoseImg = this.loserImgs[Math.floor(Math.random() * ((this.loserImgs.length-1)-0) + 1) + 0];
        this.randomPauseImg = this.zzz[Math.floor(Math.random() * (this.zzz.length-1)-0)/* + 0) + 0*/];
        // let randomDefaultImg = this.players[Math.floor(Math.random() * (this.players.length-1) - 0) + 0];

    } // end initGame

    /*
        Method to change the state of the game according player's action
    */
    changeState(state, speeds) {
        this.state = state;

        if (state == 'running') {
            // if running return original cached bug's speed
            for (let i=0;i<this.allBugs.length;i++) {
                this.allBugs[i].speed = this.bugsSpeeds[i];
            }
        }
        else {
            // if not running stop bugs
            for (let bug of this.allBugs) {
                bug.speed = 0;
            }
        }
    }
    /*
        Methods to render the Game object according to its state. default is the starting state.
        Done by opening a modal with corresponding data. else if game is running then check for collisions
    */
    render() {
        if (this.state != 'running') {
            switch (this.state) {
                case 'won':
                    this.modal.render(this.state, this.level, this.player, this.keyCode, this.randomWinImg);
                    break;
                case 'lost':
                    this.modal.render(this.state, this.level, this.player, this.keyCode, this.randomLoseImg);
                    break;
                case 'paused':
                    this.modal.render(this.state, this.level, this.player, this.keyCode, this.randomPauseImg);
                    break;
            
                default:
                    this.modal.render(this.state, this.level, this.player, this.keyCode, this.startImg[0]);
                    break;
            }
        }

        if(this.state == 'running'){
            if(this.allBugs){
                this.helper.checkCollisions(this.player, this.allBugs, this.canvas).then((res)=>{
                    res.player.reset();
                    this.life.subtractLife();
                    this.player.lifes = this.life.getNumberOfLifes();
                    if(this.life.numberOfThis == 0) this.changeState('lost', this.bugsSpeeds); 
                });
            }

            if(this.allGems){
                this.helper.checkCollisions(this.player, this.allGems, this.canvas).then((res)=>{
                    let gem = this.allGems.filter((gem,i) => (gem.x == res.enemy.x && gem.y == res.enemy.y) ? this.allGems.splice(i,1) : gem);
                    this.gemCounter.countUp();
                    this.player.gems = this.gemCounter.getNumberOfThis();
                    if(this.gemCounter.numberOfThis % 5 == 0) {
                        this.life.addLife();
                        this.player.lifes = this.life.getNumberOfLifes();
                    } 

                    if(this.allGems.length == 0) this.allKeys = Key.createMultiple(this.numOfKeys, this.winWidth, this.numRows, this.numCols);
                });
            }

            // if key is rendered check it's collision
            this.keyIsRendered.then((res)=>{
                if(res){
                    this.helper.checkCollisions(this.player, this.allKeys, this.canvas).then((res)=>{
                        let key = this.allKeys.filter((key,i) => (key.x == res.enemy.x && key.y == res.enemy.y) ? this.allKeys.splice(i,1) : key);
                        this.keyCounter.countUp();
                        this.player.keys = this.keyCounter.getNumberOfThis();
                        this.keyIsCollidedPromise(true);
                        this.changeState('won', this.bugsSpeeds);
                    });
                }
            });

            if(this.allRocks){
                this.helper.checkCollisions(this.player, this.allRocks, this.canvas).then((res)=>{
                    // needs revision
                    if(res.player.x < res.enemy.x+res.enemy.width){
                        this.player.x += res.player.stepX;
                    }
                    else if(res.player.y+30 < res.enemy.y+res.enemy.height){
                        this.player.y += res.player.stepY;
                    }
                    else if(res.player.x+res.player.width > res.enemy.x){
                        this.player.x -= res.player.stepX;
                    }
                    else if(res.player.y+res.player.height > res.enemy.y+30){
                        this.player.y -= res.player.stepY;
                    }
                });
            }
        }


    }

    /*
        Method to handle the allowed keys and change the game state or pass the
        stroked key to the Player's move(key) method to have it move.
    */
    handleInput(key) {
        this.keyCode = key;
        switch (key) {
            case "esc":
                if (this.state == "running") {
                    this.changeState("paused", this.bugsSpeeds);
                }
                else if (this.state == "paused") {
                    this.changeState("running", this.bugsSpeeds);
                }
            break;
            
            case "enter":
                if (this.state == "stopped") {
                    this.changeState('running', this.bugsSpeeds);
                } else {
                    if ((this.state == 'lost')||(this.state == 'won')) {
                        this.changeState('stopped', this.bugsSpeeds);
                        this.initGame();
                        this.life.numberOfThis = 5;
                        this.gemCounter.numberOfThis = 0;
                        this.keyCounter.numberOfThis = 0;
                        this.player.lifes = 5;
                        this.player.keys = 0;
                        this.player.x = this.player.startX;
                        this.player.y = this.player.startY;
                    }
                }
                break;

            case 'space':
                if (this.state == 'stopped') {
                    (this.currentSprite < this.players.length-1) ? this.currentSprite++ : this.currentSprite = 0;
                    this.player.sprite = this.players[this.currentSprite];
                    this.heroPlayer.sprite = this.players[this.currentSprite];
                };
                break;
            
            case 'l':
                if (this.state == 'stopped') {
                    (this.levelCount < this.levels.length-1) ? this.levelCount++ : this.levelCount = 0;
                    this.level = this.levels[this.levelCount];
                    this.initGame();
                };
                break;
            
            // Not a game menu call the Player's method
            default:
                if (this.state == "running") this.player.move(key);
                break;
        }
    }

    //   Update timer, display timer in hh:mm:ss format.
    //   const hrs = Math.trunc(this.timer/3600);
    //   const mins = (Math.trunc(this.timer/60)-(hrs*60));
    //   const secs = (this.timer-((hrs*3600)+(mins*60)));
    //   (hrs<10) ? stringTime = '0'+hrs+':' : stringTime = hrs+':';
    //   (mins<10) ? stringTime = stringTime+'0'+mins+':' : stringTime = stringTime+mins+':';
    //   (secs<10) ? stringTime = stringTime+'0'+secs : stringTime = stringTime+secs;
    //   document.getElementById('time').textContent = stringTime;


    getGlobals(...args){

        let [allBugs,
            allGems,
            allRocks,
            allKeys,
            life,
            gemCounter,
            keyCounter,
            player] = args;

        return {allBugs, allGems, allRocks, allKeys, life, gemCounter, keyCounter, player};
    }

    static createUrSelf(){
        return new this();
    }


} // end game class