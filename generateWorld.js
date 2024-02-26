/**
 * Array of Objects from bitmapReader.js
 * Each object in array will have these attributes:
 * @typedef {Object} bitmapObject
 * @property {string} objectType - Type of the object e.g("platform", "ground", "playerSpawn", ...)
 * @property {number} x - The x-coord of the object in gameworld
 * @property {number} y - The y-coord of the object in gameworld
 * @property {number} width - The width of the object
 * @property {number} height - The height of the object
 */

/**
 * Function that expects an array of objects with the specified attributes to create game world
 * @param {bitmapObject[]} objectArray - Array of objects to add to the game world
 * @param {HTMLElement} gameWorldElem - The element that represents the game world
 */

import { CollisionManager, AABBItem } from "./collision.js";

function generateWorld(objectArray, gameWorldElem, colMan) {
    // Contains the gameWorld div height/width (for dynamic purpowses)
    // Bring this in from style, rather than clientHeight/width
    const gameWorldDimension = {
        height: gameWorldElem.clientHeight,
        width: gameWorldElem.clientWidth,
    };
    objectArray.forEach(object => {
        let elem =parseObjToDiv(object, gameWorldDimension)
        gameWorldElem.appendChild(elem);
        let objCol = new AABBItem(elem, object.objectType)
        colMan.addEntity(objCol)
    });
}

// This function turns a single bitmap Obj to a Div ready to be placed in the gameworld
function parseObjToDiv(bitmapObj, gameWorldDimension) {
    const ScaleRatio = 48;
    const newDivElem = document.createElement('div');
    newDivElem.className = bitmapObj.objectType;
    newDivElem.id = bitmapObj.objectType;
    newDivElem.style.width = (bitmapObj.width * ScaleRatio) + 'px';
    newDivElem.style.height = (bitmapObj.height * ScaleRatio) + 'px';
    // Color depending on the object Type *TODO
   
    newDivElem.style.backgroundColor = bitmapObj.objectType;
    console.log(bitmapObj);
    if (bitmapObj.objectType === 'green') {
        for (let y = bitmapObj.height - 1; y >= 0; y--) {
            for (let x = 0; x < bitmapObj.width; x++) {
                const tile = document.createElement('div');
                tile.style.width = ScaleRatio + 'px';
                tile.style.height = ScaleRatio + 'px';
                // tile.style.backgroundColor = "yellow";
                tile.style.position = 'absolute';
                tile.style.left = (x * ScaleRatio) + 'px';
                tile.style.top = ((bitmapObj.height - 1 - y) * ScaleRatio) + 'px';

                // Determine the tile positioning
                let tileType = '';
                if (bitmapObj.height === 1) {
                    if (x === 0) {
                        tileType = '1left';
                    } else if (x === bitmapObj.width - 1) {
                        tileType = '1right';
                    } else {
                        tileType = '1center';
                    }
                } else if (bitmapObj.width === 1) {
                if (y === 0) {
                    tileType = '1bottom';
                } else if (y === bitmapObj.height - 1) {
                    tileType = '1top';
                } else {
                    tileType = 'center'
                }
                } else {
                    if (y === 0 && x === 0) {
                        tileType = 'left-bottom-corner';
                    } else if (y === 0 && x === bitmapObj.width - 1) {
                        tileType = 'right-bottom-corner';
                    } else if (y === bitmapObj.height - 1 && x === 0) {
                        tileType = 'left-top-corner';
                    } else if (y === bitmapObj.height - 1 && x === bitmapObj.width - 1) {
                        tileType = 'right-top-corner';
                    } else if (y === 0) {
                        tileType = 'bottom-edge';
                    } else if (y === bitmapObj.height - 1) {
                        tileType = 'top-edge';
                    } else if (x === 0) {
                        tileType = 'left-edge';
                    } else if (x === bitmapObj.width - 1) {
                        tileType = 'right-edge';
                    } else {
                        tileType = 'center';
                    }
                }
                switch (tileType) {
                    case 'left-top-corner':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${0}px ${0}px`;
                        break;
                    case 'left-bottom-corner':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${0}px ${-96}px`;
                        break;
                    case 'right-top-corner':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-96}px ${0}px`;
                        break;
                    case 'right-bottom-corner':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-96}px ${-96}px`;
                        break;
                    case 'top-edge':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-48}px ${0}px`;
                        break;
                    case 'bottom-edge':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-48}px ${-96}px`
                        break;
                    case 'left-edge':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")'
                        tile.style.backgroundPosition =  `${0}px ${-48}px`;
                        break;
                    case 'right-edge':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-96}px ${-48}px`;
                        break;
                    case 'center':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-48}px ${-48}px`;
                        break;
                    case '1right':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-96}px ${0}px`;
                        break;
                    case '1left':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${0}px ${0}px`;
                        break;
                    case '1center':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-48}px ${0}px`;
                        break;
                    case '1top':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-48}px ${0}px`;
                        break;
                    case '1bottom':
                        tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
                        tile.style.backgroundPosition =  `${-48}px ${-48}px`;
                        break;
                    default:
                        tile.style.backgroundColor = 'gray';
                }
                tile.style.backgroundRepeat = 'no-repeat';
                newDivElem.appendChild(tile);
            }
        }
    }
        
    let leftPos = bitmapObj.x * ScaleRatio + 'px';
    let topPos = (gameWorldDimension.height - (bitmapObj.y * ScaleRatio)) - (bitmapObj.height * ScaleRatio) + 'px';
    newDivElem.style.position = 'absolute';
    newDivElem.style.left = leftPos;
    newDivElem.style.top = topPos;
    return newDivElem;
}

/** @type {bitmapObject[]} */
const bitmapObjects = [];

export { bitmapObjects, generateWorld };