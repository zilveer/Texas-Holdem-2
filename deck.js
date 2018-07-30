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
    img.src = './images/png/hoyleback.png';
    img.id = 'back-card';
    var deck = document.getElementById('deck');
    deck.innerHTML = '';
    deck.appendChild(img);
  }

  populateDeck() {
    const sample = new Card();
    const deck = [];
    sample.values().forEach( value => {
      sample.suits().forEach( suit => {
        var img = document.createElement('img');
        img.src = `./images/PNG/${value}-${suit}.png`;
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
    const dealtCard = this.deck.splice(0,n);
    return dealtCard;
  }

  returnCards(cards) {
    // debugger
    this.deck = this.deck.concat(cards);
  }

  count() {
    return this.deck.length;
  }


}
