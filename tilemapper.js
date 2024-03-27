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

    for (let y = 0; y < tilemap.length; y++) {
        for (let x = 0; x < tilemap[y].length; x++) {
            const value = tilemap[y][x]
            if (value === 0) {
                continue;
            }
            // For 1-ground objects
            if (value === 1) {
                let tileChunck = assignedGameTiles[y][x];
                // Use a different tilemap for scorched ground // scorched with lava
                if (
                checkTile(tilemap, 'dn', y, x) === 3 || 
                checkTile(tilemap, 'left', y, x) === 3 || 
                checkTile(tilemap, 'right', y, x) === 3 
                ) {
                const tile = buildTileDiv({className: 'tile-ground', color: 'white', x: x, y: y, tileChunck: tileChunck, textureURL: `url("./assets/MainTileSetLavaScorched.webp")`});
                textureLayer.appendChild(tile);
                // Just scorched without lava backdrop
                } else if (
                checkTile(tilemap, 'up', y, x) === 3 ||
                checkTile(tilemap, 'right-up', y, x) === 3 || 
                checkTile(tilemap, 'right-dn', y, x) === 3 || 
                checkTile(tilemap, 'left-dn', y, x) === 3 || 
                checkTile(tilemap, 'left-up', y, x) === 3
                ) {
                const tile = buildTileDiv({className: 'tile-ground', color: 'white', x: x, y: y, tileChunck: tileChunck, textureURL: `url("./assets/MainTileSetScorched.webp")`});
                textureLayer.appendChild(tile);
                } else {
                const tile = buildTileDiv({className: 'tile-ground', color: 'white', x: x, y: y, tileChunck: tileChunck, textureURL: `url("./assets/MainTileSet.webp")`});
                textureLayer.appendChild(tile);
                } 
            }
            // For 2-platform objects
            if (value === 2) {
                let tileChunck = assignedGameTiles[y][x];
                if (tileChunck !== 3) {
                    const tile = buildTileDiv({className: 'tile-platform', color: 'white', x: x, y: y, tileChunck: tileChunck, textureURL: `url("./assets/PlatformTileSet.webp")`});
                    textureLayer.appendChild(tile);
                }

            }
            // For 3-hazard objects
            if (value === 3) {
                let tileChunck = assignedGameTiles[y][x];
                if (tileChunck !== 3) {
                    const tile = buildTileDiv({className: 'tile-lava', color: 'white', x: x, y: y, tileChunck: tileChunck, textureURL: `url("./assets/LavaTileSet02.webp")`});
                    textureLayer.appendChild(tile);
                }
            }
        }
    }

    gameWorldElem.appendChild(textureLayer);
}

function buildTileDiv({className, color, x, y, tileChunck, textureURL}) {
    const tile = document.createElement('div');
    tile.id = className;
    tile.className = tileChunck;
    tile.style.width = '48px';
    tile.style.height = '48px';
    tile.style.position = 'absolute';
    tile.style.bottom = (y * 48) + 'px';
    tile.style.left = (x * 48) + 'px';
    tile.style.backgroundImage = textureURL;

    switch (tileChunck) {
        case 'LT':
            tile.style.backgroundPosition =  `${0}px ${0}px`;
            break;
        case 'LB':
            tile.style.backgroundPosition =  `${0}px ${-96}px`;
            break;
        case 'RT':
            tile.style.backgroundPosition =  `${-96}px ${0}px`;
            break;
        case 'RB':
            tile.style.backgroundPosition =  `${-96}px ${-96}px`;
            break;
        case 'TT':
            tile.style.backgroundPosition =  `${-48}px ${0}px`;
            break;
        case 'BB':
            tile.style.backgroundPosition =  `${-48}px ${-96}px`
            break;
        case 'LC':
            tile.style.backgroundPosition =  `${0}px ${-48}px`;
            break;
        case 'RC':
            tile.style.backgroundPosition =  `${-96}px ${-48}px`;
            break;
        case 'CC':
            tile.style.backgroundPosition =  `${-48}px ${-48}px`;
            break;
        case 'SP':
            tile.style.backgroundPosition =  `${-144}px ${-144}px`;
            break;
        case 'XX':  // for debugging
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
        case 'MX':
            tile.style.backgroundPosition =  `${-240}px ${-144}px`;
            break;
        case 'CP':
            tile.style.backgroundPosition =  `${-288}px ${-96}px`;
            break;
        case 'BX':
            tile.style.backgroundPosition =  `${-336}px ${-48}px`;
            break;
        case 'LaTT':
            tile.style.backgroundPosition =  `${0}px ${0}px`;
            break;
        case 'LaCC':
            tile.style.backgroundPosition =  `${0}px ${-48}px`;
            break;

        default:
            tile.style.backgroundColor = 'gray';
    }

    tile.style.backgroundRepeat = 'no-repeat';
    tile.style.zIndex = 10

    // Special case for platform taller (to raise the tiles by 2px)
    if (className === 'tile-platform') {
        tile.style.zIndex = 9
        tile.style.bottom = ((y * 48)+2) + 'px';
    }
    
    return tile;
}

