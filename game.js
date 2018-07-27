// import Deck from './deck';
class Game {

  constructor(players){
    this.players = players;
    this.pot = 0;
    this.deck = new Deck();

    this.high_bet = 0;
    this.most_recent_better = null;
    this.raises = true;
  }

  resetPlayers() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      player.unfold();
    }
  }

  winner() {
    let strongestPlayer = null;
    for (var i = 0; i < this.players.length-1; i++) {
      for (var j = 1; j < this.players.length; j++) {
        const player = this.players[i];
        const otherPlayer = this.players[j];
        let strongPlayer = null;
        strongPlayer = this.comparator(player, otherPlayer);
        if ( strongestPlayer === null ) { strongestPlayer = strongPlayer; }
        strongestPlayer = this.comparator(strongPlayer, strongestPlayer);
      }
    }
    return strongestPlayer;
  }

  comparator(player, otherPlayer) {
    let strongPlayer;
    if (player.isEqual(otherPlayer)) {
      if (player.hand.tieBreaker(otherPlayer.hand)) {
        strongPlayer = player;
      } else {
        strongPlayer = otherPlayer;
      }
    } else {
      if (player.isGreaterThan(otherPlayer)) {
        strongPlayer = player;
      } else {
        strongPlayer = otherPlayer;
      }
    }
    return strongPlayer;
  }

  play() {
    while (!gameOver) {
      this.playRound();
    }
  }

  playRound() {
    // while (!this.roundOver()) {
      this.deck = shuffle(this.deck);
      this.resetPlayers();
      const pile = this.deck.dealPile(); //3 cards

      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.bankroll <= 0) { continue; }
        player.dealIn(this.deck.dealHand());
        player.hand.pile = pile.pile;
      }

      this.takeBets();

      pile.pile.push(this.deck.take(1)[0]); //4 cards
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.bankroll <= 0) { continue; }
        player.hand.pile = pile.pile;
      }
      pile.render();


      this.takeBets();

      pile.pile.push(this.deck.take(1)[0]); //5 cards
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.bankroll <= 0) { continue; }
        player.hand.pile = pile.pile;
      }
      pile.render();


      this.takeBets();

    this.endRound();
  }

  endRound() {
    const dealerMessage = document.getElementById('dealer-message-box');
    var li = document.createElement('li');

    const winningHand = this.winner().hand;
    // const winningHand ='hello from endround';
    this.showHands();

    li.innerHTML = `WINNER - ${this.winner().name} wins $${this.pot} with a ${winningHand.rank()}`;

    dealerMessage.appendChild(li);
    this.winner().receiveWinnings(this.pot);
    this.pot = 0;
    this.returnCards();
  }
  // //
  takeBets() {

    for (var j = 0; j < this.players.length; j++) {
      const player = this.players[j];
      player.resetCurrentBet();
    }

   this.high_bet = 0;
   this.most_recent_better = null;
   this.raises = true;

   while (this.raises) {

    this.raises = false;

    // for (var i = 0; i < this.players.length; i++) {
    let i = 0;
    while (i < this.players.length)  {
      const player = this.players[i];

      if (player.isFolded()) { continue; }
      if (this.most_recent_better === player || this.roundOver() ) { break; }

      this.displayStatus(player, this.high_bet);
      this.resetButtons(player);
      this.setButtons(player); //raises is set to true for bets


      i++;

    }

   }
  }

  setButtons(player) {

    var foldButton = document.getElementById(`${player.name}fold`);
    var callButton = document.getElementById(`${player.name}call`);
    var betButton = document.getElementById(`${player.name}bet`);

    foldButton.addEventListener('click', this.sendFold.bind(this, player));
    callButton.addEventListener('click', this.sendCall.bind(this, player));
    betButton.addEventListener('click', this.sendBet.bind(this, player));

    foldButton.style.display = 'block';
    callButton.style.display = 'block';
    betButton.style.display = 'block';

  }

  resetButtons(player) {
    var foldButton = document.getElementById(`${player.name}fold`);
    var callButton = document.getElementById(`${player.name}call`);
    var betButton = document.getElementById(`${player.name}bet`);

    foldButton.removeEventListener('click', this.sendFold.bind(this, player));
    callButton.removeEventListener('click', this.sendCall.bind(this, player));
    betButton.removeEventListener('click', this.sendBet.bind(this, player));

    foldButton.style.display = 'none';
    callButton.style.display = 'none';
    betButton.style.display = 'none';
  }

  sendCall(player) {
    this.addToPot(player.takeBet(this.high_bet));
  }

  sendFold(player) {
    player.fold();
  }

  sendBet(player) {
    // console.log("not enough money") if player.bankroll < high_bet;
    this.raises = true;
    this.most_recent_better = player;
    const bet = player.getBet();
    // console.log("bet must be at least $#{high_bet}") if bet < high_bet;
    const takeBet = player.takeBet(bet);
    this.high_bet = bet;
    this.addToPot(takeBet);
  }






  showHands() {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = 'Show hands!';
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.isFolded()) { continue; }
      var li = document.createElement('li');
      let string = "";
      // player.hand.hand.forEach( card => { string += `${card.to_s()} `; });
      li.innerHTML = `${player.name}: ${player.hand.rank()}`;
      dealerMessage.appendChild(li);
    }
  }

  displayStatus(player, high_bet) {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = `Pot: ${this.pot} High Bet: ${high_bet} Current Player: ${player.name}  Current Player Bets: ${player.currentBet}`;

    this.players.forEach ( player => {
      player.renderMoney();
    });
  }

  roundOver() {
    let count = 0;
    this.players.forEach( player => {
      if (!player.isFolded()) { count += 1; }
    });
    return count <= 1;
  }

  gameOver() {
    let count = 0;
    this.players.forEach( player => {
      if (player.bankroll > 0) { count += 1; }
    });
    return count <= 1;
  }

  returnCards() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      this.deck.returnCards(player.returnCards().hand);
    }
  }

  addToPot(amount) {
    this.pot += amount;
  }

}

//
//   def end_game
//     puts "The game is over"
//   end
// end
//
// def test
//   g = Game.new
//   g.add_players(5, 100)
//   g.play
// end
//
// if __FILE__ == $PROGRAM_NAME
//   test
// end
