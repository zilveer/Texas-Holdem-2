class Hand extends PokerHand {

  constructor(cards, pile) {
    super(cards, pile);
    this.hand = cards;
    this.pile = pile;
    sort(this.hand);
    // this.id = Math.floor(Math.random()*10000);
    // this.render();
  }

  // render() {
  //   const hands = document.getElementById('hands');
  //   var ul = document.createElement('ul');
  //   ul.id = this.id;
  //   hands.appendChild(ul);
  //
  //   this.hand.forEach ( card => {
  //     var hand = document.getElementById(`${this.id}`);
  //     hand.appendChild(card.image);
  //   });
  // }

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
