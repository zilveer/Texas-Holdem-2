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
    var hand = document.getElementById(`${this.name}-hand`);
    hand.innerHTML = '';
    var div = document.createElement('div');
    div.innerHTML = 'FOLDED';
    div.id = 'folded';
    hand.appendChild(div);
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

  render(hand) {
    const hands = document.getElementById('hands');
    var ul = document.createElement('ul');
    ul.id = this.name;
    hands.appendChild(ul);

    this.renderMoneyBox();
    this.renderButtons();

    var innerHand = document.getElementById(`${this.name}`);
    var handUl = document.createElement('ul');
    handUl.id = `${this.name}-hand`;
    innerHand.appendChild(handUl);
    hand.hand.forEach ( card => {
      handUl.appendChild(card.image);
    });
  }

  renderMoney() {
    var moneybox = document.getElementById(`${this.name}-moneybox`);
    moneybox.innerHTML = '';
    var money = document.createElement('p');
    money.id = `${this.name}-money`;
    money.innerHTML = `Bankroll: $${formatMoney(this.bankroll)}`;
    moneybox.appendChild(money);
  }

  renderMoneyBox() {
    var innerHand = document.getElementById(`${this.name}`);
    var moneyDiv = document.createElement('div');
    moneyDiv.id = `${this.name}-moneybox`;
    innerHand.appendChild(moneyDiv);
  }

  renderButtons() {
    var innerHand = document.getElementById(`${this.name}`);

    var actionDiv = document.createElement('div');
    actionDiv.id = `${this.name}-action`;

    innerHand.appendChild(actionDiv);

    var foldButton = document.createElement('div');
    var callButton = document.createElement('div');

    var betButton = document.createElement('form');
    var betInput = document.createElement('INPUT');
    betInput.setAttribute("type", "number");
    var betSubmit = document.createElement('INPUT');
    betSubmit.setAttribute("type", "submit");
    betSubmit.value = 'Bet';
    betButton.appendChild(betInput);
    betButton.appendChild(betSubmit);

    foldButton.innerHTML = 'Fold';
    callButton.innerHTML = 'Call';

    foldButton.id = `${this.name}fold`;
    callButton.id = `${this.name}call`;
    betButton.id = `${this.name}bet`;

    foldButton.style.display = 'none';
    callButton.style.display = 'none';
    betButton.style.display = 'none';

    var handAction = document.getElementById(`${this.name}-action`);

    handAction.appendChild(foldButton);
    handAction.appendChild(callButton);
    handAction.appendChild(betButton);
  }

}
