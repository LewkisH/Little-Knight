export default class Player {
    constructor(gameWidth, gameHeight, playerElem) {
        this.playerElem = playerElem
        this.id = 'player'

        //these are gonnna change
        this.speed = 0
        this.lives = 3
        this.vy = 0
        this.stunned = false
//

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = playerElem.clientWidth;
        this.height = playerElem.clientHeight;
        this.gravity = 0.022;
        this.backgroundScroll = 0;
        this.world = document.getElementById('gameWorldWrapper');

    }

    get x() {
        return parseFloat(getComputedStyle(this.playerElem).getPropertyValue("--xCoord"));
    }
    set x(value) {
        this.playerElem.style.setProperty("--xCoord", Math.floor(value))
    }

    get y() {
        return parseFloat(getComputedStyle(this.playerElem).getPropertyValue("--yCoord"));
    }
    set y(value) {
        this.playerElem.style.setProperty("--yCoord", Math.floor(value))
    }


    update(value, delta) {

        //move cam
        //this.world.scrollLeft = this.x - 450


        if (this.x < this.world.scrollLeft + 400) {
            this.world.scrollLeft = this.x - 400;
        } else if (this.x > this.world.scrollLeft + 500) {
            this.world.scrollLeft = this.x - 500;
        }
        if (this.y < this.world.scrollTop + 350) {
            this.world.scrollTop = this.y - 350;
        } else if (this.y > this.world.scrollTop + 400) {
            this.world.scrollTop = this.y - 400;
        }


        //move player
        const friction = 0.4
        const horizontalAcceleration = 0.8;
        const maxHorizontalSpeed = 1;
        const jumpVelocity = -3;
        


        if (value.keys.indexOf('d') > -1 && !this.stunned) {
            this.playerElem.style.transform = 'scaleX(1)';
            this.speed += horizontalAcceleration;
        } else if (value.keys.indexOf('a') > -1 && !this.stunned) {
            this.playerElem.style.transform = 'scaleX(-1)';
            this.speed -= horizontalAcceleration;


        } else { // Apply friction when there's no input
            if (this.speed > 0) {
                this.speed = Math.max(0, this.speed - friction);
            } else if (this.speed < 0) {
                this.speed = Math.min(0, this.speed + friction);
            }
        }

         // Cap horizontal velocity
    this.speed = Math.max(-maxHorizontalSpeed, Math.min(maxHorizontalSpeed, this.speed));

        //vertical input
        if ((value.keys.indexOf('w') > -1
            || value.keys.indexOf(' ') > -1) && (this.onGround())) {

            this.vy = jumpVelocity
            this.AABB.grounded = false


        }
        if (value.keys.indexOf('s') > -1) {
            this.crouch = true
        } else this.crouch = false;

        //horizontal movement
        this.x += this.speed * delta

        if (this.x <= 0) this.x = 0;


        if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

        //vertical movement
        this.y += this.vy / 2 * (delta)
        if (!this.onGround()) {
            this.vy += this.gravity / 2 * (delta)
        } else { this.vy = 0 }
        if (this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height
        }

    }
    onGround() {
        if (this.AABB.grounded) return true;
        return this.y >= this.gameHeight - this.height
    }

}
