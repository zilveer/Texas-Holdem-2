class Hand extends PokerHand {

  constructor(cards, pile) {
    super(cards, pile);
    this.hand = cards;
    this.pile = pile;
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
