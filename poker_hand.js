class PokerHand extends WinningHands {

  card_value_count(value) {
    let sum= 0;
    this.handPile().forEach ( card => {
      if ( card.value === value ) {
        sum += 1;
      }
    });
    return sum;
  }

  handTypes() {
    return [
      'RoyalFlush',
      'StraightFlush',
      'FourKind',
      'House',
      'Flush',
      'Straight',
      'ThreeKind',
      'TwoPair',
      'OnePair',
      'HighCard'
    ];
  }

  set_card(n) {
    return this.handPile().find ( card => ( this.card_value_count(card.value) == n ));
  }

  rank() {
    for (var i = 0; i < this.handTypes().length; i++) {
     const handType = this.handTypes()[i];
     if (this[`is${handType}`]()) {
       return handType;
     }
    }
  }

  isEqual(otherPokerHand) {
    return this.rank() === otherPokerHand.rank();
  }

  isGreaterThan(otherPokerHand) {
    return this.handTypes().indexOf(this.rank()) < this.handTypes().indexOf(otherPokerHand.rank());
  }

  highCard() {
    const sorted = sort(this.handPile());
    return sorted[sorted.length-1];
  }

  cardsWithout(valueArr) {
    const filtered = [];
    this.handPile().forEach( card => {
      if ( !valueArr.includes(card.value) ) {
        filtered.push(card);
      }
    });
    return filtered;
  }

  any(valueOrSuit) {
    for (var i = 0; i < this.handPile().length; i++) {
      if ( this.handPile()[i].value === valueOrSuit ||
        this.handPile()[i].suit === valueOrSuit ) {
        return true;
      }
    }
    return false;
  }

  isHighCard() {
    return true;
  }

  isRoyal() {
    const royals = this.handPile()[0].royals();
    const hand = this.handPile().map(
      card => ( card.value ));
    let count = 0;
    return royals.every( royalValue => (hand.includes(royalValue)) );
  }

  isOnePair() {
    return this.pairs().length === 1;
  }

  isTwoPair() {
    return this.pairs().length === 2;
  }

  isThreeKind() {
    for (var i = 0; i < this.handPile().length; i++) {
      if ( this.card_value_count(this.handPile()[i].value) === 3 ) {
        return true;
      }
    }
    return false;
  }

  isFlush() {

    const suits = {
      clubs: 0,
      spades: 0,
      hearts: 0,
      diamonds: 0
    };

    for (var i = 0; i < this.handPile().length; i++) {
      const suit = this.handPile()[i].suit;
      suits[suit] += 1;
      if ( suits[suit] > 4 ) {
        return true;
      }
    }
    return false;

  }

  isFourKind() {
    for (var i = 0; i < this.handPile().length; i++) {
      if ( this.card_value_count(this.handPile()[i].value) === 4 ) {
        return true;
      }
    }
    return false;
  }

  isHouse() {
    return this.isThreeKind() && this.isOnePair();
  }

  isStraightFlush() {
    if ( !this.isStraight() ) {
      return null;
    }
    const comparator = new Hand(this.isStraightHelper(), []);
    return comparator.isStraight() && comparator.isFlush();
  }

  isRoyalFlush() {
    if ( !this.isStraight() ) {
      return null;
    }
    const comparator = new Hand(this.isStraightHelper(), []);
    return comparator.isRoyal() && comparator.isStraightFlush();
  }

  isStraight() {
    return !!this.isStraightHelper();
  }

  isStraightHelper() {
    let straight;
    const values = this.hand[0].values();
    const hand = unique( sort(this.handPile()).reverse().map(
      card => ( card.value )));
    if ( this.any('ace') && this.any('two') ) {
      straight = values.slice(0, 4).concat(['ace']);
    } else {
        for (var i = 0; i < hand.length-4; i++) {
          const sample = hand.slice(i, i+5);
          const start = values.indexOf(sample[sample.length-1]);
          straight = values.slice(start, start+5);
          if ( straight.every( card => sample.indexOf(card) > -1  ) ) {
            return this.handPile().filter( card => (straight.includes(card.value)));
          }
        }
    }
    if (straight === undefined) {
      return null;
    }
    if ( straight.every( card => hand.indexOf(card) > -1  ) ) {
      return this.handPile().filter( card => (straight.includes(card.value)));
    } else {
      return null;
    }
  }

}
