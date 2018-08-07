# Texas-Holdem

[Play](https://dsm1193.github.io/Texas-Holdem/) 

A variation of Poker that implements basic OOP concepts in Javascript while implementing aspects of modular programming (e.g., shuffleCards, sortCards, comparator) for usability throughout the application. Two cards are are dealt face down to each player, and then five community cards are dealt face up in three stages. The game currently supports 2, 3, & 4 player options. Players are initialized with a 100k bankroll. 

![Alt Text](https://i.imgur.com/RZIVlj8.gif)

## Features
* 2, 3, 4 player options
* Ability for players to fold, call, or bet
* Analyzes hand and community cards to determine hand (or rank) and decide table winner

## Code Samples
* Determining hands through use of reflective meta-programming
```javascript
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

  rank() {
    for (var i = 0; i < this.handTypes().length; i++) {
     const handType = this.handTypes()[i];
     if (this[`is${handType}`]()) {
       return handType;
     }
    }
  }
```

* Handling Ties
```javascript
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
  }
```

## Future Developments
* Implement blinds
* Ability to leave and enter games
* Rendering of community pot
* AI
