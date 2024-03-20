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
import { Goblin } from "./goblin.js";
import { Door } from "./door.js";

function generateWorld(objectArray, gameWorldElem, colMan, goblinArr, level) {
    // Contains the gameWorld div height/width (for dynamic purpowses)
    // Bring this in from style, rather than clientHeight/width
    const gameWorldDimension = {
        height: gameWorldElem.clientHeight,
        width: gameWorldElem.clientWidth,
    };
    objectArray.forEach(object => {
        let objCol;
        let elem = parseObjToDiv(object, gameWorldDimension)
        gameWorldElem.appendChild(elem);


        if (object.objectType === "magenta") {
           let door = new Door(elem, level)
           
            objCol = new AABBItem(door, "door")


        } else if (object.objectType === "brown") {
            let goblin = new Goblin(elem)
            goblinArr.push(goblin)
            objCol = new AABBItem(goblin, "goblin")
        } else {
            objCol = new AABBItem(elem, object.objectType)
        }

        colMan.addEntity(objCol)

    });
}

// This function turns a single bitmap Obj to a Div ready to be placed in the gameworld
function parseObjToDiv(bitmapObj, gameWorldDimension) {
    let SizeRatio
    const ScaleRatio = 48;
    if (bitmapObj.objectType === "brown") {
        SizeRatio = 64
    } else if (bitmapObj.objectType === "magenta") {
        SizeRatio = 96;
    } else SizeRatio = 48;

    const newDivElem = document.createElement('div');
    newDivElem.className = bitmapObj.objectType;
    newDivElem.id = bitmapObj.objectType;
    newDivElem.style.width = (bitmapObj.width * SizeRatio) + 'px';
    newDivElem.style.height = (bitmapObj.height * SizeRatio) + 'px';
    // Color depending on the object Type *TODO

    if (bitmapObj.objectType === "magenta") {
        newDivElem.style.backgroundImage = "url('assets/EndDoorTileSet.webp')"
    }
    if (bitmapObj.objectType === "brown") {
        newDivElem.style.backgroundImage = "url('assets/goblin.png')"
    } else {
        newDivElem.style.backgroundColor = 'none';
    }
    //console.log(bitmapObj);


    let leftPos = bitmapObj.x * ScaleRatio + 'px';
    let topPos = (gameWorldDimension.height - (bitmapObj.y * ScaleRatio)) - (bitmapObj.height * SizeRatio) + 'px';
    newDivElem.style.position = 'absolute';
    newDivElem.style.left = leftPos;
    newDivElem.style.top = topPos;
    return newDivElem;
}

/** @type {bitmapObject[]} */
const bitmapObjects = [];

export { bitmapObjects, generateWorld };