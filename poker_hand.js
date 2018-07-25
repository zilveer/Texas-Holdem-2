class PokerHand extends WinningHands {

  constructor(hand,pile) {
    super(hand,pile);
    this.hand = hand;
    this.pile = pile;
  }

  card_value_count(value) {
    const handPile = this.hand.concat(this.pile);
    let sum= 0;
    handPile.forEach ( card => {
      if ( card.value === value ) {
        sum += 1;
      }
    });
    return sum;
  }

  handTypes() {
    return [
      'highCard',
      'onePair',
      'twoPair',
      'threeKind',
      'straight',
      'flush',
      'house',
      'fourKind',
      'straightFlush',
      'royalFlush'
    ];
  }

  rank() {

  }

  isGreaterThan(otherPokerHand) {
    return handTypes().indexOf(this.rank()) > handTypes().indexOf(otherPokerHand.rank());
  }

  highCard() {
    const sorted = sort(this.hand.concat(this.pile));
    return sorted[sorted.length-1];
  }

  cardsWithout(value) {
    const cards = this.hand.concat(this.pile);
    return cards.filter( card => ( card.value != value ));
  }

  any(valueOrSuit) {
    const cards = this.hand.concat(this.pile);
    for (var i = 0; i < cards.length; i++) {
      if ( cards[i].value === valueOrSuit || cards[i].suit === valueOrSuit ) {
        return true;
      }
    }
    return false;
  }

  isRoyal() {
    const royals = this.hand[0].royals();
    const handPile = this.hand.concat(this.pile).map(
      card => ( card.value ));
    let count = 0;
    return royals.every( royalValue => (handPile.includes(royalValue)) );
  }

  isPair() {
    return this.pairs.count === 1;
  }

  isTwoPair() {
    return this.pairs.count === 2;
  }

  isThreeKind() {
    const handPile = this.hand.concat(this.pile);
    for (var i = 0; i < handPile.length; i++) {
      if ( this.card_value_count(handPile[i]) === 3 ) {
        return true;
      }
    }
    return false;
  }

  isFourKind() {
    const handPile = this.hand.concat(this.pile);
    for (var i = 0; i < handPile.length; i++) {
      if ( this.card_value_count(handPile[i]) === 4 ) {
        return true;
      }
    }
    return false;
  }

  isStraight() {

    let straight;
    const values = this.hand[0].values();
    const handPile = unique( sort(this.hand.concat(this.pile)).map(
      card => ( card.value )));

    if ( this.any('ace') && this.any('two') ) {
      straight = values.slice(0, 4).concat(['ace']);
      // if ( straight.every( card => handPile.indexOf(card) > -1  ) ) {
      //   return true;
      // }
    } else {
        for (var i = 0; i < handPile.length-5; i++) {
          const sample = handPile.slice(i,5);
          straight = values.slice(i, 5);
          debugger
          if ( straight.every( card => sample.indexOf(card) > -1  ) ) {
            return true;
          }
        }
    }

    return straight.every( card => handPile.indexOf(card) > -1  )

  }






}
