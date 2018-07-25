class PokerHandWinner {

  pairs() {
    const pairs = [];
    const handPileKeys = Object.keys(this.hand.concat(this.pile));
    unique(handPileKeys).forEach( value => {
      if (this.card_value_count(value) === 2) {
        pairs.push( this.hand.filter( card => card.value === value ) );
      }
    });
    return pairs;
  }



}
