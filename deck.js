// import Card from './card.js';
// import { shuffle } from './utils';
// const shuffle = require('./modules.js');

class Deck {

  constructor() {
    this.deck = this.populateDeck();
    this.render();
  }

  render() {
    var img = document.createElement('img');
    img.src = './images/cards/b.gif';
    var deck = document.getElementById('deck');
    deck.appendChild(img);
  }

  populateDeck() {
    const sample = new Card();
    const deck = [];
    sample.values().forEach( value => {
      sample.suits().forEach( suit => {
        var img = document.createElement('img');
        img.src = `./images/cards/${value}_${suit}.gif`;
        deck.push( new Card(suit, value, img) );
      });
    });
    return shuffle(shuffle(deck));
  }

  dealPile() {
    return new Pile (this.take(3));
  }

  dealHand() {
    return new Hand (this.take(2));
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
