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
    //players.max
  }

  play() {

  }

  showHands() {
    console.log('hands!');
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.isFolded) { continue; }
      player.dealIn(this.deck.dealHand());
    }
  }

    // def show_hands
    //   puts "HANDS"
    //   players.each do |player|
    //     next if player.folded?
    //     puts "#{player.hand} (#{player.hand.rank})"
    //   end
    // end


  dealCards() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.bankroll <= 0) { continue; }
      player.dealIn(this.deck.dealHand());
    }
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

  setup() {
    // let deck = new Deck();
    // let pile = deck.dealPile();
    // let hand = deck.dealHand();

    let pokerHand = new PokerHand();
    let pokerHand2 = new PokerHand();
    let pokerHand3 = new PokerHand();

    const pile = new Hand([
      new Card('diamonds', 'nine'),
      new Card('hearts', 'seven'),
      new Card('spades', 'four'),
      new Card('hearts', 'jack'),
      new Card('clubs', 'seven')
    ]).hand;

    pokerHand.pile = pile;
    pokerHand2.pile = pile;
    pokerHand3.pile = pile;

    pokerHand.hand = new Hand([
      new Card('hearts', 'ten'),
      new Card('hearts', 'nine')
    ]).hand;

    pokerHand2.hand = new Hand([
      new Card('diamonds', 'nine'),
      new Card('spades', 'seven')
    ]).hand;

    pokerHand3.hand = new Hand([
      new Card('diamonds', 'eight'),
      new Card('spades', 'ten')
    ]).hand;

    pokerHand2.rank();

debugger
  }


}

//
// require_relative './player'
// require_relative './deck'
//
//   def play
//     play_round until game_over?
//     end_game
//   end
//
//   def play_round
//     deck.shuffle
//     reset_players
//     deal_cards
//     take_bets
//     trade_cards
//     take_bets
//     end_round
//   end
//

//   def take_bets
//     players.each(&:reset_current_bet)
//     high_bet = 0
//     no_raises = false
//     most_recent_better = nil
//
//     until no_raises
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
//   end
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


//

//
//   def round_over?
//     players.count { |player| !player.folded? } <= 1
//   end
//
//   def game_over?
//     players.count { |player| player.bankroll > 0 } <= 1
//   end
//
//   def add_players(n, buy_in)
//     n.times { @players << Player.buy_in(buy_in) }
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
