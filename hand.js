class Hand {

  constructor(cards) {
    this.hand = cards;
    sort(this.hand);
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

}


// new Hand([ new Card('spades', 'ace'), new Card('spades', 'jack'), new Card('spades', 'queen'),new Card('spades', 'king'), new Card('spades', 'ten')   ]).hand;
// new Hand([ new Card('spades', 'ace'), new Card('spades', 'two'), new Card('spades', 'three'),new Card('spades', 'four'), new Card('spades', 'five')   ]).hand;
