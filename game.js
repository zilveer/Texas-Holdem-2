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
    return Math.max.apply(Math, this.players.map( player => { return player.bankroll; }));
  }

  play() {
    while (!gameOver) {
      this.playRound();
    }
  }

  playRound() {
    this.deck = shuffle(this.deck);
    this.resetPlayers();
    const pile = this.deck.dealPile(); //3 cards

    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.bankroll <= 0) { continue; }
      player.dealIn(this.deck.dealHand());
      player.hand.pile = pile;
    }

    this.take_bets();

    pile.pile.push(this.deck.take(1)); //4 cards

    this.take_bets();

    pile.pile.push(this.deck.take(1)); //5 cards

    this.take_bets();

    this.end_round();
  }

  endRound() {
    dealerMessage = document.getElementById('dealer-message-box');
    var li = document.createElement('li');
    const winningHand = this.winner().hand;

    this.showHands();

    li.innerHTML = `WINNER - ${winningHand} wins $${this.pot} with a ${winningHand.rank()}`;

    dealerMessage.appendChild(li);
    this.winner().receiveWinnings(this.pot);
    this.pot = 0;
    this.returnCards();
  }
  // show_hands
  // puts
  // puts "WINNER"
  // puts "#{winner.hand} wins $#{pot} with a #{winner.hand.rank}"
  // winner.receive_winnings(pot)
  // @pot = 0
  // return_cards

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
//until no_raises
//       no_raises = true
//       players.each_with_index do |player, i|
//         next if player.folded?
//         break if most_recent_better == player || round_over?
//
//         display_status(i, high_bet)
//
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

  }

  showHands() {
    dealerMessage = document.getElementById('dealer-message-box');
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
