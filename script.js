import { waitForMainMenu } from "./mainMenu.js";
import { bitmapObjects, generateWorld } from "./generateWorld.js";
import { createTextureLayerDiv, generateTextures } from "./tilemapper.js";
import { readBitmap } from "./bitmapReader.js";
import Player from './player.js'
import { AABBItem, CollisionManager } from "./collision.js";
import { updateHud } from "./hud.js";
let lastTime;
let isPaused = false;
let atEnd = {end: false}

window.addEventListener('load', async function () {
    const userDataCache = await waitForMainMenu();
    const hudElem = document.getElementById('HUD');
    const game = document.getElementById('gameWorld');
    const player = new Player(game.offsetWidth, game.offsetHeight, document.getElementById("player"))
    const playerAABB = new AABBItem(player, "character")
    const colMan = new CollisionManager(playerAABB)
    let result = await readBitmap(`data/${userDataCache.selectedLevel}.bmp`)
    let goblinArr = []
    let objArr = result[0];
    let startPos = result[1];
    player.x = startPos.x
    player.y = startPos.y
    let gameWorldElem = document.getElementById('gameWorld');

    generateWorld(objArr, gameWorldElem, colMan, goblinArr, userDataCache.selectedLevel);
    generateTextures(objArr);
    createTextureLayerDiv(gameWorldElem, objArr);

    // Initial vertical Scroll value
    let gameWorldWrapper = document.getElementById('gameWorldWrapper');
    gameWorldWrapper.scrollTop = player.y;
    let pausedPlayerState = null;
    // Initial HUD update
    let HUD = {
        maxTime: 0,
        maxHealth: player.lives,
    }

    updateHud(HUD, hudElem, "init")
    const gameLoop = function (time) {
        if (atEnd.end){
            isPaused = true;
            toggleEndMenu(true)
        }
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

                colMan.checkAllCollision(atEnd)}
            }
            lastTime = time
            window.requestAnimationFrame(gameLoop)
        }
    }

    class InputHandler {
        constructor() {
            this.keys = [];

            window.addEventListener("keydown", e => {
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

    // if passing in entities other than player, use their html element
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

    function toggleEndMenu(isEnd) {
        if (isEnd) {
            updateScore()
            updateEndMenuDOMvalues()
        }
        let pauseMenu = document.getElementById("endMenu");
        pauseMenu.style.display = isEnd ? "flex" : "none";
    
        const restartButton = document.querySelector("#endTryAgain");
        const continueButton = document.querySelector("#endMainMenu");
        if (isEnd) {
            restartButton.addEventListener('click', handleRestart);
            continueButton.addEventListener('click', handleBackToMainMenu);
        } else {
            restartButton.removeEventListener('click', handleRestart);
            continueButton.removeEventListener('click', handleBackToMainMenu);
        }
    }

    // Updates EndMenu Values based on local/session storage (gems, time)
    function updateEndMenuDOMvalues() {
        let gemCountElem = document.querySelector('.endGemCount');
        let timeElem = document.querySelector('.completionTime');
        let currentSessionData = JSON.parse(sessionStorage.getItem('HUD'))
        let minutes = Math.floor(currentSessionData.timer / 60);
        let seconds = currentSessionData.timer % 60;
        let formatMinutes = String(minutes).padStart(2, '0');
        let formatSeconds = String(seconds).padStart(2, '0');
        let collectedGems = currentSessionData.gemCount
        let localData = JSON.parse(localStorage.getItem('userData'))
        let gemsForCurrentMap = ((localData.gemsPerMap)[`${localData.selectedLevel}.bmp`]).split('/')[1]
        gemCountElem.innerHTML = `${collectedGems}/${gemsForCurrentMap}`;
        timeElem.innerHTML = `${formatMinutes}:${formatSeconds}`;
    }

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
        player.playerElem.style.opacity = "1";
        togglePauseMenu(false);
        toggleEndMenu(false);
        isPaused = false;
        atEnd.end = false;
        lastTime = performance.now();
        window.requestAnimationFrame(gameLoop);
    }

    function handleRestart() {
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
            goblin.AABB.elem.style.backgroundImage = "url('assets/goblin.webp')"

        })
        handleContinue()
    }

    function handleBackToMainMenu() {
        player.playerElem.style.opacity = "1";
        location.reload();
    }
    
    function playerDead(){
        player.playerElem.style.backgroundImage = "url('assets/BobDead.webp')"
        updateHud(HUD, hudElem, undefined)
        isPaused=true
        player.stunned = true
        setTimeout(() => {
            
            handleRestart()
           player.playerElem.style.backgroundImage = "url('assets/Bob.webp')";
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

    function handleBackToMainMenu() {
        window.location.reload()
    }

    // Updates Local cache gemsPerMap with session cache gemCount
    function updateScore() {
        let currentSessionData = JSON.parse(sessionStorage.getItem('HUD'))
        let currentLocalData = JSON.parse(localStorage.getItem('userData'))
        let currentGemsForMap = (currentLocalData.gemsPerMap)[`${currentLocalData.selectedLevel}.bmp`]
        let localGemValue = currentGemsForMap.split('/')[0]
        let localTotalGemValue = currentGemsForMap.split('/')[1]
        // If currentSession gems > localStorageGemsPer[x]map -> Update local storage
        if (currentSessionData.gemCount > parseInt(localGemValue, 10)) {
            let updatedLocalStorage = JSON.parse(localStorage.getItem('userData'))
            updatedLocalStorage.gemsPerMap[`${updatedLocalStorage.selectedLevel}.bmp`] = `${currentSessionData.gemCount}/${localTotalGemValue}`
            localStorage.setItem('userData', JSON.stringify(updatedLocalStorage))
        }
    }
});