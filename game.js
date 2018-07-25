// import Deck from './deck';
class Game {

  setup() {
    let deck = new Deck();
    let pile = deck.dealPile();
    let hand = deck.dealHand();
    let pokerHand = new PokerHand(hand.hand, pile.pile);
    pokerHand.hand = new Hand([ new Card('spades', 'ace'), new Card('spades', 'jack'), new Card('spades', 'queen'),new Card('spades', 'king'), new Card('spades', 'ten')   ]).hand;
    pokerHand.isStraight();
    debugger
  }


}
