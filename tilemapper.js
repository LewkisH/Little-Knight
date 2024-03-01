//

function createTextureLayerDiv(gameWorldElem, objectArray) {

    const assignedGameTiles = (generateTextures(objectArray)).assignedTiles;
    const tilemap = (generateTextures(objectArray)).tilemap;
    const textureLayer = document.createElement('div');
    textureLayer.id = 'textureLayer';
    textureLayer.style.width = gameWorldElem.offsetWidth + 'px';
    textureLayer.style.height = gameWorldElem.offsetHeight + 'px';
    textureLayer.style.position = 'absolute';
    textureLayer.style.top = '0';
    textureLayer.style.left = '0';
    // tiles


    // console.log("here CONVERSION!!");
    // console.log(assignedGameTiles[0].length);

    // console.log(convertXY({gameWorldX: assignedGameTiles[0].length, gameWorldY: assignedGameTiles.length,  x: 0, y:0 }));

    // const tile = buildTileDiv({className: 'tile-ground', color: 'white', x: 1, y: 1, tileSetVal: 'TT'})
    // const tile = document.createElement('div');
    // tile.className = 'tile';
    // tile.style.width = '48px';
    // tile.style.height = '48px';
    // tile.style.backgroundColor = 'white';
    // tile.style.position = 'absolute';
    // tile.style.bottom = 48 + 'px';
    // tile.style.left = 0 + 'px';

    for (let y = 0; y < tilemap.length; y++) {
        for (let x = 0; x < tilemap[y].length; x++) {
            const value = tilemap[y][x]
            if (value === 0) {
                continue;
            }
            // for 1-ground objects
            if (value === 1) {
                let tileChunck = assignedGameTiles[y][x];
                const tile = buildTileDiv({className: 'tile-ground', color: 'white', x: x, y: y, tileChunck: tileChunck, textureURL: `url("./assets/MainTileSet.webp")`});
                textureLayer.appendChild(tile);
            }
        }
    }
    // console.log(assignedGameTiles[1][1]);

    // textureLayer.appendChild(tile);





    gameWorldElem.appendChild(textureLayer);

}

