import { waitForMainMenu } from "./mainMenu.js";
import { bitmapObjects, generateWorld } from "./generateWorld.js";
import { createTextureLayerDiv, generateTextures } from "./tilemapper.js";
import { readBitmap } from "./bitmapReader.js";
import Player from './player.js'
import { AABBItem, CollisionManager } from "./collision.js";
import { updateHud } from "./hud.js";
let lastTime;
let isPaused = false;


window.addEventListener('load', async function () {
    const userDataCache = await waitForMainMenu();
    const hudElem = document.getElementById('HUD');
    const game = document.getElementById('gameWorld');
    const player = new Player(game.offsetWidth, game.offsetHeight, document.getElementById("player"))
    // Something todo here:
    // update player.lives based on userDataCache (difficulty)
    // e.g. 5 lives, 3 lives, 2 lives
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

    generateWorld(objArr, gameWorldElem, colMan, goblinArr, userDataCache.selectedLevel);
    generateTextures(objArr); // tilemapper sub function 
    createTextureLayerDiv(gameWorldElem, objArr); // tilemapper;
    /* let audio = new Audio('/assets/Audio/Ner_music.mp3')
    audio.play()
    audio.volume = 0.3; */

    // Initial vertical Scroll value
    let gameWorldWrapper = document.getElementById('gameWorldWrapper');
    gameWorldWrapper.scrollTop = player.y;
    let pausedPlayerState = null;
    // Initial HUD update
    let HUD = {
        maxTime: 120, // seconds
        maxHealth: player.lives,
    }

    updateHud(HUD, hudElem, "init")
    // let lastTime
    const gameLoop = function (time) {
        if (!isPaused) {
            if (lastTime != null) {
                const delta = time - lastTime
                if (player.lives !== HUD.currentHealth) HUD.currentHealth = player.lives;
                updateHud(HUD, hudElem);
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
                updateHud(HUD, hudElem, "pause")
            } else {
                if (pausedPlayerState) {
                    player.velocity = pausedPlayerState.velocity;
                    player.position = pausedPlayerState.position;
                }
                updateHud(HUD, hudElem, "unpause")
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
        const toMainMenu = document.querySelector(".toMainMenu")
        if (isPaused) {
            restartButton.addEventListener('click', handleRestart);
            continueButton.addEventListener('click', handleContinue);
            toMainMenu.addEventListener('click', handleBackToMainMenu);
        } else {
            restartButton.removeEventListener('click', handleRestart);
            continueButton.removeEventListener('click', handleContinue);
            toMainMenu.addEventListener('click', handleBackToMainMenu);
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
        updateHud(HUD, hudElem, "restart")
        //respawn gems
        resetCollectibles(game);
        //respawn goblins
        goblinArr.forEach((goblin)=>{

            gameWorldElem.appendChild(goblin.AABB.elem)
            goblin.AABB.elem.style.left = goblin.startPos.x;
            goblin.AABB.elem.style.top = goblin.startPos.y;
            goblin.speed = 3;
            goblin.dead = false
            goblin.AABB.elem.style.transform = 'scaleX(1)'
            goblin.AABB.elem.style.backgroundImage = "url('assets/goblin.png')"

        })
        handleContinue()
    }

    function handleBackToMainMenu() {
        location.reload();
    }
    
    function playerDead(){
        player.playerElem.style.backgroundImage = "url('assets/BobDead.gif')"
        updateHud(HUD, hudElem, undefined)
        isPaused=true
        console.log("player died.")
        player.stunned = true
        setTimeout(() => {
            
            handleRestart()
           player.playerElem.style.backgroundImage = "url('assets/Bob.png')";
        }, 950);
        
    }

    function resetCollectibles(gameWorldElem) {
        const collectibles = gameWorldElem.querySelectorAll('div[id="yellow"]');
        collectibles.forEach(collectible => {
            if (collectible.getAttribute('gem-collected') === 'true') {
                collectible.removeAttribute('gem-collected');
                collectible.style.removeProperty('opacity');
            }
        });
    }
});