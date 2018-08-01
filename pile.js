class Pile {

  constructor(cards) {
    this.pile = cards;
    this.render();
  }

  render() {
    this.pile.forEach ( card => {
      var pile = document.getElementById('pile');
      pile.appendChild(card.image);
    });
  }

  takeCards(cards) {
    this.pile.push(...cards);
  }

  resetPile() {
    this.pile = [];
  }

}
