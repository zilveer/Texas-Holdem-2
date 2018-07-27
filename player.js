class Player {

  constructor(name, bankroll) {
    this.name = name;
    this.bankroll = bankroll;
    this.currentBet = 0;
  }


  dealIn(hand) {
    this.hand = hand;
    this.render(this.hand);
  }

  render(hand) {
    const hands = document.getElementById('hands');
    var ul = document.createElement('ul');
    ul.id = this.name;
    hands.appendChild(ul);
    hand.hand.forEach ( card => {
      var hand = document.getElementById(`${this.name}`);
      hand.appendChild(card.image);
    });
  }

  renderMoney() {
    var hand = document.getElementById(`${this.name}`);
    var money = document.createElement('p');
    money.id = this.name;
    money.innerHTML = `Bankroll: ${this.bankroll} Current Bet: ${this.currentBet}`;
    hand.appendChild(money);
  }

  isEqual(otherPlayer) {
    return this.hand.isEqual(otherPlayer.hand);
  }

  isGreaterThan(otherPlayer) {
    return this.hand.isGreaterThan(otherPlayer.hand);
  }

  receiveWinnings(amount) {
    this.bankroll += amount;
  }

  resetCurrentBet() {
    this.currentBet = 0;
  }

  fold() {
    this.folded = true;
  }

  unfold() {
    this.folded = false;
  }

  isFolded() {
    return this.folded;
  }

  returnCards() {
    const cards = this.hand;
    this.hand = [];
    return cards;
  }

  takeBet(totalBet) {
    const amount = totalBet - this.currentBet;
    if ( amount > this.bankroll ) { return null; }
    this.currentBet = totalBet;
    this.bankroll -= amount;
    return amount;
  }

  respondBet() {

  }

  //   respond_bet {
  //     console.log( "(c)all, (b)et, or (f)old? > ")
  //     response = gets.chomp.downcase[0]
  //     case response
  //     when 'c' then :call
  //     when 'b' then :bet
  //     when 'f' then :fold
  //     else
  //       puts 'must be (c)all, (b)et, or (f)old'
  //       respond_bet
  //     end
  //   end



}

//   get_bet {
//     console.log( "Bet (bankroll: $#{bankroll}) > ")
//     bet = gets.chomp.to_i
//     raise 'not enough money' unless bet <= bankroll
//     bet
//   end
