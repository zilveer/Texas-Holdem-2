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
      case 'onePair':
        return compareTwoPair(otherPokerHand);
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

  compareHouse(otherHand) {
    if ( this.set_card(3).isEqual(otherHand.set_card(3)) ) {
      if ( this.set_card(2).isEqual(otherHand.set_card(2)) ) {
        
      }
    }

  }

}

//  def compare_full_house(other_hand)
//    three = set_card(3) <=> other_hand.set_card(3)
//    if three == 0
//      two = set_card(2) <=> other_hand.set_card(2)
//      if two == 0
//        high_card = cards_without(set_card(3).value) &
//                    cards_without(set_card(2).value)
//        other_high_card = other_hand.cards_without(set_card(3).value) &
//                          other_hand.cards_without(set_card(2).value)
//        high_card <=> other_high_card
//      else
//        two
//      end
//    else
//      three
//    end
//  end
//
//  def compare_two_pair(other_hand)
//    high = high_pair[0] <=> other_hand.high_pair[0]
//    if high == 0
//      low = low_pair[0] <=> other_hand.low_pair[0]
//      if low == 0
//        high_card = cards.find do |card|
//          card_value_count(card.value) != 2
//        end
//        other_high_card = other_hand.cards.find do |card|
//          other_hand.card_value_count(card.value) != 2
//        end
//
//        high_card <=> other_high_card
//      else
//        low
//      end
//    else
//      high
//    end
//  end

//  def compare_set_then_high_card(n, other_hand)
//    set_card, other_set_card = set_card(n), other_hand.set_card(n)
//    if set_card == other_set_card
//      cards_without(set_card.value).last <=>
//      other_hand.cards_without(set_card.value).last
//    else
//      set_card <=> other_set_card
//    end
//  end
