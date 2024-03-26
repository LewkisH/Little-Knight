import { updateHud } from "./hud.js";


const gameWorld = document.getElementById('gameWorldWrapper')
const wrapperRect = gameWorld.getBoundingClientRect();
export class AABBItem { //class to turn any object into a collidable.
    constructor(entity, type) {
        if (entity.id === 'player') {
            this.elem = document.getElementById("player")
            this.id = "player"; // for debug name
            this.width = entity.width;
            this.height = entity.height;
            entity.AABB = this
            this.entity = entity;
            this.grounded = false


            /*   } else if (type === "goblin") {
                  entity.AABB = this
                  this.entity = entity
                  this.elem = entity.elem */
        } else if (type === "door" || type === "goblin") {
            entity.AABB = this
            this.entity = entity
            this.elem = entity.elem
            let rect = this.elem.getBoundingClientRect();
            this.width = rect.right - rect.left;
            this.height = rect.bottom - rect.top;
        } else {

            this.elem = entity
            let rect = this.elem.getBoundingClientRect();
            this.id = entity.id;
            this.width = rect.right - rect.left;
            this.height = rect.bottom - rect.top;
        }
        this._x = null;
        this._y = null;

        // Calculate initial x and y coordinates
        this.calculatePosition();
        this.type = type
        this.debug = null
        this.name = null;
        this.debugX = null;
        this.debugY = null;
    }
    calculatePosition() {
        const rect = this.elem.getBoundingClientRect();
        this._x = rect.left + gameWorld.scrollLeft - wrapperRect.left;
        this._y = rect.top + gameWorld.scrollTop - wrapperRect.top;
    }

    // Getter for x coordinate
    get x() {
        if (this.id === "player") {
            return parseFloat(getComputedStyle(this.elem).getPropertyValue("--xCoord"));

        }
        return this._x;
    }

    // Getter for y coordinate
    get y() {
        if (this.id === "player") {
            return parseFloat(getComputedStyle(this.elem).getPropertyValue("--yCoord"));
        }
        return this._y;
    }

    // Setter for x coordinate
    set x(value) {
        if (this.id === "player") {
            this.elem.style.setProperty("--xCoord", Math.floor(value));
        } else {
            this.elem.style.left = value + "px";
        }
        this._x = value; // Update stored x coordinate
    }

    // Setter for y coordinate
    set y(value) {
        if (this.id === "player") {
            this.elem.style.setProperty("--yCoord", Math.floor(value));
        }
        this._y = value; // Update stored y coordinate
    }


    /* get x() {
        const rect = this.elem.getBoundingClientRect();
        return rect.left + gameWorld.scrollLeft - wrapperRect.left



        /*  let rect = this.elem.getBoundingClientRect();
         //console.log(this.elem, rect.left)
         return rect.left; 
    }
    set x(value) {
        if (this.id === "player") {
            this.elem.style.setProperty("--xCoord", Math.floor(value))
        } else {
            this.elem.style.left = value + "px"
        }
    }
    get y() {
        let rect = this.elem.getBoundingClientRect();
        return rect.top + gameWorld.scrollTop - wrapperRect.top;
    }
    set y(value) {
        if (this.id === "player") {
            this.elem.style.setProperty("--yCoord", Math.floor(value))
        }
    } */

    //did we collide with 'other' entity?
    checkCollision(other) {
        return (
            (this.x + this.width) > other.x &&
            (this.y + this.height) > other.y &&
            this.x < (other.x + other.width) &&
            this.y < (other.y + other.height)
        )
    }
    //calculates which side of 'other' entity did current object collide with
    collisionSide(other) {
        const dx = (this.x + this.width / 2) - (other.x + other.width / 2);
        const dy = (this.y + this.height / 2) - (other.y + other.height / 2);
        const width = (this.width + other.width) / 2;
        const height = (this.height + other.height) / 2;

        const offsetX = width - Math.abs(dx);
        const offsetY = height - Math.abs(dy);

        if (offsetX > offsetY) {
            return dy > 0 ? 'bottom' : 'top';
        } else {
            return dx > 0 ? 'right' : 'left';
        }
    }


