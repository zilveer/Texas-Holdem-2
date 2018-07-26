// import Deck from './deck';
class Game {

  setup() {
    // let deck = new Deck();
    // let pile = deck.dealPile();
    // let hand = deck.dealHand();

    let pokerHand = new PokerHand();
    let pokerHand2 = new PokerHand();

    const pile = new Hand([ new Card('hearts', 'ace'), new Card('hearts', 'jack'), new Card('hearts', 'queen'),new Card('hearts', 'king'), new Card('hearts', 'five')   ]).hand;

    pokerHand.pile = pile;
    pokerHand2.pile = pile;

    pokerHand.hand = new Hand([ new Card('hearts', 'ten'), new Card('hearts', 'nine')  ]).hand;

    pokerHand2.hand = new Hand([ new Card('diamonds', 'nine'), new Card('spades', 'seven')  ]).hand;
    pokerHand.isRoyalFlush();

debugger
  }


}
