newGameButton = document.getElementById('newGame2');
newGameButton.addEventListener('click', newGame2);

newGameButton = document.getElementById('newGame3');
newGameButton.addEventListener('click', newGame3);

newGameButton = document.getElementById('newGame4');
newGameButton.addEventListener('click', newGame4);

function resetHandPile() {
  const hands = document.getElementById('hands');
  const pile = document.getElementById('pile');
  hands.innerHTML = '';
  pile.innerHTML = '';
}

function newGame2() {
  resetHandPile();
  const game = new Game ( [new Player('Player1', 100000), new Player('Player2', 100000)] );
  return game.playRound();
}

function newGame3() {
  resetHandPile();
  const game = new Game ( [new Player('Player1', 100000), new Player('Player2', 100000), new Player('Player3', 100000)] );
  return game.playRound();
}

function newGame4() {
  resetHandPile();
  const game = new Game ( [new Player('Player1', 100000), new Player('Player2', 100000), new Player('Player3', 100000), new Player('Player4', 100000)] );
  return game.playRound();
}
