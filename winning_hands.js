class WinningHands {

  handPile() {
    return sort(this.hand.concat(this.pile));
  }

  tieBreaker(otherPokerHand) {
    switch (otherPokerHand.rank) {
      case 'straightFlush': case 'straight': case 'flush':
        return this.highCard().isGreaterThan(otherPokerHand.highCard());
      case 'fourKind':
        return compareSetThenHighCard(4, otherPokerHand);
      case 'threeKind':
        return compareSetThenHighCard(3, otherPokerHand);
      case 'twoPair':
        return compareTwoPair(otherPokerHand);
      case 'onePair':
        return compareSetThenHighCard(2, otherPokerHand);
      case 'house':
        return this.compareHouse(otherPokerHand);
    }
    return null;
  }

  pairs() {
    let pairs = [];
    unique(this.handPile().map( el => ( el.value ))).forEach( value => {
      if (this.card_value_count(value) === 2) {
        pairs.push( this.handPile().filter( card => (card.value === value) ) );
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

  compareHouse(otherPokerHand) {
    if ( this.set_card(3).isEqual(otherPokerHand.set_card(3)) ) {
      if ( this.set_card(2).isEqual(otherPokerHand.set_card(2)) ) {
        const highCard = this.cardsWithout( [this.set_card(3).value, this.set_card(2).value] );
        const otherHighCard = otherPokerHand.cardsWithout( [otherPokerHand.set_card(3).value, otherPokerHand.set_card(2).value] );
        return sort(highCard)[highCard.length-1].isGreaterThan(sort(highCard)[highCard.length-1]);
      } else {
        return this.set_card(2).isGreaterThan(otherPokerHand.set_card(2));
      }
    } else {
      return this.set_card(3).isGreaterThan(otherPokerHand.set_card(3));
    }
  }

  compareTwoPair(otherPokerHand) {
    if ( this.highPair()[0].isEqual(otherPokerHand.highPair()[0]) ) {
      if ( this.lowPair()[0].isEqual(otherPokerHand.lowPair()[0]) ) {
        const highCard = this.cardsWithout( [this.set_card(2).value] );
        const otherHighCard = otherPokerHand.cardsWithout( [otherPokerHand.set_card(2).value] );
        return sort(highCard)[highCard.length-1].isGreaterThan(sort(highCard)[highCard.length-1]);
      } else {
        return this.lowPair()[0].isGreaterThan(otherPokerHand.lowPair()[0]);
      }
    } else {
      return this.highPair()[0].isGreaterThan(otherPokerHand.highPair()[0]);
    }
  }

  compareSetThenHighCard(n, otherPokerHand) {
    const setCard = this.set_card(n);
    const otherSetCard = otherPokerHand.set_card(n);
    if (setCard.isEqual(otherSetCard)) {
      highCard = this.cardsWithout( [setCard.value] );
      otherHighCard = otherPokerHand.cardsWithout( [otherSetCard.value] );
      return sort(highCard)[highCard.length-1].isGreaterThan(sort(highCard)[highCard.length-1]);
    } else {
      return setCard.isGreaterThan(otherSetCard);
    }
  }

}
