import {LoadScene} from "./scenes/LoadScene.js";
import {AbbeyScene} from "./scenes/AbbeyScene.js";
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: '#bd4545',
    parent: 'visite',
    scene:[LoadScene, AbbeyScene]
};
export { config }