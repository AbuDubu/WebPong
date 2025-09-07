document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const game = new PongGame(canvas);
  game.draw();
  const resetButton = document.getElementById("resetButton");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  resetButton.addEventListener("click", () => {
    game.resetGame();
  });
  startButton.addEventListener("click", () => {
    game.startGame();
    game.gameLoop();
  });
  pauseButton.addEventListener("click", () => {
    game.stopGame();
  });
});
