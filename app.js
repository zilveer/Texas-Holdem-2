newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', newGame);


function newGame() {
  return new Game (new Player(100000), new Player(100000), new Player(100000));
}
