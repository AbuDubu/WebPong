

class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 2;
        this.score = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveup(){

        this.y -= this.speed;
        
        if (this.y < 0) {
            this.y = 0;
        }
    }
    movedown(canvasHeight){
        this.y += this.speed;
        if (this.y > canvasHeight - this.height) {
            this.y = canvasHeight - this.height;
        }
    }


    


    
}