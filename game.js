// import Deck from './deck';
class Game {

  constructor(players){
    this.players = players;
    this.pot = 0;
    this.deck = new Deck();
  }

  resetPlayers() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      player.unfold();
    }
  }

  winner() {
    // return Math.max.apply(Math, this.players.map( player => { return player.bankroll; }));
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


      // this.take_bets();

      pile.pile.push(this.deck.take(1)[0]); //4 cards
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.bankroll <= 0) { continue; }
        player.hand.pile = pile.pile;
      }
      pile.render();


      // this.take_bets();

      pile.pile.push(this.deck.take(1)[0]); //5 cards
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.bankroll <= 0) { continue; }
        player.hand.pile = pile.pile;
      }
      pile.render();

      // this.take_bets();

    // }
    // this.players[1].hand.rank();
    // this.winner();

    this.endRound();
  }

  endRound() {
    const dealerMessage = document.getElementById('dealer-message-box');
    var li = document.createElement('li');
    const winningHand = this.winner().hand;
    // const winningHand ='hello from endround';
    this.showHands();

    li.innerHTML = `WINNER - ${winningHand} wins $${this.pot} with a ${winningHand.rank()}`;

    dealerMessage.appendChild(li);
    this.winner().receiveWinnings(this.pot);
    this.pot = 0;
    this.returnCards();
  }

  takeBets() {
    this.players.forEach( player => (
      player.resetCurrentBet()
    ));

   let high_bet = 0;
   let most_recent_better = null;

   let noRaises = true;
   while (noRaises) {
    noRaises = false;
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.isFolded) { continue; }
      if (most_recent_better === player || this.roundOver() ) {
        break;
      }
      //display status of bet
    }

   }

  }

  showHands() {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = 'Show hands!';
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.isFolded()) { continue; }
      var li = document.createElement('li');
      li.innerHTML = `${player.hand} ${player.hand.rank()}`;
      dealerMessage.appendChild(li);
    }
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
      this.deck.returnCards(player.returnCards());
    }
  }

  addToPot(amount) {
    this.pot += amount;
  }

}

//
//   def display_status(index, high_bet)
//     puts
//     puts "Pot: $#{@pot}"
//     puts "High bet: $#{high_bet}"
//
//     players.each_with_index do |player, i|
//       puts "Player #{i + 1} has #{player.bankroll}"
//     end
//
//     puts
//     puts "Current player: #{index + 1}"
//     puts "Player #{index + 1} has bet: $#{players[index].current_bet}"
//     puts "The bet is at $#{high_bet}"
//     puts "Player #{index + 1}'s hand: #{players[index].hand}"
//   end
//
//   def end_round
//     show_hands
//     puts
//     puts "WINNER"
//     puts "#{winner.hand} wins $#{pot} with a #{winner.hand.rank}"
//     winner.receive_winnings(pot)
//     @pot = 0
//     return_cards
//   end
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
