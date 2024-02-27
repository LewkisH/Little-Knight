//


function generateTextures(objectArray) {
    // These come from bitmapReader width/height (currently hardcoded)
    let width = 100
    let height = 50

    let gameTiles = create2Dtilemap(height, width);
    console.log("This");
    // add Objects to 2d array
    objectArray.forEach(object => {
        let startX = object.x;
        let startY = height - object.y - object.height;
        let endX = startX + object.width;
        let endY = height - object.y;

        for (let i = startY; i < endY; i++) {
            for (let j = startX; j < endX; j++) {
                switch (object.objectType) {
                    case ('black'): // black air
                    gameTiles[i][j] = 0;
                    break;
                    case ('green'): // green solid
                    gameTiles[i][j] = 1;
                    break;
                    case ('blue'): // blue platform
                    gameTiles[i][j] = 2;
                    break;
                    case ('red'): // red hazard
                    gameTiles[i][j] = 3;
                    break;
                    case ('yellow'): // yellow collectible
                    gameTiles[i][j] = 4;
                    break;
                    case ('cyan'): // cyan spawn
                    gameTiles[i][j] = 5;
                    break;
                    case ('invisible'): // white invisible
                    gameTiles[i][j] = 6;
                    break;
                    case ('brown'): // brown
                    gameTiles[i][j] = 7;
                    break;
                    default:
                    gameTiles[i][j] = -1;
                    break;
                }
                // gameTiles[i][j] = object.objectType;
            }
        }
    });


    // Display the array
    // gameTiles[35][1] = 9;
    // gameTiles[36][1] = 7;
    // checkTile(gameTiles, 'mid', 35, 1);
    // checkTile(gameTiles, 'right', 35, 1);
    // checkTile(gameTiles, 'left', 35, 1);
    // checkTile(gameTiles, 'left-up', 35, 1);
    // checkTile(gameTiles, 'left-dn', 35, 1);
    // checkTile(gameTiles, 'right-up', 35, 1);
    // checkTile(gameTiles, 'right-dn', 35, 1);
    // checkTile(gameTiles, 'up', 35, 1);
    // console.log(checkTile(gameTiles, 'dn', 35, 1));






    let assignedGameTiles = pickATile(gameTiles, 1);

    displayGameTiles(gameTiles);
    displayGameTiles(assignedGameTiles);
    // displayGameTiles(clonedArray);

    // console.log(objectArray);

}
// Changes the tile to a tileposition (using tileType 1-9)
function pickATile(gameTiles, tileType) {
    let assignedGameTiles = clone2Darray(gameTiles);

    for (let y = 0; y < gameTiles.length; y++) {
        for (let x = 0; x < gameTiles[y].length; x++) {
            const value = gameTiles[y][x]
            // if matches the tileTYpe we are looking to add tileTypes
            if (value === tileType) {
                // should be left-up/LT?
                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType && 
                checkTile(gameTiles, 'up', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'LT';
                }
                // should be right-up/RT?
                if (
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'RT';
                }
                // should be left-dn/LB?
                if (
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'LB';
                }
                // should be right-dn/RB?
                if (
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'RB';
                }
                // should be top/T?
                if (
                (checkTile(gameTiles, 'up', y, x) !== tileType &&
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType) || 
                (checkTile(gameTiles, 'dn', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) !== tileType)
                ) {
                    assignedGameTiles[y][x] = 'TT';
                }

                // should be bot/B?
                if (
                (checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType) ||
                (checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType)
                ) {
                    assignedGameTiles[y][x] = 'BB';
                }

                // should be center/C?
                if (
                checkTile(gameTiles, 'dn', y, x) === tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType
                ) {
                    assignedGameTiles[y][x] = 'CC';
                }

                // should be left/LC?
                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'dn', y, x) === tileType
                ) {
                    assignedGameTiles[y][x] = 'LC';
                }

                // should be right/RC?
                if (
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'dn', y, x) === tileType
                ) {
                    assignedGameTiles[y][x] = 'RC';
                }

                // if is single pixel should be T
                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType 
                ) {
                    assignedGameTiles[y][x] = 'TT';
                }




            }
        }
    }

    return assignedGameTiles;
}


// Checks adjacent and diagonal tiles and returns their value
/**
 * Directions:
 * +---------+------+----------+
 * | left-up |  up  | right-up |
 * +---------+------+----------+
 * | left    |  mid |  right   |
 * +---------+------+----------+
 * | left-dn |  dn  | right-dn |
 * +---------+------+----------+
 */
function checkTile(gameTiles, direction, y, x) {
    let checkX = x;
    let checkY = y;
    let tileValue;
    switch(direction) {
        case ('mid'):
            // console.log(`Value at mid X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('up'):
            checkY -= 1;
            // console.log(`Value at up X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('dn'):
            checkY += 1;
            // console.log(`Value at dn X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('right'):
            checkX += 1;
            // console.log(`Value at right X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('right-up'):
            checkX += 1;
            checkY -= 1;
            // console.log(`Value at right-up X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('right-dn'):
            checkX += 1;
            checkY += 1;
            // console.log(`Value at right-dn X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('left'):
            checkX -= 1;
            // console.log(`Value at left X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('left-up'):
            checkX -= 1;
            checkY -= 1;
            // console.log(`Value at left-up X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
        case ('left-dn'):
            checkX -= 1;
            checkY += 1;
            // console.log(`Value at left-dn X:${checkX} Y:${checkY} | IS: ${gameTiles[checkY][checkX]}`)
            // tileValue = gameTiles[checkY][checkX];
            break;
    }


    if (
        checkY >= 0 &&
        checkY < gameTiles.length &&
        checkX >= 0 &&
        checkX < gameTiles[checkY].length
    ) {
        tileValue = gameTiles[checkY][checkX];
    } else {
        tileValue = -1;
    }


    // // If tilevalue === undefined => out of boundaries
    // if (typeof tileValue === undefined) {
    //     tileValue = -1
    // }

    return tileValue;
}



//Helper function for debugging
function displayGameTiles(gameTiles) {
    let output = '\n'
    for (let i = 0; i < gameTiles.length; i++) {
        for (let j = 0; j < gameTiles[i].length; j++) {
            let value = gameTiles[i][j];
            if (typeof value === 'number') {
                value = value.toString().padStart(2, '0');
            }
            output += value + ' ';
        }
        output += '\n'
    }
    console.log(output);
}

//Helper function for debugging
// function displayGameTiles(gameTiles) {
//     let output = '\n'
//     for (let i = 0; i < gameTiles.length; i++) {
//         output += JSON.stringify(gameTiles[i]) + '\n';
//     }
//     console.log(output);
// }

// Creates a deep copy of 2dArray
function clone2Darray (array) {
    const clone = [];
    for (let i = 0; i < array.length; i++) {
        clone[i] = array[i].slice();
    }
    return clone;
}

// Creates 2dTileMap fills with default value 0's
function create2Dtilemap(height, width) {
    const array = new Array(height);
    for (let i = 0; i < height; i++) {
        array[i] = new Array(width).fill(0);
    }
    return array;
}

export { generateTextures };
