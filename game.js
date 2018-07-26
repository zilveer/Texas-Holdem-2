// import Deck from './deck';
class Game {

  setup() {
    // let deck = new Deck();
    // let pile = deck.dealPile();
    // let hand = deck.dealHand();

    let pokerHand = new PokerHand();
    let pokerHand2 = new PokerHand();

    const pile = new Hand([ new Card('spades', 'ace'), new Card('spades', 'jack'), new Card('spades', 'queen'),new Card('spades', 'king'), new Card('spades', 'ten')   ]).hand;

    pokerHand.pile = pile;
    pokerHand2.pile = pile;

    pokerHand.hand = new Hand([ new Card('diamonds', 'eight'), new Card('spades', 'eight')  ]).hand;

    pokerHand2.hand = new Hand([ new Card('diamonds', 'nine'), new Card('spades', 'seven')  ]).hand;
pokerHand2.isStraightHelper()

debugger
  }


}
