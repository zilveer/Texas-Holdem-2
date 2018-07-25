class PokerHand extends WinningHands {

  constructor(hand,pile) {
    super(hand,pile);
    this.hand = hand;
    this.pile = pile;
  }

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
    return this.handPile()[sorted.length-1];
  }

  cardsWithout(value) {
    return this.handPile().filter( card => ( card.value != value ));
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

  isRoyal() {
    const royals = this.hand[0].royals();
    const hand = this.handPile().map(
      card => ( card.value ));
    let count = 0;
    return royals.every( royalValue => (hand.includes(royalValue)) );
  }

  isPair() {
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
      const suit = suits[this.handPile()[i].suit];
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

  isStraight() {

    let straight;
    const values = this.hand[0].values();
    const hand = unique( sort(this.handPile()).map(
      card => ( card.value )));

    if ( this.any('ace') && this.any('two') ) {
      straight = values.slice(0, 4).concat(['ace']);
    } else {
        for (var i = 0; i < hand.length-4; i++) {
          const sample = hand.slice(i, i+5);
          const start = values.indexOf(sample[0]);
          straight = values.slice(start, start+5);
          if ( straight.every( card => sample.indexOf(card) > -1  ) ) {
            return true;
          }
        }
    }
    return straight.every( card => hand.indexOf(card) > -1  );
  }






}
