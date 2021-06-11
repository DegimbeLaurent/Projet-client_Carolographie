import {LoadScene} from "./scenes/LoadScene.js";
import {AbbeyScene} from "./scenes/AbbeyScene.js";
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = window.innerHeight-20;
const DEFAULT_WIDTH = window.innerWidth-20;
const config = {
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#bd4545',
    parent: 'visite',
    scene:[LoadScene, AbbeyScene],
    speed: 300
};
export { config }