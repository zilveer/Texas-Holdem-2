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
    this.raises = true;

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

    }

    for (var j = 0; j < this.players.length; j++) {
      const player = this.players[j];
      player.resetCurrentBet();
    }

    // this.queue = this.players;
    this.takeBets(this.queue[0]);
  }

  playRound() {
    // while (!this.roundOver()) {
      // this.deck = shuffle(this.deck);
      // this.resetPlayers();
      // const pile = this.deck.dealPile(); //3 cards
      //
      // for (let i = 0; i < this.players.length; i++) {
      //   const player = this.players[i];
      //   if (player.bankroll <= 0) { continue; }
      //   player.dealIn(this.deck.dealHand());
      //   player.hand.pile = pile.pile;
      // }
      //
      // this.takeBets();
        this.calls = 0;

        if (this.roundOver()) {
          this.endRound();
          return;
        }


        this.high_bet = 0;
        this.most_recent_better = null;
        this.raises = true;

        if ( this.pile.pile.length < 5) {
          this.pile.pile.push(this.deck.take(1)[0]); //4 cards
        }
        //
        for (let i = 0; i < this.players.length; i++) {
          const player = this.players[i];
          if (player.bankroll <= 0) { continue; }
          player.hand.pile = this.pile.pile;
          // this.resetButtons(player);
        }

        for (var j = 0; j < this.players.length; j++) {
          const player = this.players[j];
          player.resetCurrentBet();
        }

        this.pile.render();

        this.takeBets(this.queue[0]);



    //   pile.pile.push(this.deck.take(1)[0]); //5 cards
    //   for (let i = 0; i < this.players.length; i++) {
    //     const player = this.players[i];
    //     if (player.bankroll <= 0) { continue; }
    //     player.hand.pile = pile.pile;
    //   }
    //   pile.render();
    //
    //
    //   this.takeBets();
    //
    // this.endRound();
  }

  takeBets(player) {

   if (player.isFolded()) {
     this.queue.shift();
     return this.takeBets(this.queue[0]);
   }

  this.displayStatus(player);
  // this.resetButtons(player);
  this.setButtons(player);


   // while (this.raises) {
   //
   //  this.raises = false;
   //
   //  // for (var i = 0; i < this.players.length; i++) {
   //
   //  this.iteration = 0;
   //
   //  while (this.iteration < this.players.length)  {
   //    const player = this.players[this.iteration];
   //
   //    if (player.isFolded()) { continue; }
   //    if (this.most_recent_better === player || this.roundOver() ) { break; }
   //
   //    this.displayStatus(player, this.high_bet);
   //    this.resetButtons(player);
   //
   //    const i = this.iteration;
   //    while ( (this.iteration - 1) !== i ) {
   //      this.setButtons(player);
   //      //
   //    }
   //
   //  }
   //
   // }
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
    this.calls += 1;
    // debugger

    if ( this.roundOver() || this.most_recent_better === player || this.queue.length === 1 || this.calls === this.players.length ) {
      this.queue.shift();
      this.queue.push(player);
      this.resetButtons(player);
      return this.playRound();
    } else {
      this.queue.shift();
      this.queue.push(player);
      this.takeBets(this.queue[0]);
      this.resetButtons(player);
    }



  }

  sendFold(player) {
    player.fold();
    this.queue.shift();

    if ( this.roundOver() || this.most_recent_better === player || this.queue.length === 1 ) {
      // debugger
      this.resetButtons(player);
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
      this.resetButtons(player);
    }

  }

  sendBet(player) {

    this.queue.shift();
    this.queue.push(player);

    if ( this.most_recent_better === player ) {
      return this.playRound();
    }

    // console.log("not enough money") if player.bankroll < high_bet;
    this.raises = true;
    this.most_recent_better = player;
    const bet = player.getBet();
    // console.log("bet must be at least $#{high_bet}") if bet < high_bet;
    const takeBet = player.takeBet(bet);
    this.high_bet = bet;
    this.addToPot(takeBet);

    if ( this.roundOver() || this.queue.length === 1 ) {
      this.resetButtons(player);
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
      this.resetButtons(player);
    }

  }



  endRound() {

    const dealerMessage = document.getElementById('dealer-message-box');
    var li = document.createElement('li');

    const winningHand = this.winner().hand;
    // const winningHand ='hello from endround';
    this.showHands();
//
    li.innerHTML = `WINNER - ${this.winner().name} wins $${this.pot} with a ${winningHand.rank()}`;
//
    dealerMessage.appendChild(li);
    this.winner().receiveWinnings(this.pot);
    this.pot = 0;
    this.returnCards();
    resetHandPile();

    this.setup();
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

  displayStatus(player) {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = `Pot: ${this.pot} High Bet: ${this.high_bet} Current Player: ${player.name}  Current Player Bets: ${player.currentBet}`;

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
