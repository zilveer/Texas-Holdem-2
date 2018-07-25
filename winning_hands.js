class WinningHands {

  pairs() {
    let pairs = [];
    const handPile = this.hand.concat(this.pile);
    unique(handPile.map( el => ( el.value ))).forEach( value => {
      if (this.card_value_count(value) === 2) {
        pairs.push( handPile.filter( card => (card.value === value) ) );
      }
    });
    return pairs;
  }

  lowPair() {
    if (this.pairs().length < 2 ) {
      return null;
    }
    return this.pairs()[0][0].isGreaterThan(this.pairs()[1][0]) ? this.pairs()[0] : this.pairs()[1];
  }

  highPair() {
    if (this.pairs().length < 2 ) {
      return null;
    }
    return this.pairs()[1][0].isGreaterThan(this.pairs()[0][0]) ? this.pairs()[0] : pairs[1];
  }

}
