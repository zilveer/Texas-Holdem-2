// import Deck from './deck';
class Game {

  setup() {
    // let deck = new Deck();
    // let pile = deck.dealPile();
    // let hand = deck.dealHand();

    let pokerHand = new PokerHand();

    pokerHand.pile = new Hand([ new Card('clubs', 'ace'), new Card('clubs', 'ace'), new Card('clubs', 'ace'),new Card('hearts', 'king'), new Card('hearts', 'ten')   ]).hand;


    pokerHand.hand = new Hand([ new Card('diamonds', 'ace'), new Card('diamonds', 'two'), new Card('spades', 'three'),new Card('spades', 'four'), new Card('spades', 'five')   ]).hand;
    pokerHand.isFlush();

debugger
  }


}
