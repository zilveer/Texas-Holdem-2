class Card {

  constructor(suit, value, image) {
    this.suit = suit;
    this.value = value;
    this.image = image;
  }

  SUITS_STRINGS() {
    return {
      clubs    : "♣",
      diamonds : "♦",
      hearts   : "♥",
      spades   : "♠"
    };
  }

  VALUES_STRINGS() {
    return {
      two   : "2",
      three : "3",
      four  : "4",
      five  : "5",
      six   : "6",
      seven : "7",
      eight : "8",
      nine  : "9",
      ten   : "10",
      jack  : "J",
      queen : "Q",
      king  : "K",
      ace   : "A"
    };
  }

  values() {
    return Object.keys(this.VALUES_STRINGS());
  }

  suits() {
    return Object.keys(this.SUITS_STRINGS());
  }

  royals() {
    return Object.keys(this.VALUES_STRINGS()).slice(8);
  }

  isEqual(otherCard) {
    return (this.suit === otherCard.suit) &&
      (this.value === otherCard.value);
  }

  isGreaterThan(otherCard) {
    if (this.value !== otherCard.value) {
      return ( this.values().indexOf(this.value) > this.values().indexOf(otherCard.value) );
    } else if (this.suit !== otherCard.suit) {
      return ( this.suits().indexOf(this.suit) > this.suits().indexOf(otherCard.suit) );
    }
  }

  to_s() {
    return `${this.value} of ${this.suit}`;
  }

}

// export default Card;
