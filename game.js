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
      if (most_recent_better === player || this.roundOver() ) { break; }

      this.displayStatus(player, high_bet);
      // const dealerMessage = document.getElementById('dealer-message-box');
      // dealerMessage.innerHTML = `Pot: ${this.pot} High Bet: ${high_bet} Current Player: ${player.name}  Current Player Bets: ${player.currentBet}`;
      //
      // this.players.forEach ( player => {
      //   player.renderMoney();
      // });

      // var foldButton =
      document.getElementById(`${player.name}fold`).style.visibility = 'display';
      // var callButton =
      document.getElementById(`${player.name}call`).style.visibility = 'display';
      // var betButton =
      document.getElementById(`${player.name}bet`).style.visibility = 'display';
      //         begin
      //           response = player.respond_bet
      //           case response
      //           when :call
      //             add_to_pot(player.take_bet(high_bet))
      //           when :bet
      //             raise "not enough money" unless player.bankroll >= high_bet
      //             no_raises = false
      //             most_recent_better = player
      //             bet = player.get_bet
      //             raise "bet must be at least $#{high_bet}" unless bet >= high_bet
      //             rs = player.take_bet(bet)
      //             high_bet = bet
      //             add_to_pot(rs)
      //           when :fold
      //             player.fold
      //           end
      //         rescue => error
      //           puts "#{error.message}"
      //           retry
      //         end
      //
      //       end
      //     end
      //   end





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
