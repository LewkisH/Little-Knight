import { create2DArray } from "./bitmapReader.js";
// Takes bitmapReader colorArr as input and generates a 2D Matrix


export function generateLevelMatrix(colorArr) {
    console.log("hi!");
    // console.log(JSON.stringify(colorArr));
    console.log(colorArr);

    // console.log(colorArr.length);
    // console.log(colorArr[0].length);
    /*
    [[ TypeID's ]]
    air - 0
    solid - 1
    platform - 2
    hazard - 3
    collectible - 4
    invisible - 5
    spawn - 6
    brown - 7
    */
    /*
      48x48 (16x16)
      TileMap Pos Naming
    +----+-----+----+
    | LT |  T  | RT |
    +----+-----+----+
    | LC |  C  | RC |
    +----+-----+----+
    | LB |  B  | RB |
    +----+-----+----+
    */
    let newArr = create2DArray(colorArr[0].length, colorArr.length)
    console.log(newArr);

    for (let i = 0; i < colorArr.length; i++) {
        // console.log(i, ": ", colorArr[i]);
        for (let j = 0; j < colorArr[i].length; j++) {
            // console.log(j, ": ", colorArr[i][j])
            // console.log("x: ", colorArr[i][j].x, " y: ",colorArr[i][j].y, " ObjTyp: ", colorArr[i][j].objectType)

            // Probably should move this to colorArr creation, and apply the typeID there 
            // TypeID will be used for complex shapes tilemapping
            let typeID = 0;
            switch(colorArr[i][j].objectType){
                case "air":
                    typeID = 0;
                    break;
                case "solid":
                    typeID = 1;
                    break;
                case "platform":
                    typeID = 2;
                    break;
                case "hazard":
                    typeID = 3;
                    break;
                case "collectible":
                    typeID = 4;
                    break;
                case "spawn":
                    typeID = 5;
                    break;
                case "brown":
                    typeID = 6;
                    break;
            }
            newArr[colorArr[i][j].y][colorArr[i][j].x] = typeID;

        }
    }





    // DISPLAY IT
    for (let y = newArr.length-1; y >= 0; y--) {
        console.log(JSON.stringify(newArr[y]));
    }




    // THis is currently just in beta testing (just trying to render the grasstile as solid)
    let tileMapValues = newArr;
    // tilemapValues[y][x] (0,0 at bottom left);
    // tileMapValues[0][0] = 9;
    // tileMapValues[0][1] = 9;


    for (let y = 0; y < tileMapValues.length; y++) {
        for (let x = 0; x < tileMapValues[y].length; x++) {
            // if ( y === 0 && x === 0) {
            //     console.log("Tada:", tileMapValues[y][x])
            //     console.log(tileCheck({levelData: tileMapValues, x: x, y: y, direction: "center"}));
            // }
            if ( y === 1 && x === 1) {

            
                switch (tileCheck({levelData: tileMapValues, x: x, y: y, direction: "center"})) {
                    case (0):
                        console.log("Current tile is air");
                        break;
                    case (1):
                        console.log("Current tile is solid");
                        // if solid determine tileMap pos

                        determineTilePos({levelData: tileMapValues, x: x, y: y, tileType: 1})
                        getPlatform({levelData: tileMapValues, x: x, y: y})


                        break;
                    case (2):
                        console.log("Current tile is platform");
                        break;
                    case (3):
                        console.log("Current tile is hazard");
                        break;
                    case (4):
                        console.log("Current tile is collectible");
                        break;
                    case (5):
                        console.log("Current tile is spawn");
                        break;
                    case (6):
                        console.log("Current tile is brown");
                        break;
                }        
                    
                    
                    
            }

        }
    }

    // DISPLAY IT
    for (let y = tileMapValues.length-1; y >= 0; y--) {
        console.log(JSON.stringify(tileMapValues[y]));
    }

    // console.log("tileMapValues: ", tileMapValues);
    // let newArr = create2DArray(colorArr[0].length, colorArr.length)
    // console.log(newArr);
}

// Generates an array of platforms
function getPlatform({levelData, x, y}) {
    // const newPlatform = {
    //     platformType: platformType,
    //     platformPositions: [],
    // }
    console.log(x, y);
    console.log(levelData[y][x])
    // initial coords
    const tileCoords = {
        x: x,
        y: y
    }
    let visitedTiles = [];
    // initial tiletype
    let tileType = levelData[y][x]
    visitedTiles.push(tileCoords)
    console.log("visitedTiles --> Tile coords:", visitedTiles)

    while (true) {
        const result = exploreAdjacentTiles({levelData: levelData, x: x, y: y, visitedTiles: visitedTiles, tileType: tileType});
        visitedTiles = result.visitedTiles;
        if (!result.newTilesAdded) {
            break;
        }

        visitedTiles.forEach(tile => {
            x = tile.x;
            y = tile.y;
        });
    }
    console.log(visitedTiles);


    // add TilePositioning based on position
    visitedTiles.forEach(tile => {
        let positionValue = "";
        let left, right, top, down;
        left = containsObjectWithXY(visitedTiles, tile.x-1, tile.y);
        right = containsObjectWithXY(visitedTiles, tile.x+1, tile.y);
        top = containsObjectWithXY(visitedTiles, tile.x, tile.y+1);
        down = containsObjectWithXY(visitedTiles, tile.x, tile.y-1);
        let surroundingTiles = {left: left, right: right, top: top, down: down};

        if (surroundingTiles.left === true) {
            // Cases (1, 2, 3, 5, 7, 9)
            if (surroundingTiles.right === true) {
                // Cases (1, 2, 3)
                if (surroundingTiles.top === true) {
                    // Cases (1, 2)
                    if (!surroundingTiles.down === true) {
                        // Cases (2)
                        positionValue = "B";

                    } else {
                        // Cases (1)
                        positionValue = "C";
                    }
                } else {
                    // Cases (3)
                    positionValue = "T";
                }
            } else {
                // Cases (5, 7, 9)
                if (surroundingTiles.top === true) {
                    // Cases (7, 9)
                    if (surroundingTiles.down === true) {
                        // Cases (9)
                        positionValue = "RC";
                    } else {
                        // Cases (7)
                        positionValue = "RB";
                    }
                } else {
                    // Cases (5)
                    positionValue = "RT";
                }
            }
        } else {
            // Cases (4, 6, 8)
            if (surroundingTiles.top === true) {
                // Cases (6, 8)
                if (surroundingTiles.down === true) {
                    // Cases (8)
                    positionValue = "LC";
                } else {
                    // Cases (6)
                    positionValue = "LB";
                }
            } else {
                // Cases (4)
                positionValue = "LT";
            }
        }
        levelData[tile.y][tile.x] = positionValue;


    })


}


