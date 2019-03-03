/**
 * @author Ahmed Salah
 * @github AH-SALAH
 * @create date 2018-12-01 20:15:44
 * @modify date 2019-01-25 21:20:43
 * @desc [app.js]
*/
// ==================================
// import all files from a dir that match regex
let cache = {};
function importAll (r) {
    r.keys().forEach((key) => {
        cache[key] = r(key);

        // get img which need to be converted to base64 by url-loader
        let getimgstr = key.split('/')[1].split('.')[0],
            img = document.querySelector('[alt="'+getimgstr+'"]'),
            imgsArray = []; // list of imgs name
            // console.log("getimgstr: ",getimgstr);
        if(img && /*$.inArray(getimgstr,imgsArray)*/imgsArray.indexOf(getimgstr) > -1){
            img.src = cache[key];
            // console.log("ifistrue: ",img);
        }
    });
}
//================================
// import all imgs
importAll(require.context('../img/', true, /\.(png|jpe?g|gif|svg)$/));
// import front-end necessary files
importAll(require.context('../../../src/', true, /(\.(ico|txt|xml|htaccess|webmanifest)?$|^.*(android|apple|favicon|safari|tile).*$)/));
// //import fonts files
// importAll(require.context('../scss/fonts/', true, /\.(woff(2)?|ttf|eot)(?=\?[A-Za-z0-9])?$|\.svg$/));
//================================
// import scss
import "../scss/app.scss";
//================================
//import needed files
import Game from "./Game";

//================================
////import jq
// import "jquery";
//================================
//// Import Bootstrap’s JavaScript
// import "bootstrap";
//// Alternatively, you may import plugins individually as needed:
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';
//================================
// import "./about.js";
// import "../../about.html";

//=================================
// import needed modules
// import LazyLoad from "vanilla-lazyload";
// import { setTimeout, clearTimeout, setInterval, clearInterval } from "timers";
// import { isString } from "util";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ███████╗████████╗ █████╗ ██████╗ ████████╗     █████╗ ██████╗ ██████╗          ██╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗         ██║██╔════╝
// ███████╗   ██║   ███████║██████╔╝   ██║       ███████║██████╔╝██████╔╝         ██║███████╗
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██╔══██║██╔═══╝ ██╔═══╝     ██   ██║╚════██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║       ██║  ██║██║     ██║         ╚█████╔╝███████║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝          ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


/*******************************************************************************/
// initialize the game object to start a new game
global.FroggerGame = new Game();
FroggerGame.initGame();


// ===============================================
// check & get key strokes
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        27: 'esc',
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        76: 'l', // level
        9: 'tab' 
    };
    // pass key to game handleInput
    FroggerGame.handleInput(allowedKeys[e.keyCode]);
});

//===============================================
document.addEventListener('mousemove',(e)=>{
    global.mx = e.clientX || e.layerX;
    global.my = e.clientY || e.layerY;
});

// ==================================================================
// TODO: 
// - Use LStorage to make things consistant after reset
// - Check to see how to insert gifs in Modal instead of static imgs
// - code Q revision 