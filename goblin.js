export class Goblin {
    constructor(goblinEntity) {
        this.startPos = {x:goblinEntity.style.left,y:goblinEntity.style.top}
        this.entity = goblinEntity;
        this.speed = 4;
        this.dead = false
        
    }
    
    
    
    update(delta){
        this.AABB.x += -this.speed;
        this.leftPoint = {
            x:this.AABB.x,
            y:this.AABB.y+this.AABB.height+10}

        this.rightPoint = {
            x:this.AABB.x+this.AABB.width+10,
            y:this.AABB.y+this.AABB.height+10,}
    }
}