// return true if new tile is added false if not
function exploreAdjacentTiles({levelData, x, y, visitedTiles, tileType}) {
    console.log("exploringAdjacentTiles");
    let newTilesCount = 0;
    let newTilesAdded = false;
    visitedTiles.forEach(tile => {
        if (tileCheck({levelData: levelData, x: tile.x, y: tile.y, direction: "left"}) === tileType) {
            if (!containsObjectWithXY(visitedTiles, x-1, y)) {
                visitedTiles.push({y: y, x: x-1})
                newTilesCount += 1
            }
        }
        if (tileCheck({levelData: levelData, x: x, y: y, direction: "right"}) === tileType) {
            if (!containsObjectWithXY(visitedTiles, x+1, y)) {
                visitedTiles.push({y: y, x: x+1})
                newTilesCount += 1
            }
        }
        if (tileCheck({levelData: levelData, x: x, y: y, direction: "up"}) === tileType) {
            if (!containsObjectWithXY(visitedTiles, x, y+1)) {
                visitedTiles.push({y: y+1, x: x})
                newTilesCount += 1
            }
        }
        if (tileCheck({levelData: levelData, x: x, y: y, direction: "down"}) === tileType) {
            if (!containsObjectWithXY(visitedTiles, x, y-1)) {
                visitedTiles.push({y: y-1, x: x})
                newTilesCount += 1
            }
        }
    })

    if (newTilesCount > 0) {
        newTilesAdded = true
    }
    console.log("VisitedTIles:", visitedTiles)
    console.log("NewTilesAdded?: ", newTilesAdded, newTilesCount)
    return {newTilesAdded, visitedTiles}
}

function containsObjectWithXY(array, x, y) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}


// Determines which 16x16 tile to use from 48x48 (((Check adjacent tiles status)))
function determineTilePos({levelData, x, y, tileType}) {
    console.log("DETERMINETILEPOSFUNC")
    let left, right, top, down;

    if (tileCheck({levelData: levelData, x: x, y: y, direction: "left"}) === tileType) {
        left = true;
    }
    if (tileCheck({levelData: levelData, x: x, y: y, direction: "right"}) === tileType) {
        right = true;
    }
    if (tileCheck({levelData: levelData, x: x, y: y, direction: "up"}) === tileType) {
        top = true;
    }
    if (tileCheck({levelData: levelData, x: x, y: y, direction: "down"}) === tileType) {
        down = true;
    }

    console.log("------");
    console.log(`LEFT: ${left}, RIGHT: ${right}, TOP: ${top}, DOWN: ${down}`);
    console.log("------");
    return {left: left, right: right, top: top, down: down};

    
    
}
// Takes levelData (tilemapValues) and current x,y to check if
// there is a tile at direction from current x,y and what it's value is
function tileCheck({levelData, x, y, direction}) {
    console.log(y,x);
    console.log("LEV DAT:", levelData);

    let toCheckCoords = {x: x, y: y}
    switch (direction) {
        case "center":
            break;
        case "up":
            console.log("UP:", y+1, x);
            toCheckCoords.y += 1;
            break;
        case "down":
            console.log("DOWN:", y-1, x);
            toCheckCoords.y -= 1;
            break;
        case "left":
            console.log("LEFT:", y, x-1);
            toCheckCoords.x -= 1
            break;
        case "right":
            console.log("RIGHT:", y, x+1);
            toCheckCoords.x += 1;
            break;
    }

    // RANGE CHECK
    if (toCheckCoords.y > levelData.length-1 || toCheckCoords.y < 0) {
        console.log("TO CHECK  Y-COORDS OUT OF RANGE : ", toCheckCoords.y);
        return -1;
    }
    if (toCheckCoords.x > levelData[0].length-1 || toCheckCoords.x < 0) {
        console.log("TO CHECK  X-COORDS OUT OF RANGE : ", toCheckCoords.x);
        return -1;
    }
    

    console.log("GOING TO CHECK X:", toCheckCoords.x, " Y:", toCheckCoords.y);
    console.log("VALUE I REED at that pos:", levelData[toCheckCoords.y][toCheckCoords.x]);
    return levelData[toCheckCoords.y][toCheckCoords.x];
    // console.log(toCheckCoords.y, toCheckCoords.x);

}






// export { generateLevelMatrix };