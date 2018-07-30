// import Deck from './deck';
class Game {

  constructor(players){
    this.players = players;
    this.pot = 0;
    this.deck = new Deck();
    // this.pile = this.deck.dealPile();

    this.queue = [];
    this.calls = 0;
    this.high_bet = 0;
    this.most_recent_better = null;
    // this.raises = true;

    this.setup();
  }

  resetPlayers() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      player.unfold();
    }
  }

  winner() {

    if ( this.queue.length === 1 ) {
      return this.queue[0];
    }

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

  // play() {
  //   while (!gameOver) {
  //     this.playRound();
  //   }
  // }

  setup() {

    resetHandPile();

    this.high_bet = 0;
    this.most_recent_better = null;
    this.raises = true;

    this.deck = shuffle(this.deck);
    this.pile = this.deck.dealPile();
    this.resetPlayers();
    this.queue = deepDup(this.players);
    // const pile = this.deck.dealPile(); //3 cards

    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.bankroll <= 0) { continue; }
      player.dealIn(this.deck.dealHand());
      player.hand.pile = this.pile.pile;
      this.hidePlayerCards(player);
    }

    for (var j = 0; j < this.players.length; j++) {
      const player = this.players[j];
      player.resetCurrentBet();
    }

    // this.queue = this.players;
    this.takeBets(this.queue[0]);
  }

  playRound() {

      if ( ( this.pile.pile.length === 5 && this.calls === this.queue.length) || this.roundOver() || ( this.most_recent_better === this.queue[0] && this.pile.pile.length === 5 ) ) {
        return this.endRound();
      }

      this.calls = 0;

      this.high_bet = 0;
      this.most_recent_better = null;
      this.raises = true;

      if ( this.pile.pile.length < 5) {
        this.pile.pile.push(this.deck.take(1)[0]); //4 cards
      }
      //
      for (let i = 0; i < this.queue.length; i++) {
        const player = this.queue[i];
        if (player.bankroll <= 0 ) { continue; }
        player.hand.pile = this.pile.pile;
        player.resetCurrentBet();
        this.resetButtons(player);
        this.hidePlayerCards(player);
        // this.resetButtons(player);
      }


      this.pile.render();

      this.takeBets(this.queue[0]);

  }

  takeBets(player) {

    // var hand = document.getElementById(`${this.name}-hand`);

    this.displayStatus(player);
    this.displayPlayerCards(player);
    this.setButtons(player);

  }

  hidePlayerCards(player) {
    const hand = document.getElementById(`${player.name}-hand`).remove();

    for (var i = 0; i < player.hand.hand.length; i++) {
      const card = player.hand.hand[i];
      const img = document.createElement('img');
      img.src = './images/png/blue-back.png';
      card.image = img;
    }
    player.render(player.hand);
  }

  displayPlayerCards(player) {
    const hand = document.getElementById(`${player.name}-hand`).remove();

    for (var i = 0; i < player.hand.hand.length; i++) {
      const card = player.hand.hand[i];
      const img = document.createElement('img');
      img.src = `./images/PNG/${card.value}-${card.suit}.png`;
      card.image = img;
    }
    return player.render(player.hand);
  }

  sendFold(player) {
    player.fold();
    this.resetButtons(player);
    this.queue.shift();

    if ( this.roundOver() || this.most_recent_better === this.queue[0] || this.queue.length === 1 || this.calls === this.queue.length) {
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
    }

  }

  sendCall(player) {
    this.resetButtons(player);
    this.hidePlayerCards(player);
    this.addToPot(player.takeBet(this.high_bet));
    this.calls += 1;
    this.queue.shift();
    this.queue.push(player);

    if ( this.roundOver() || this.most_recent_better === this.queue[0] || this.queue.length === 1 || this.calls >= this.queue.length ) {
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
    }

  }

  sendBet(player) {
    this.most_recent_better = player;
    this.queue.shift();
    this.queue.push(player);
    this.hidePlayerCards(player);
    this.resetButtons(player);

    // if ( this.most_recent_better === this.queue[0] || this.calls === this.queue.length) {
    //   return this.playRound();
    // }

    // console.log("not enough money") if player.bankroll < high_bet;
    // this.raises = true;
    // this.most_recent_better = player;
    const bet = player.getBet();
    this.calls = 0;
    // console.log("bet must be at least $#{high_bet}") if bet < high_bet;
    const takeBet = player.takeBet(bet);
    this.high_bet = bet;
    this.addToPot(takeBet);

    if ( this.roundOver() || this.queue.length === 1 ) {
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
    }

  }



  endRound() {

    const dealerMessage = document.getElementById('dealer-message-box');
    var li = document.createElement('li');
    li.id = 'winner-message';

    const winningHand = this.winner().hand;

    this.showHands();

    li.innerHTML = `WINNER - ${this.winner().name} wins $${this.pot} with a ${winningHand.rank()}`;

    dealerMessage.appendChild(li);
    this.winner().receiveWinnings(this.pot);
    this.pot = 0;
    this.returnCards();

    return setTimeout(this.setup.bind(this), 7000);
  }


  showHands() {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = 'Show hands!';
    for (var i = 0; i < this.queue.length; i++) {
      const player = this.queue[i];
      this.displayPlayerCards(player);
      if (player.isFolded()) { continue; }
      var li = document.createElement('li');
      let string = "";
      li.innerHTML = `${player.name}: ${player.hand.rank()}`;
      dealerMessage.appendChild(li);
    }
  }

  displayStatus(player) {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = '';

    var ul = document.createElement('ul');
    ul.id = 'display-status';

    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');

    li1.innerHTML = `Pot: $${formatMoney(this.pot)}`;
    li2.innerHTML = `High Bet: $${formatMoney(this.high_bet)}`;
    li3.innerHTML = `Current Player: ${player.name}`;
    li4.innerHTML = `Current Bet: $${formatMoney(player.currentBet)}`;

    dealerMessage.appendChild(ul);
    const message = document.getElementById('display-status');
    message.appendChild(li1);
    message.appendChild(li2);
    message.appendChild(li3);
    message.appendChild(li4);


    this.queue.forEach ( player => {
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

    foldButton.style.display = 'none';
    callButton.style.display = 'none';
    betButton.style.display = 'none';

    foldButton.outerHTML = foldButton.outerHTML;
    callButton.outerHTML = callButton.outerHTML;
    betButton.outerHTML = betButton.outerHTML;

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
