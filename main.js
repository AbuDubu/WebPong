document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new PongGame(canvas);
    game.draw();
    game.gameLoop();
});