function generateTextures(objectArray) {
    let width = 100
    let height = 50

    let gameTiles = create2Dtilemap(height, width);
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
            }
        }
    });

    // Create a seperate array for platforms (2), then add them to the return array
    let assignedPlatformTiles = pickATile(gameTiles, 2);
    let assignedGameTiles = pickATile(gameTiles, 1); 
    assignedGameTiles = overlayPlatformTiles(gameTiles, assignedGameTiles, assignedPlatformTiles, 2)

    // Hazard/Lava
    assignedGameTiles = pickATile(assignedGameTiles, 3);
    let reversedAssignedGTiles = reverse2Darray(assignedGameTiles);
    let reversedGameTiles = reverse2Darray(gameTiles);

    return {assignedTiles: reversedAssignedGTiles, tilemap: reversedGameTiles};
}

function overlayPlatformTiles(gameTiles, assignedGameTiles, assignedPlatformTiles, tileType=2) {
    let overlayedGameTiles = clone2Darray(assignedGameTiles);

    for (let y = 0; y < gameTiles.length; y++) {
        for (let x = 0; x < gameTiles[y].length; x++) {
            const value = gameTiles[y][x]
            if (value === tileType) {
                overlayedGameTiles[y][x] = assignedPlatformTiles[y][x]
            }
        }
    }

    return overlayedGameTiles;
}

