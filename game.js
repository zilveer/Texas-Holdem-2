// import Deck from './deck';
class Game {

  setup() {
    // let deck = new Deck();
    // let pile = deck.dealPile();
    // let hand = deck.dealHand();

    let pokerHand = new PokerHand();

    pokerHand.pile = new Hand([ new Card('spades', 'ace'), new Card('spades', 'ace'), new Card('spades', 'ace'),new Card('spades', 'king'), new Card('spades', 'ten')   ]).hand;


    pokerHand.hand = new Hand([ new Card('spades', 'ace'), new Card('spades', 'two'), new Card('spades', 'three'),new Card('spades', 'four'), new Card('spades', 'five')   ]).hand;
    pokerHand.isFlush();

debugger
  }


}
