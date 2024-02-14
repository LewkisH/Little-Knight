import levelSprite from './levelSprite.js';
import Player from './player.js'

window.addEventListener('load', function () {
    const game = document.getElementById('game');
    const player = new Player(game.offsetWidth,game.offsetHeight,document.getElementById("player"))
    const background = new levelSprite({
        position: {
            x: game.offsetWidth,
            y: game.offsetHeight,
        },
        imageSrc: './assets/Level0Sprite.png',
        gameElem: document.getElementById('game'),
        playerObj: player
    });
    let lastTime
    function update(time) {
        if (lastTime != null) {
            const delta = time - lastTime
            background.update();
            player.update(input)
        }
        lastTime = time
        window.requestAnimationFrame(update)
    }

    console.log('yp')


    class InputHandler {
        constructor() {
            this.keys = [];

            window.addEventListener("keydown", e => {
                console.log(e.key)
                if ((e.key === "d" ||
                     e.key === "a" ||
                     e.key === "w" || 
                     e.key === "s" ) 
                     && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }

            })
            window.addEventListener("keyup", e => {
                if ((e.key === "d" ||
                     e.key === "a" ||
                     e.key === "w" || 
                     e.key === "s" )) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
             
                }

            })
        }
    }


    const input = new InputHandler()
    window.requestAnimationFrame(update)
})