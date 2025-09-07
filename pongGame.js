class PongGame{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.paddle1 = new Paddle(10, this.canvasHeight / 2 - 50, 10, 100, 'white');
        this.paddle2 = new Paddle(canvas.width - 20, this.canvasHeight / 2 - 50, 10, 100, 'white');
        this.ball = new Ball(this.canvasWidth / 2, this.canvasHeight / 2, 10, 100, 'white');
        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.lastTime = new Date().getTime();
    }
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.paddle1.draw(this.ctx);
        this.paddle2.draw(this.ctx);
        this.ball.draw(this.ctx);
    }

    gameLoop(){
        const currentTime = new Date().getTime();
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime > this.interval) {
            this.lastTime = currentTime;
            this.draw();
            this.handleInput();
            this.ball.move(this.canvasWidth, this.canvasHeight);
            this.ball.checkCollision(this.paddle1, this.paddle2);
            this.handleScore();
        }
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleInput(){
        addEventListener('keydown', (event) => {
            if (event.key === 'w') {
            this.paddle1.moveup();
            }
            if (event.key === 's') {
                this.paddle1.movedown(this.canvasHeight);
            }
            if (event.key === 'ArrowUp') {
                this.paddle2.moveup();
            }
            if (event.key === 'ArrowDown') {
                this.paddle2.movedown(this.canvasHeight);
            }
        }, {once: true});

        
    }

    handleScore(){
        if (this.ball.x + this.ball.radius > this.canvasWidth) {
            this.paddle1.score++;
            document.getElementById('paddle1Score').innerHTML = this.paddle1.score;
            this.ball.reset(this.canvasWidth, this.canvasHeight);
        }
        if (this.ball.x - this.ball.radius < 0) {
            this.paddle2.score++;
            document.getElementById('paddle2Score').innerHTML = this.paddle2.score;
            this.ball.reset(this.canvasWidth, this.canvasHeight);
        }
    }

   

    
    
    
}