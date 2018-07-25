// import Card from './card.js';
import Shuffle from './utils.js';

class Deck {

  constructor() {
    this.deck = this.populateDeck();
  }

  populateDeck() {
    const sample = new Card();
    const deck = [];
    sample.values().forEach( value => {
      sample.suits().forEach( suit => {
        deck.push( new Card(suit, value) );
      });
    });
    return deck;
  }

  dealHand() {

  }

  count() {
    return this.deck.length;
  }

  take(n) {
    if (n > this.count()) {
      return null;
    }
    const dealtCard = this.deck.shift();
    return dealtCard;
  }


}

//
// class Deck
//   def self.all_cards
//     Card.suits.product(Card.values).map do |suit, value|
//       Card.new(suit, value)
//     end
//   end
//
//   def initialize(cards = Deck.all_cards)
//     @cards = cards
//   end
//
//   def deal_hand
//     Hand.new(take(5))
//   end
//
//   def count
//     @cards.count
//   end
//
//   def take(n)
//     raise "not enough cards" if n > count
//     @cards.shift(n)
//   end
//
//   def return(cards)
//     @cards.push(*cards)
//   end
//
//   def shuffle
//     @cards.shuffle!
//   end
// end

// export default Deck;
