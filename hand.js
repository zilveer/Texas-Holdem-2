class Hand extends PokerHands {

  constructor(cards, pile) {
    super(cards);
    this.hand = cards;
    this.pile = pile;
  }

  takeCards(cards) {
    this.hand.push(...cards);
  }

  updatePile(pile) {
    this.pile.push(...pile);
  }

  resetHand() {
    this.hand = [];
  }

  // beats(otherHand) {
  //
  // }

  card_value_count(value) {
    const handPile = this.hand.concat(this.pile);
    return handPile.reduce( (sum, card) => (
      (card.value === value ) ? sum + 1 : sum ), 0);
  }

}

// def self.winner(hands)
//   hands.sort.last
// end
//
// def trade_cards(old_cards, new_cards)
//   raise 'must have five cards' unless old_cards.count == new_cards.count
//   raise 'cannot discard unowned card' unless has_cards?(old_cards)
//   take_cards(new_cards) && discard_cards(old_cards) && sort!
//   old_cards
// end
//
// def to_s
//   cards.join(' ')
// end
//
// private
// def sort!
//   @cards.sort!
// end
//
// def discard_cards(old_cards)
//   old_cards.each { |card| cards.delete(card) }
// end
//
// def has_cards?(old_cards)
//   old_cards.all? { |card| cards.include?(card) }
// end
// end
