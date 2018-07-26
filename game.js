// import Deck from './deck';
class Game {

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
