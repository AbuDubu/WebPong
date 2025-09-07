class PongGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.paddle1 = new Paddle(10, this.canvasHeight / 2 - 50, 10, 100, "white");
    this.paddle2 = new Paddle(
      canvas.width - 20,
      this.canvasHeight / 2 - 50,
      10,
      100,
      "white"
    );
    this.ball = new Ball(
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      10,
      100,
      "white"
    );
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.lastTime = new Date().getTime();
    this.playing = false;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.paddle1.draw(this.ctx);
    this.paddle2.draw(this.ctx);
    this.ball.draw(this.ctx);
  }

  gameLoop() {
    if (this.playing) {
      const currentTime = new Date().getTime();
      const deltaTime = currentTime - this.lastTime;
      if (deltaTime > this.interval) {
        this.lastTime = currentTime;
        this.draw();
        this.handleInput();
        this.ball.move(this.canvasWidth, this.canvasHeight);
        this.ball.checkCollision(this.paddle1, this.paddle2);
        this.handleScore();
        if (this.gameWon()) {
          this.resetGame();
        }
      }

      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  handleInput() {
    addEventListener(
      "keydown",
      (event) => {
        if (event.key === "w") {
          this.paddle1.moveup();
        }
        if (event.key === "s") {
          this.paddle1.movedown(this.canvasHeight);
        }
        if (event.key === "ArrowUp") {
          this.paddle2.moveup();
        }
        if (event.key === "ArrowDown") {
          this.paddle2.movedown(this.canvasHeight);
        }
      },
      { once: true }
    );
  }

  handleScore() {
    if (this.ball.x + this.ball.radius > this.canvasWidth) {
      this.paddle1.score++;

      this.ball.reset(this.canvasWidth, this.canvasHeight);
    }
    if (this.ball.x - this.ball.radius < 0) {
      this.paddle2.score++;

      this.ball.reset(this.canvasWidth, this.canvasHeight);
    }
    this.updateScore();
  }

  gameWon() {
    if (this.paddle1.score >= 5) {
      alert("Paddle 1 wins!");
      this.resetGame();
      return true;
    }
    if (this.paddle2.score >= 5) {
      alert("Paddle 2 wins!");
      this.resetGame();
      return true;
    }
    return false;
  }
  updateScore() {
    document.getElementById("paddle1Score").innerHTML =
      "Paddle 1 Score: " + this.paddle1.score;
    document.getElementById("paddle2Score").innerHTML =
      "Paddle 2 Score: " + this.paddle2.score;
  }
  resetGame() {
    this.paddle1.score = 0;
    this.paddle2.score = 0;
    this.ball.reset(this.canvasWidth, this.canvasHeight);
    this.updateScore();
  }

  stopGame() {
    this.playing = false;
  }

  startGame() {
    this.playing = true;
  }
}
