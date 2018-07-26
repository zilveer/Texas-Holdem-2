class Player {

  constructor(bankroll) {
    this.bankroll = bankroll;
    this.currentBet = 0;
  }

  dealIn(hand) {
    this.hand = hand;
  }

  receiveWinnings(amount) {
    this.bankroll += amount;
  }

  resetCurrentBet() {
    this.currentBet = 0;
  }

  fold() {
    this.folded = true;
  }

  unfold() {
    this.folded = false;
  }

  isFolded() {
    return this.folded;
  }

  returnCards() {
    const cards = this.hand;
    this.hand = null;
    return cards;
  }



}

//   def self.buy_in(bankroll)
//     Player.new(bankroll)
//   end
//
//   def respond_bet
//     print "(c)all, (b)et, or (f)old? > "
//     response = gets.chomp.downcase[0]
//     case response
//     when 'c' then :call
//     when 'b' then :bet
//     when 'f' then :fold
//     else
//       puts 'must be (c)all, (b)et, or (f)old'
//       respond_bet
//     end
//   end
//
//   def get_bet
//     print "Bet (bankroll: $#{bankroll}) > "
//     bet = gets.chomp.to_i
//     raise 'not enough money' unless bet <= bankroll
//     bet
//   end
//
//   def get_cards_to_trade
//     print "Cards to trade? (ex. '1, 4, 5') > "
//     card_indices = gets.chomp.split(', ').map(&:to_i)
//     raise 'cannot trade more than three cards' unless card_indices.count <= 3
//     puts
//     card_indices.map { |i| hand.cards[i - 1] }
//   end
//
//   def take_bet(total_bet)
//     amount = total_bet - @current_bet
//     raise 'not enough money' unless amount <= bankroll
//     @current_bet = total_bet
//     @bankroll -= amount
//     amount
//   end
//
//   def <=>(other_player)
//     hand
//     other_player.hand
//     hand <=> other_player.hand
//   end
// end
