class Pile {

  constructor(cards) {
    this.pile = cards;
  }

  takeCards(cards) {
    this.pile.push(...cards);
  }

  resetPile() {
    this.pile = [];
  }

}