    //displays x,y,height,width under game window
    addToDebug() {
        this.debug = document.getElementById('collisiondebug');
        this.name = document.createElement('p');
        this.debugX = document.createElement('p')
        this.debugY = document.createElement('p')
        let debugH = document.createElement('p')
        let debugW = document.createElement('p')
        this.name.textContent = this.id
        this.debugX.textContent = "X: " + this.x
        this.debugY.textContent = "Y: " + this.y
        debugH.textContent = "height: " + this.height
        debugW.textContent = "width: " + this.width
        this.debug.appendChild(this.name)
        this.name.appendChild(this.debugY)
        this.name.appendChild(this.debugX)
        this.name.appendChild(debugH)
        this.name.appendChild(debugW)
    }

    //put this in game loop to update moveable objects' coordinates when debugging
    updateDebug() {

        this.debugY.textContent = "Y: " + this.y
        this.debugX.textContent = "X: " + this.x
    }
}


export class CollisionManager { // put all collidable objects into the manager
    constructor(player) {
        this.player = player
        this.entities = [];
    }
    addEntity(entity) {
        this.entities.push(entity)
        console.log("PUSHED: " + entity.type)

    }

    //checks collisions between all objects and player.
    checkAllCollision(atEnd) {
        let playerCol = false;
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].type === "goblin") {
                this.handleGoblinCollision(this.entities[i],)
            }
            playerCol = this.handlePlayerCollision(this.player, this.entities[i], playerCol, atEnd)

        }

    }

    handleGoblinCollision(goblin) {
        let pointCollision = false
        for (let j = 0; j < this.entities.length; j++) {
            if (this.entities[j] !== goblin && this.entities[j].id !== "undefined") {
                if (goblin.checkCollision(this.entities[j])) {
                    let side = goblin.collisionSide(this.entities[j])
                    if (side === "left" || side === "right") {
                        goblin.entity.speed *= -1;
                        goblin.elem.style.transform = goblin.entity.speed < 0 ? 'scaleX(-1)' : 'scaleX(1)';
                    }
                }
                if (
                    ((goblin.entity.leftPoint.x) > this.entities[j].x &&
                        (goblin.entity.leftPoint.y) > this.entities[j].y &&
                        goblin.entity.leftPoint.x < (this.entities[j].x + this.entities[j].width) &&
                        goblin.entity.leftPoint.y < (this.entities[j].y + this.entities[j].height))
                    &&
                    ((goblin.entity.rightPoint.x) > this.entities[j].x &&
                        (goblin.entity.rightPoint.y) > this.entities[j].y &&
                        goblin.entity.rightPoint.x < (this.entities[j].x + this.entities[j].width) &&
                        goblin.entity.rightPoint.y < (this.entities[j].y + this.entities[j].height))
                ) {
                    pointCollision = true
                }
            }
        }
        if (pointCollision === false) {
            goblin.entity.speed *= -1;
            goblin.elem.style.transform = goblin.entity.speed < 0 ? 'scaleX(-1)' : 'scaleX(1)';
        }
    }

    handlePlayerCollision(player, env, playerCol, atEnd) {

        if (env.type === "yellow" && env.elem.getAttribute('gem-collected') !== 'true') {
            if (player.checkCollision(env)) {
                env.elem.setAttribute('gem-collected', 'true');
                updateHud(undefined, undefined, "increaseGems")
                const envTop = parseFloat(window.getComputedStyle(env.elem).getPropertyValue('top'));
                env.elem.style.transition = 'top 0.3s linear, opacity 0.3s linear';
                env.elem.style.top = (envTop - 20) + 'px';
                env.elem.style.opacity = '0';
                // Could also add pickup .webp here
                // Reset the position 
                setTimeout(() => {
                    env.elem.style.transition = '';
                    env.elem.style.top = (envTop) + 'px';
                }, 350);
            }
        }

        if (env.type === "door" && !player.entity.stunned && !env.entity.collided) {
            if (player.checkCollision(env)) {

                let side = player.collisionSide(env);
                env.entity.collided = true
                player.entity.stunned = true;
                player.elem.style.opacity = "0";
                env.elem.style.width = "160px";
                if (side === "left" || side === "top") {
                    env.elem.style.left = (parseFloat(env.elem.style.left || 0) - 64) + "px";
                    env.elem.style.backgroundImage = "url('assets/enterdoor-left.gif')";
                } else {
                    env.elem.style.backgroundImage = "url('assets/enterdoor-right.gif')";
                }
                setTimeout(() => {

                    atEnd.end = true
                    env.elem.style.backgroundImage = "url('assets/EndDoorTileSet.webp')"
                    env.elem.style.width = "96px"
                    if (side === "left" || side === "top") {
                        env.elem.style.left = (parseFloat(env.elem.style.left || 0) + 64) + "px";
                    }
                    env.entity.collided = false;
                    return
                }, 1000)
            }
        }


        if (env.type === "red" || (env.type === "goblin" && !env.entity.dead)) {




            if (player.checkCollision(env)) {
                let side = player.collisionSide(env)
                console.log(side)
                if (env.type === "goblin" && side === "top") {
                    env.entity.speed = 0
                    env.elem.style.backgroundImage = "url('assets/goblindead.png')"
                    env.entity.dead = true
                    player.entity.vy = -1
                    setTimeout(() => {
                        env.elem.remove()
                    }, 300)
                } else {
                    player.entity.playerElem.style.backgroundImage = "url('assets/BobHurt.png')";
                    player.entity.vy = env.type === "goblin" ? -1 : -3;

                    if (side === "right") {
                        console.log("yo")
                        player.entity.speed += 50
                    }
                    if (side === "left") {

                        player.entity.speed -= 50
                    }
                    if (!player.entity.stunned) {
                        player.entity.lives--
                    }
                    player.entity.stunned = true
                    setTimeout(() => {
                        if (player.entity.lives > 0) {
                            player.entity.playerElem.style.backgroundImage = "url('assets/Bob.png')";
                        }
                        player.entity.stunned = false;
                    }, 200); // 1000 milliseconds = 1 second
                }
            }
        }

        if ((env.type === "blue" || env.type === "green")) {

            if (player.checkCollision(env)) {
                playerCol = true
                let side = player.collisionSide(env)


                if (side === "top") {
                    //console.log(`top collision: PLAYER: ${player.x};${player.y}, ENV: ${env.x};${env.y}`)
                    //console.log(env.y, player.y)
                    if (env.type === "blue" && (player.entity.crouch || player.y + player.height - 25 > env.y)) {

                    } else if (player.entity.vy >= 0) {
                        player.entity.vy = 0;
                        player.y = env.y - player.height
                        player.grounded = true
                    }
                }
                if (env.type === "blue") {
                    return
                }
                if (side === "right") {
                    // console.log(`right collision: PLAYER: X:${player.x};Y:${player.y}, ENV: X:${env.x};Y:${env.y}`)
                    player.x = env.x + env.width

                } else if (side === "left") {
                    //console.log(`left collision: PLAYER: X:${player.x};Y:${player.y}, ENV: X:${env.x};Y:${env.y}`)


                    player.x = env.x - player.width

                }
                if (side === "bottom") {
                    //console.log(`bottom collision: PLAYER: X:${player.x};Y:${player.y}, ENV: X:${env.x};Y:${env.y}`)
                    player.y = env.y + env.height
                    player.entity.vy += 1
                }


            }
            // else {env.elem.style.backgroundColor = env.id}
        }
        if (playerCol === false) {//if player has not collided with anything this frame then player is no longer grounded.
            player.grounded = false
        }
        return (playerCol)

    }

}