// Changes the tile to a tileposition (using tileType 1-9)
function pickATile(gameTiles, tileType) {
    let assignedGameTiles = clone2Darray(gameTiles);

    // For 1-ground tiles && 2-platform tiles
    if (tileType === 1 || tileType === 2) {
        for (let y = 0; y < gameTiles.length; y++) {
            for (let x = 0; x < gameTiles[y].length; x++) {
                const value = gameTiles[y][x]
                if (value === tileType) {
                    if (
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(gameTiles, 'right', y, x) === tileType && 
                    checkTile(gameTiles, 'up', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'LT';
                    }
                    if (
                    checkTile(gameTiles, 'left', y, x) === tileType &&
                    checkTile(gameTiles, 'right', y, x) !== tileType &&
                    checkTile(gameTiles, 'up', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'RT';
                    }
                    if (
                    checkTile(gameTiles, 'up', y, x) === tileType &&
                    checkTile(gameTiles, 'right', y, x) === tileType &&
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'LB';
                    }
                    if (
                    checkTile(gameTiles, 'up', y, x) === tileType &&
                    checkTile(gameTiles, 'left', y, x) === tileType &&
                    checkTile(gameTiles, 'right', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'RB';
                    }
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
                    if (
                    checkTile(gameTiles, 'dn', y, x) === tileType &&
                    checkTile(gameTiles, 'up', y, x) === tileType &&
                    checkTile(gameTiles, 'left', y, x) === tileType &&
                    checkTile(gameTiles, 'right', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'CC';
                    }
                    if (
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(gameTiles, 'right', y, x) === tileType &&
                    checkTile(gameTiles, 'up', y, x) === tileType &&
                    checkTile(gameTiles, 'dn', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'LC';
                    }
                    if (
                    checkTile(gameTiles, 'left', y, x) === tileType &&
                    checkTile(gameTiles, 'right', y, x) !== tileType &&
                    checkTile(gameTiles, 'up', y, x) === tileType &&
                    checkTile(gameTiles, 'dn', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'RC';
                    }
                    if (
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(gameTiles, 'right', y, x) !== tileType &&
                    checkTile(gameTiles, 'up', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType 
                    ) {
                        assignedGameTiles[y][x] = 'TT';
                    }
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
        // Uses both assignedgameTiles and unassigned (gameTiles)
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
                        assignedGameTiles[y][x] = 'SC';
                    }
                }
            }
        }
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
                        assignedGameTiles[y][x] = 'CR';
                    }
                }
                if (value === 'LT') {
                    if (
                    checkTile(gameTiles, 'up', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'ST'
                    ) {
                        assignedGameTiles[y][x] = 'SL';
                    }
                }
                if (value === 'RT') {
                    if (
                    checkTile(gameTiles, 'up', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'ST'
                    ) {
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
                        assignedGameTiles[y][x] = 'BH';
                    }
                }
            }
        }
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
                            assignedGameTiles[y][x] = 'MM';
                        }
                    }
                }
                if (value === 'RB') {
                    if (
                    checkTile(assignedGameTiles, 'left', y, x) === 'SL'
                    ) {
                        assignedGameTiles[y][x] = 'BR';
                    }
                }
                if (value === 'CC') {
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
        for (let y = 0; y < assignedGameTiles.length; y++) {
            for (let x = 0; x < assignedGameTiles[y].length; x++) {
                const value = assignedGameTiles[y][x];
                if (value === 'LB') {
                    if (
                    checkTile(assignedGameTiles, 'right', y, x) === 'RT' &&
                    checkTile(assignedGameTiles, 'up', y, x) === 'SC' &&
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'BL';
                    }
                }
                if (value === 'CC') {
                    if (
                    (checkTile(assignedGameTiles, 'right', y, x) === 'TT' || 
                    checkTile(assignedGameTiles, 'right', y, x) === 'RT' ||
                    checkTile(assignedGameTiles, 'right', y, x) === 'SR') &&
                    checkTile(gameTiles, 'dn', y, x) === tileType &&
                    checkTile(gameTiles, 'left', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'CR';
                    }
                    if (
                    checkTile(assignedGameTiles, 'left', y, x) === 'SL'
                    ) {
                        assignedGameTiles[y][x] = 'CL';
                    }
                    if (
                    checkTile(assignedGameTiles, 'left', y, x) === 'SL' &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'SR' &&
                    checkTile(assignedGameTiles, 'up', y, x) === 'SW' &&
                    checkTile(gameTiles, 'dn', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'MX';
                    }
                    if (
                        checkTile(assignedGameTiles, 'left', y, x) === 'TT' &&
                        checkTile(gameTiles, 'up', y, x) === tileType &&
                        checkTile(gameTiles, 'right', y, x) === tileType &&
                        checkTile(gameTiles, 'dn', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'CL';
                    }
                }
                if (value === 'CL') {
                    if (
                    checkTile(assignedGameTiles, 'left', y, x) === 'LT' &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'RT' &&
                    checkTile(gameTiles, 'up', y, x) === tileType &&
                    checkTile(gameTiles, 'dn', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'MX';
                    }
                }
            }
        }
        for (let y = 0; y < assignedGameTiles.length; y++) {
            for (let x = 0; x < assignedGameTiles[y].length; x++) {
                const value = assignedGameTiles[y][x];
                if (value === 'RC') {
                    if (
                    (checkTile(assignedGameTiles, 'left', y, x) === 'LT' ||
                    checkTile(assignedGameTiles, 'left', y, x) === 'TT') &&
                    checkTile(gameTiles, 'right', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'CP';
                    }
                }
                if (value === 'BB') {
                    if (
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'RC' &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'LT'
                    ) {
                        assignedGameTiles[y][x] = 'BX';
                    }
                    if (
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(assignedGameTiles, 'up', y, x) === 'LT' &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'BB' &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'SL'
                    ) {
                        assignedGameTiles[y][x] = 'BX';
                    }
                    if (
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    (checkTile(assignedGameTiles, 'right', y, x) === 'BC' &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'ST') ||
                    (checkTile(assignedGameTiles, 'right', y, x) === 'BB' &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'ST')
                    ) {
                        assignedGameTiles[y][x] = 'BX';
                    }
                    if (
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'ST' &&
                    checkTile(assignedGameTiles, 'left', y, x) === 'LT' &&
                    checkTile(gameTiles, 'up', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'MM';
                    }
                }
                if (value === 'LB') {
                    if (
                    checkTile(gameTiles, 'dn', y, x) !== tileType &&
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(assignedGameTiles, 'right', y, x) === 'RT' &&
                    checkTile(assignedGameTiles, 'up', y, x) === 'RC' 
                    ) {
                        assignedGameTiles[y][x] = 'BL';
                    }
                }
                if (value === 'TT') {
                    if (
                    checkTile(gameTiles, 'left', y, x) !== tileType &&
                    checkTile(gameTiles, 'right', y, x) !== tileType &&
                    checkTile(gameTiles, 'up', y, x) !== tileType &&
                    checkTile(gameTiles, 'dn', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'SW';
                    }
                }
            }
        }
        for (let y = 0; y < assignedGameTiles.length; y++) {
            for (let x = 0; x < assignedGameTiles[y].length; x++) {
                const value = assignedGameTiles[y][x];
                if (value === 'CL') {
                    if (
                    checkTile(assignedGameTiles, 'up', y, x) === 'SW' &&
                    checkTile(gameTiles, 'left', y, x) === tileType && 
                    checkTile(gameTiles, 'right', y, x) === tileType
                    ) {
                        assignedGameTiles[y][x] = 'MX';
                    }
                }
            }
        }

    }
    // For 3-lava tiles
    if (tileType === 3) {
        for (let y = 0; y < gameTiles.length; y++) {
            for (let x = 0; x < gameTiles[y].length; x++) {
                const value = gameTiles[y][x]
                if (value === tileType) {
                    if (
                    checkTile(gameTiles, 'up', y, x) !== tileType
                    ) {
                        assignedGameTiles[y][x] = 'LaTT';
                    } else {
                        assignedGameTiles[y][x] = 'LaCC';
                    }
                    if (checkTile(gameTiles, 'up', y, x) !== 0
                    ) {
                        assignedGameTiles[y][x] = 'LaCC';
                    }
                }
            }
        }
    }
    // For 4-collectible tiles
    if (tileType === 4) {
        for (let y = 0; y < gameTiles.length; y++) {
            for (let x = 0; x < gameTiles[y].length; x++) {
                const value = gameTiles[y][x]
                if (value === tileType) {
                    assignedGameTiles[y][x] = 'COL1';
                }
            }
        }
    }

    return assignedGameTiles;
}

/**
 * Checks adjacent and diagonal tiles and returns their value
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
            break;
        case ('up'):
            checkY -= 1;
            break;
        case ('dn'):
            checkY += 1;
            break;
        case ('right'):
            checkX += 1;
            break;
        case ('right-up'):
            checkX += 1;
            checkY -= 1;
            break;
        case ('right-dn'):
            checkX += 1;
            checkY += 1;
            break;
        case ('left'):
            checkX -= 1;
            break;
        case ('left-up'):
            checkX -= 1;
            checkY -= 1;
            break;
        case ('left-dn'):
            checkX -= 1;
            checkY += 1;
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

    return tileValue;
}

// Helper function for debugging
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
