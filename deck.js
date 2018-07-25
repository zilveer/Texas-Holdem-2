// import Card from './card.js';
// import { shuffle } from './utils';
// const shuffle = require('./modules.js');

class Deck {

  constructor() {
    this.deck = this.populateDeck();
  }

  populateDeck() {
    const sample = new Card();
    const deck = [];
    sample.values().forEach( value => {
      sample.suits().forEach( suit => {
        deck.push( new Card(suit, value) );
      });
    });
    return shuffle(shuffle(deck));
  }

  dealPile() {
    return new Pile (this.take(2));
  }

  dealHand() {
    return new Hand (this.take(3));
  }

  take(n) {
    if (n > this.count()) {
      return null;
    }
    const dealtCard = this.deck.splice(0,n);
    return dealtCard;
  }

  returnCards(cards) {
    this.deck.push(...cards);
  }

  count() {
    return this.deck.length;
  }


}
