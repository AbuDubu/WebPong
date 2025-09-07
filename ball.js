class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 3;
    this.dy = 3;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  move(canvasWidth, canvasHeight) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
    }
  }

  checkCollision(paddle1, paddle2) {
    if (
      this.x + this.radius > paddle1.x &&
      this.x - this.radius < paddle1.x + paddle1.width &&
      this.y + this.radius > paddle1.y &&
      this.y - this.radius < paddle1.y + paddle1.height
    ) {
      this.dx = -this.dx;
    }
    if (
      this.x + this.radius > paddle2.x &&
      this.x - this.radius < paddle2.x + paddle2.width &&
      this.y + this.radius > paddle2.y &&
      this.y - this.radius < paddle2.y + paddle2.height
    ) {
      this.dx = -this.dx;
    }
  }

  reset(canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
  }
}
