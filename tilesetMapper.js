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


// Determines which 16x16 tile to use from 48x48
function determineTilePos({levelData, x, y, tileType}) {
    console.log("DETERMINETILEPOSFUNC")
    let left, right, top, down;

    if (tileCheck({levelData: levelData, x: x, y: y, direction: "left"}) === tileType) {
        console.log("--LEFT IS SAME")
        left = true;
    }
    if (tileCheck({levelData: levelData, x: x, y: y, direction: "right"}) === tileType) {
        console.log("--RIGHT IS SAME")
        right = true;
    }
    if (tileCheck({levelData: levelData, x: x, y: y, direction: "up"}) === tileType) {
        console.log("--UP IS SAME")
        console.log("----DEB");
        console.log("tileType:", tileType);
        console.log("Check:", (tileCheck({levelData: levelData, x: x, y: y, direction: "up"})));
        top = true;
    }
    if (tileCheck({levelData: levelData, x: x, y: y, direction: "down"}) === tileType) {
        console.log("--DOWN IS SAME")
        down = true;
    }

    console.log("------");
    console.log(`LEFT: ${left}, RIGHT: ${right}, TOP: ${top}, DOWN: ${down}`);
    console.log("------");

    
    
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
    console.log(toCheckCoords.y, toCheckCoords.x);

}






// export { generateLevelMatrix };