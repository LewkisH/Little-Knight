import { waitForMainMenu } from "./mainMenu.js";
import { bitmapObjects, generateWorld } from "./generateWorld.js";
import { createTextureLayerDiv, generateTextures } from "./tilemapper.js";
import { readBitmap } from "./bitmapReader.js";
import Player from './player.js'
import { AABBItem, CollisionManager } from "./collision.js";
let lastTime;
let isPaused = false;

window.addEventListener('load', async function () {
    const userDataCache = await waitForMainMenu();
    const game = document.getElementById('gameWorld');
    const player = new Player(game.offsetWidth, game.offsetHeight, document.getElementById("player"))
    const playerAABB = new AABBItem(player, "character")
    const colMan = new CollisionManager(playerAABB)
    //colMan.addEntity(playerAABB)

    let result = await readBitmap(`data/${userDataCache.selectedLevel}.bmp`)
    // let objArr = await readBitmap("assets/lalala.bmp")
    // let objArr = await readBitmap("assets/lava.bmp")
    // let objArr = await readBitmap("assets/newTest.bmp")
    // let objArr = await readBitmap("assets/bmpbruh.bmp")
    // let objArr = await readBitmap("assets/test69.bmp")
    // let result = await readBitmap("assets/spawntest.bmp")
    let goblinArr = []
    let objArr = result[0];
    let startPos = result[1];
    player.x = startPos.x
    player.y = startPos.y



    let gameWorldElem = document.getElementById('gameWorld');

    generateWorld(objArr, gameWorldElem, colMan, goblinArr);
    generateTextures(objArr); // tilemapper sub function 
    createTextureLayerDiv(gameWorldElem, objArr); // tilemapper;

    // Initial vertical Scroll value
    let gameWorldWrapper = document.getElementById('gameWorldWrapper');
    gameWorldWrapper.scrollTop = player.y;
    let pausedPlayerState = null;
    // let lastTime
    const gameLoop = function (time) {
        if (!isPaused) {
            if (lastTime != null) {
                const delta = time - lastTime
                if (player.lives <= 0){
                    playerDead()
                } else {

                player.update(input, delta)
                //update all goblins
                goblinArr.forEach((goblin => {
                    goblin.update(delta)
                }));


                colMan.checkAllCollision()}
                // console.log(playerAABB.checkCollision(blackAABB))
            }
            lastTime = time
            window.requestAnimationFrame(gameLoop)
        }
    }

    class InputHandler {
        constructor() {
            this.keys = [];

            window.addEventListener("keydown", e => {
                //console.log(e.key)
                if ((e.key === "d" ||
                    e.key === "a" ||
                    e.key === "w" ||
                    e.key === "s" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowDown" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === " ")
                    && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }

            })
            window.addEventListener("keyup", e => {
                if ((e.key === "d" ||
                    e.key === "a" ||
                    e.key === "w" ||
                    e.key === "s" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowDown" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === " ")) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)

                }

            })
        }
    }

    //if passing in entities other than player, use their html element



    const input = new InputHandler()
    window.requestAnimationFrame(gameLoop)
    // Pause game
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            isPaused = !isPaused;
            togglePauseMenu(isPaused);
            if (isPaused) {
                pausedPlayerState = {
                    velocity: player.velocity,
                    position: player.position
                }
            } else {
                if (pausedPlayerState) {
                    player.velocity = pausedPlayerState.velocity;
                    player.position = pausedPlayerState.position;
                }
                lastTime = performance.now();
                window.requestAnimationFrame(gameLoop)
            }
        }
    });



    function togglePauseMenu(isPaused) {
        let pauseMenu = document.getElementById("pauseMenu");
        pauseMenu.style.display = isPaused ? "flex" : "none";

        const restartButton = document.querySelector(".restart");
        const continueButton = document.querySelector(".continue");
        if (isPaused) {
            restartButton.addEventListener('click', handleRestart);
            continueButton.addEventListener('click', handleContinue);
        } else {
            restartButton.removeEventListener('click', handleRestart);
            continueButton.removeEventListener('click', handleContinue);
        }
    }

    function handleContinue() {
        console.log("Continue was pressed");
        togglePauseMenu(false);
        isPaused = false;
        lastTime = performance.now();
        window.requestAnimationFrame(gameLoop);
    }


    function handleRestart() {
        console.log("Restart was pressed");
        player.x = startPos.x
        player.y = startPos.y
        player.lives = 5
        player.stunned = false
        player.vy = 0
        player.speed = 0

        //respawn goblins
        goblinArr.forEach((goblin)=>{

            gameWorldElem.appendChild(goblin.AABB.elem)
            goblin.AABB.elem.style.left = goblin.startPos.x;
            goblin.AABB.elem.style.top = goblin.startPos.y;
            goblin.speed = 3;
            goblin.dead = false
            goblin.AABB.elem.style.transform = 'scaleX(1)'
            goblin.AABB.elem.style.backgroundImage = "url('assets/goblin-export.png')"

        })
        handleContinue()
    }
    
    function playerDead(){
        player.playerElem.style.backgroundImage = "url('assets/BobDead.gif')"
        isPaused=true
        console.log("player died.")
        player.stunned = true
        setTimeout(() => {
            
            handleRestart()
           player.playerElem.style.backgroundImage = "url('assets/Bob.png')";
        }, 950);
        
    }
});












//window.addEventListener('load', function () {