function buildTileDiv({className, color, x, y, tileChunck, textureURL}) {
    const tile = document.createElement('div');
    // tile.className = className;
    tile.className = tileChunck;
    tile.style.width = '48px';
    tile.style.height = '48px';
    // tile.style.backgroundColor = color;
    tile.style.position = 'absolute';
    tile.style.bottom = (y * 48) + 'px';
    tile.style.left = (x * 48) + 'px';
    tile.style.backgroundImage = textureURL;

    switch (tileChunck) {
        case 'LT':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${0}px ${0}px`;
            break;
        case 'LB':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${0}px ${-96}px`;
            break;
        case 'RT':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${-96}px ${0}px`;
            break;
        case 'RB':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${-96}px ${-96}px`;
            break;
        case 'TT':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${-48}px ${0}px`;
            break;
        case 'BB':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${-48}px ${-96}px`
            break;
        case 'LC':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")'
            tile.style.backgroundPosition =  `${0}px ${-48}px`;
            break;
        case 'RC':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${-96}px ${-48}px`;
            break;
        case 'CC':
            // tile.style.backgroundImage = 'url("./assets/grassTopC.webp")';
            tile.style.backgroundPosition =  `${-48}px ${-48}px`;
            break;
        case 'SP':
            tile.style.backgroundPosition =  `${-144}px ${-144}px`;
            break;
        // debugging case (REMOVE later)
        case 'XX':
            tile.style.background = 'none';
            tile.style.backgroundColor = 'pink';
            break;
        case 'BR':
            tile.style.backgroundPosition =  `${-240}px ${-48}px`;
            break;
        case 'BL':
            tile.style.backgroundPosition =  `${-192}px ${-48}px`;
            break;
        case 'ST':
            tile.style.backgroundPosition =  `${-48}px ${-144}px`;
            break;
        case 'SC':
            tile.style.backgroundPosition =  `${-144}px ${-48}px`;
            break;
        case 'CL':
            tile.style.backgroundPosition =  `${-336}px ${0}px`;
            break;
        case 'CR':
            tile.style.backgroundPosition =  `${-288}px ${0}px`;
            break;
        case 'SL':
            tile.style.backgroundPosition =  `${0}px ${-144}px`;
            break;
        case 'SR':
            tile.style.backgroundPosition =  `${-96}px ${-144}px`;
            break;
        case 'BH':
            tile.style.backgroundPosition =  `${-144}px ${-96}px`;
            break;
        case 'SW':
            tile.style.backgroundPosition =  `${-144}px ${-0}px`;
            break;
        case 'BC':
            tile.style.backgroundPosition =  `${-288}px ${-48}px`;
            break;
        case 'LS':
            tile.style.backgroundPosition =  `${-192}px ${-96}px`;
            break;
        case 'MM':
            tile.style.backgroundPosition =  `${-240}px ${-96}px`;
            break;
        case 'CP':
            tile.style.backgroundPosition =  `${-288}px ${-96}px`;
            break;
        default:
            tile.style.backgroundColor = 'gray';
    }

    tile.style.backgroundRepeat = 'no-repeat';
    return tile;
}

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


    let assignedGameTiles = pickATile(gameTiles, 1); // do this for other elements aswell not just 1-ground *TODO

    let reversedAssignedGTiles = reverse2Darray(assignedGameTiles);
    let reversedGameTiles = reverse2Darray(gameTiles);
    // displayGameTiles(gameTiles);
    displayGameTiles(assignedGameTiles);
    // displayGameTiles(reversedAssignedGTiles);

    // displayGameTiles(clonedArray);

    // console.log(objectArray);

    // return assignedGameTiles;
    return {assignedTiles: reversedAssignedGTiles, tilemap: reversedGameTiles};
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

                // STAGE 1.5 checks (extra checks to fix some cases)

                if (
                (checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'right-up', y, x) === tileType &&
                checkTile(gameTiles, 'left-up', y, x) !== tileType) ||
                (checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'left-dn', y, x) === tileType &&
                checkTile(gameTiles, 'dn', y, x) === tileType
                )

                ) {
                    assignedGameTiles[y][x] = 'LC';
                }


                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'dn', y, x) === tileType
                ) {
                    assignedGameTiles[y][x] = 'CC';
                }

                // For single grassblocks (SP) single pixel
                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'SP';
                }
            }
        }
    }

    // Second layer checks (on the assignedGameTiles) for 'advanced tiles'
    // uses both assignedgameTiles and unassigned (gameTiles)
    for (let y = 0; y < assignedGameTiles.length; y++) {
        for (let x = 0; x < assignedGameTiles[y].length; x++) {
            const value = assignedGameTiles[y][x];
            
            if (value === 'RB') {
                if (
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'left-up', y, x) !== tileType &&
                (checkTile(assignedGameTiles, 'up', y, x) === 'CC' || checkTile(assignedGameTiles, 'up', y, x) === 'SC') &&
                (checkTile(assignedGameTiles, 'left', y, x) === 'TT' || checkTile(assignedGameTiles, 'left', y, x) === 'ST')
                ) {
                    // Inverse RB -- BR
                    assignedGameTiles[y][x] = 'BR';

                }
            }

            if (value === 'LB') {
                if (
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right-up', y, x) !== tileType &&
                (checkTile(assignedGameTiles, 'up', y, x) === 'CC' || checkTile(assignedGameTiles, 'up', y, x) === 'SC') &&
                (checkTile(assignedGameTiles, 'right', y, x) === 'TT' || checkTile(assignedGameTiles, 'left', y, x) === 'ST')
                ) {
                    // Inverse LB -- BL
                    assignedGameTiles[y][x] = 'BL';
                }
            }

            if (value === 'TT') {
                if (
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) !== tileType &&
                checkTile(gameTiles, 'left', y, x) === tileType &&
                checkTile(gameTiles, 'right', y, x) === tileType
                ) {
                    // Single width TT --> ST
                    assignedGameTiles[y][x] = 'ST';

                }

            }

            if (value === 'CC') {
                if (
                checkTile(gameTiles, 'dn', y, x) === tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType &&
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType
                
                ) {
                    // Single width CC --> SC
                    assignedGameTiles[y][x] = 'SC';
                }
            }
        }
    }

    // Third layer checks (on the assignedGameTiles) for 'advanced tiles'
    // uses both assignedgameTiles and unassigned (gameTiles)
    for (let y = 0; y < assignedGameTiles.length; y++) {
        for (let x = 0; x < assignedGameTiles[y].length; x++) {
            const value = assignedGameTiles[y][x];

            if (value === 'CC') {
                if (
                (checkTile(assignedGameTiles, 'left', y, x) === 'TT' &&
                checkTile(assignedGameTiles, 'up', y, x) === 'LT' &&
                (checkTile(assignedGameTiles, 'dn', y, x) === 'BB' || checkTile(assignedGameTiles, 'dn', y, x) === 'CC') &&
                checkTile(gameTiles, 'left-up', y, x) !== tileType) ||
                (checkTile(assignedGameTiles, 'left', y, x) === 'LT' &&
                checkTile(assignedGameTiles, 'up', y, x) === 'LT' &&
                (checkTile(assignedGameTiles, 'dn', y, x) === 'LC' || checkTile(assignedGameTiles, 'dn', y, x) === 'CC') &&
                checkTile(gameTiles, 'left-up', y, x) !== tileType)
                ) {
                    // Inverse corner, connection with LT and TT/LT -- CL
                    assignedGameTiles[y][x] = 'CL';
                }

                if (
                (checkTile(assignedGameTiles, 'right', y, x) === 'TT' &&
                checkTile(assignedGameTiles, 'up', y, x) === 'RT' &&
                (checkTile(assignedGameTiles, 'dn', y, x) === 'BB' || checkTile(assignedGameTiles, 'dn', y, x) === 'CC') &&
                checkTile(gameTiles, 'right-up', y, x) !== tileType) ||
                (checkTile(assignedGameTiles, 'right', y, x) === 'RT' &&
                checkTile(assignedGameTiles, 'up', y, x) === 'RT' &&
                (checkTile(assignedGameTiles, 'dn', y, x) === 'BB' || checkTile(assignedGameTiles, 'dn', y, x) === 'CC') &&
                checkTile(gameTiles, 'right-up', y, x) !== tileType)
                ) {
                    // Inverse corner, connection with RT and TT/LT -- CR
                    assignedGameTiles[y][x] = 'CR';
                }
            }

            if (value === 'LT') {
                if (
                checkTile(gameTiles, 'up', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(assignedGameTiles, 'right', y, x) === 'ST'
                ) {
                    // Single height edges (compare against ST) (single-left SL)
                    assignedGameTiles[y][x] = 'SL';
                }
            }

            if (value === 'RT') {
                if (
                checkTile(gameTiles, 'up', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(assignedGameTiles, 'left', y, x) === 'ST'
                ) {
                    // Single height edges (compare against ST) (single-right SR)
                    assignedGameTiles[y][x] = 'SR';
                }
            }

            if (value === 'BB') {
                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) === tileType
                ) {
                    // Single width BB attatched to piece only at the top --> BH
                    assignedGameTiles[y][x] = 'BH';
                }
            }
        }
    }

    // Fourth layer checks (on the assignedGameTiles) for 'advanced tiles'
    // uses both assignedgameTiles and unassigned (gameTiles)
    for (let y = 0; y < assignedGameTiles.length; y++) {
        for (let x = 0; x < assignedGameTiles[y].length; x++) {
            const value = assignedGameTiles[y][x];

            if (value === 'TT') {
                if (
                checkTile(gameTiles, 'left', y, x) !== tileType &&
                checkTile(gameTiles, 'right', y, x) !== tileType &&
                checkTile(gameTiles, 'up', y, x) !== tileType &&
                ((checkTile(assignedGameTiles, 'dn', y, x) === 'SC' || checkTile(assignedGameTiles, 'dn', y, x) === 'BH') ||
                (checkTile(assignedGameTiles, 'dn', y, x) === 'LC' || checkTile(assignedGameTiles, 'right-dn', y, x) === 'RT') ||
                (checkTile(assignedGameTiles, 'dn', y, x) === 'RB' || checkTile(assignedGameTiles, 'left-dn', y, x) === 'ST')
                )
                ) {
                    // Single Width Top (checks against SC/BH at bottom) SW
                    assignedGameTiles[y][x] = 'SW';
                }
            }

            if (value === 'BB') {
                if (
                checkTile(gameTiles, 'right-up', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType 
                ) {
                    if (
                    checkTile(assignedGameTiles, 'up', y, x) === 'RC' &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'ST'
                    ) {
                        assignedGameTiles[y][x] = 'BC';
                    }
                    if (
                    checkTile(assignedGameTiles, 'up', y, x) === 'RT' &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'RT'
                    ) {
                        assignedGameTiles[y][x] = 'BC';
                    }
                }
            }

            if (value === 'RB') {
                // Inverse bottom right corners
                if (
                    checkTile(gameTiles, 'left-up', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(gameTiles, 'right', y, x) !== tileType
                ) {
                    if (
                    (checkTile(assignedGameTiles, 'left', y, x) === 'ST' && 
                    checkTile(assignedGameTiles, 'up', y, x) === 'LT') ||
                    (checkTile(assignedGameTiles, 'left', y, x) === 'LT' && 
                    checkTile(assignedGameTiles, 'up', y, x) === 'LT') ||
                    (checkTile(assignedGameTiles, 'left', y, x) === 'ST' && 
                    (checkTile(assignedGameTiles, 'up', y, x) === 'SW' || 
                    checkTile(assignedGameTiles, 'up', y, x) === 'TT')) ||
                    (checkTile(assignedGameTiles, 'left', y, x) === 'LT' &&
                    checkTile(assignedGameTiles, 'up', y, x) === 'SW')
                    ) {
                        assignedGameTiles[y][x] = 'BR';
                    }
                }
            }

            if (value === 'LB') {
                // Inverse bottom left corners
                if (
                checkTile(assignedGameTiles, 'up', y, x) === 'RT' ||
                checkTile(assignedGameTiles, 'up', y, x) === 'SW'
                ) { 
                    assignedGameTiles[y][x] = 'BL';
                }
            }

            if (value === 'RT') {
                if (
                checkTile(gameTiles, 'dn', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'SR';
                }
            }

            if (value === 'LC') {
                if (
                checkTile(gameTiles, 'dn', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'BH';
                }
                if (
                checkTile(assignedGameTiles, 'right', y, x) === 'RT'
                ) {
                    // out of descriptive 2 letter combos...
                    assignedGameTiles[y][x] = 'LS';
                }

            }

            if (value === 'LT') {
                if (
                checkTile(gameTiles, 'dn', y, x) !== tileType
                ) {
                    assignedGameTiles[y][x] = 'SL';
                }
            }


        }
    }

    // Fifth layer checks (on the assignedGameTiles) for 'advanced tiles'
    // uses both assignedgameTiles and unassigned (gameTiles)
    for (let y = 0; y < assignedGameTiles.length; y++) {
        for (let x = 0; x < assignedGameTiles[y].length; x++) {
            const value = assignedGameTiles[y][x];
            if (value === 'BB') {
                if (
                checkTile(gameTiles, 'right-up', y, x) !== tileType &&
                checkTile(gameTiles, 'left-up', y, x) !== tileType &&
                checkTile(gameTiles, 'dn', y, x) !== tileType 
                ) {
                    if (
                    checkTile(assignedGameTiles, 'up', y, x) === 'SW' &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'SR' &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'SL'
                    ) {
                        // Between 2 single height edges SR/SL and is bottom piece
                        assignedGameTiles[y][x] = 'MM';
                    }
                }
            }

            if (value === 'RB') {
                // Inverse corners
                if (
                checkTile(assignedGameTiles, 'left', y, x) === 'SL'
                ) {
                    assignedGameTiles[y][x] = 'BR';
                }
            }

            if (value === 'CC') {
                // Inverse corners
                if (
                checkTile(assignedGameTiles, 'left', y, x) === 'LT'
                ) {
                    assignedGameTiles[y][x] = 'CL';
                }
            }

            if (value === 'RC') {
                if (
                checkTile(assignedGameTiles, 'up', y, x) === 'LC'
                ) {
                    // Inverse corner with side edge.. weird case
                    assignedGameTiles[y][x] = 'CP';
                }

            }

            if (value === 'BB') {
                if (
                checkTile(assignedGameTiles, 'right', y, x) === 'RT'
                ) {
                    assignedGameTiles[y][x] = 'BC';
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

// Reverses y coord on array
function reverse2Darray(array) {
    const reversedArr = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversedArr.push(array[i].slice());
    }
    return reversedArr;
}

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

export { generateTextures, createTextureLayerDiv };
