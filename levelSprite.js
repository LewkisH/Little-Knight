export default class levelSprite {
    constructor({position, imageSrc, gameElem, playerObj}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.gameElem = gameElem
        this.playerObj = playerObj
    }

    draw() {
        if (!this.image) return;
        this.gameElem.style.backgroundImage = `url(${this.image.src})`;
        this.gameElem.style.backgroundRepeat = "no-repeat";
        // Hardcoded this ground level atm
        this.gameElem.style.backgroundPositionY = "66%";
        // Hardcoded gameWidth 908 (most right side) 
        let cameraX = 100 - Math.ceil(((908 - (this.playerObj.x))/908) * 100)
        this.gameElem.style.backgroundPositionX = `${cameraX}%`;
        //Camera Y here *Todo
        //Panbox *Todo
    }

    update() {
        this.draw()
    }
}