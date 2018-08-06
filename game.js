// import Deck from './deck';
class Game {

  constructor(players){
    this.players = players;
    this.pot = 0;
    this.deck = new Deck();
    this.queue = [];
    this.calls = 0;
    this.high_bet = 0;
    this.most_recent_better = null;
    // this.backCard = this.loadImages();
    this.setup();
    // this.test();
  }

  resetPlayers() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      player.unfold();
    }
  }

  winner() {
    if ( this.queue.length === 1 ) {
      return this.queue[0];
    }
    let strongestPlayer = null;
    for (var i = 0; i < this.queue.length-1; i++) {
      for (var j = 1; j < this.queue.length; j++) {
        const player = this.queue[i];
        const otherPlayer = this.queue[j];
        let strongPlayer = null;
        strongPlayer = this.comparator(player, otherPlayer);
        if ( strongestPlayer === null ) { strongestPlayer = strongPlayer; }
        strongestPlayer = this.comparator(strongPlayer, strongestPlayer);
      }
    }
    return strongestPlayer;
  }

  setup() {
    resetHandPile();
    this.high_bet = 0;
    this.most_recent_better = null;
    this.raises = true;
    this.deck = shuffle(this.deck);
    this.pile = this.deck.dealPile();
    this.resetPlayers();
    this.queue = deepDup(this.players);
    this.queue = this.queue.filter( player => (player.bankroll > 0));

    this.initialPileDeal();
    this.takeBets(this.queue[0]);
  }

  initialPileDeal() {
    for (let i = 0; i < this.queue.length; i++) {
      const player = this.queue[i];
      player.dealIn(this.deck.dealHand());
      player.hand.pile = this.pile.pile;
      this.hidePlayerCards(player);
      player.resetCurrentBet();
    }
  }

  playRound() {
    const pileLength = this.pile.pile.length;
    if ( ( pileLength === 5 && this.calls === this.queue.length) || this.roundOver() || ( this.most_recent_better === this.queue[0] && pileLength === 5 ) || this.queue.length === 1 ) {
      return this.endRound();
    }

    this.dealNextCard();
    this.pile.render();
    this.takeBets(this.queue[0]);
  }

  dealNextCard() {
    if ( this.pile.pile.length < 5) {
      this.pile.pile.push(this.deck.take(1)[0]);
    }
    this.calls = 0;
    this.high_bet = 0;
    this.most_recent_better = null;
    this.raises = true;

    for (let i = 0; i < this.queue.length; i++) {
      const player = this.queue[i];
      if (player.bankroll <= 0 ) { continue; }
      player.hand.pile = this.pile.pile;
      player.resetCurrentBet();
      this.resetButtons(player);
      this.hidePlayerCards(player);
    }
  }

  takeBets(player) {


    const pileLength = this.pile.pile.length;
    if ( ( pileLength === 5 && this.calls === this.queue.length) || this.roundOver() || ( this.most_recent_better === this.queue[0] && pileLength === 5 || this.gameOver() ) ) {
      const pile =  this.pile.pile;
      while ( pile.length < 5 ) {
        pile.push(this.deck.take(1)[0]);
      }
      this.pile.render();
      for (let i = 0; i < this.queue.length; i++) {
        const player = this.queue[i];
        player.hand.pile = pile;
        player.resetCurrentBet();
        this.resetButtons(player);
        this.hidePlayerCards(player);
      }
      return this.endRound();

    } else if ( player.bankroll <= 0 ) {

      this.queue.shift()
      this.queue.push(player)
      return this.takeBets(this.queue[0]);
    } else {

      this.displayStatus(player);
      this.displayPlayerCards(player);
      this.setButtons(player);
    }



    // this.displayStatus(player);
    // this.displayPlayerCards(player);
    // this.setButtons(player);

  }

  // everyoneBroke(aPlayer) {
  //   if ( this.gameOver() ) {
  //     const pile =  this.pile.pile;
  //     while ( pile.length < 5 ) {
  //       pile.push(this.deck.take(1)[0]);
  //     }
  //     this.pile.render();
  //     for (let i = 0; i < this.queue.length; i++) {
  //       const player = this.queue[i];
  //       player.hand.pile = pile;
  //       player.resetCurrentBet();
  //       this.resetButtons(player);
  //       this.hidePlayerCards(player);
  //     }
  //     return this.endRound();
  //
  //   } else if ( aPlayer.bankroll <= 0 ) {
  //     this.queue.shift()
  //     this.queue.push(aPlayer)
  //     return this.takeBets(this.queue[0]);
  //   }
  // }

  sendFold(player) {
    player.fold();
    this.resetButtons(player);
    this.queue.shift();

    if ( this.roundOver() || this.most_recent_better === this.queue[0] || this.queue.length === 1 || this.calls === this.queue.length) {
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
    }

  }

  sendCall(player) {

    if ( player.bankroll < this.high_bet ) {
        this.takeBets(this.queue[0]);
        return;
    }

    this.resetButtons(player);
    this.hidePlayerCards(player);
    this.addToPot(player.takeBet(this.high_bet));
    this.calls += 1;

    this.queue.shift();
    this.queue.push(player);

    if ( this.roundOver() || this.most_recent_better === this.queue[0] || this.queue.length === 1 || this.calls >= this.queue.length ) {
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
    }

  }

  sendBet(e, player) {

    e.preventDefault();

    const bet = e.currentTarget.children[0].value;
//
    if ( player.bankroll < parseInt(bet) || bet === '' ||parseInt(bet) <= parseInt(this.high_bet) ) {
        this.takeBets(this.queue[0]);
        return;
    }

    this.most_recent_better = player;
    this.queue.shift();
    this.queue.push(player);
    this.hidePlayerCards(player);
    this.resetButtons(player);
    this.calls = 0;
    const takeBet = player.takeBet(bet);
    this.high_bet = bet;
    this.addToPot(takeBet);

    if ( this.roundOver() || this.queue.length === 1 ) {
      return this.playRound();
    } else {
      this.takeBets(this.queue[0]);
    }
  }

  endRound() {
    const dealerMessage = document.getElementById('dealer-message-box');
    var li = document.createElement('li');
    li.id = 'winner-message';

    const winningHand = this.winner().hand;
    this.showHands();

    li.innerHTML = `WINNER - ${this.winner().name} wins $${this.pot} with a ${winningHand.rank()}`;

    dealerMessage.appendChild(li);
    this.winner().receiveWinnings(this.pot);
    this.winner().renderMoney();
    this.pot = 0;
    this.returnCards();

    if (this.gameOver()) {

      return this.endGame();
    } else {
      return setTimeout(this.setup.bind(this), 5000);
    }
  }

  roundOver() {
    let count = 0;
    this.players.forEach( player => {
      if (!player.isFolded()) { count += 1; }
    });
    return count <= 1;
  }

  gameOver() {
    let count = 0;
    this.players.forEach( player => {
      if (player.bankroll > 0) { count += 1; }
    });
    return count <= 1;
  }

  returnCards() {
    for (var i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      this.deck.returnCards(player.returnCards().hand);
    }
  }

  addToPot(amount) {
    this.pot += amount;
  }

  comparator(player, otherPlayer) {
    let strongPlayer;
    if (player.isEqual(otherPlayer)) {
      if (player.hand.tieBreaker(otherPlayer.hand)) {
        strongPlayer = player;
      } else {
        strongPlayer = otherPlayer;
      }
    } else {
      if (player.isGreaterThan(otherPlayer)) {
        strongPlayer = player;
      } else {
        strongPlayer = otherPlayer;
      }
    }
    return strongPlayer;
  }

  hidePlayerCards(player) {
    const hand = document.getElementById(`${player.name}-hand`).remove();
    for (var i = 0; i < player.hand.hand.length; i++) {
      const card = player.hand.hand[i];
      const img = document.createElement('img');
      img.src = './images/PNG/hoyleback.png';
      img.id = 'back-card';
      card.image = img;
    }
    player.render(player.hand);
  }

  displayPlayerCards(player) {
    const hand = document.getElementById(`${player.name}-hand`).remove();
    for (var i = 0; i < player.hand.hand.length; i++) {
      const card = player.hand.hand[i];
      const img = document.createElement('img');
      img.src = `./images/PNG/${card.value}-${card.suit}.png`;
      card.image = img;
    }
    return player.render(player.hand);
  }

  showHands() {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = 'Show hands!';
    for (var i = 0; i < this.queue.length; i++) {
      const player = this.queue[i];
      this.displayPlayerCards(player);
      if (player.isFolded()) { continue; }
      var li = document.createElement('li');
      let string = "";
      li.innerHTML = `${player.name}: ${player.hand.rank()}`;
      dealerMessage.appendChild(li);
    }
  }

  displayStatus(player) {
    const dealerMessage = document.getElementById('dealer-message-box');
    dealerMessage.innerHTML = '';

    var ul = document.createElement('ul');
    ul.id = 'display-status';

    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');

    li1.innerHTML = `Pot: $${formatMoney(this.pot)}`;
    li2.innerHTML = `High Bet: $${formatMoney(this.high_bet)}`;
    li3.innerHTML = `Current Player: ${player.name}`;
    li4.innerHTML = `Current Bet: $${formatMoney(player.currentBet)}`;

    dealerMessage.appendChild(ul);
    const message = document.getElementById('display-status');
    message.appendChild(li1);
    message.appendChild(li2);
    message.appendChild(li3);
    message.appendChild(li4);

    this.queue.forEach ( player => {
      player.renderMoney();
    });
  }

  setButtons(player) {

    var foldButton = document.getElementById(`${player.name}fold`);
    var callButton = document.getElementById(`${player.name}call`);
    var betButton = document.getElementById(`${player.name}bet`);

    foldButton.addEventListener('click', this.sendFold.bind(this, player));
    callButton.addEventListener('click', this.sendCall.bind(this, player));
    betButton.addEventListener('submit', e => (
      this.sendBet(e, player)
    ));

    foldButton.style.display = 'block';
    callButton.style.display = 'block';
    betButton.style.display = 'block';

  }

  resetButtons(player) {

    var foldButton = document.getElementById(`${player.name}fold`);
    var callButton = document.getElementById(`${player.name}call`);
    var betButton = document.getElementById(`${player.name}bet`);

    foldButton.style.display = 'none';
    callButton.style.display = 'none';
    betButton.style.display = 'none';

    foldButton.outerHTML = foldButton.outerHTML;
    callButton.outerHTML = callButton.outerHTML;
    betButton.outerHTML = betButton.outerHTML;

  }

  endGame() {
    const dealerMessage = document.getElementById('dealer-message-box');
    var li2 = document.createElement('li');
    li2.id = 'end-game-message';
    li2.innerHTML = 'FINISHED!!!';
    dealerMessage.appendChild(li2);
    //
  }

  // loadImages() {
  //   let image = new Image();
  //   image.src = './images/png/hoyleback.png';
  //   return image;
  // }


}

  // test() {
  //   this.deck = shuffle(this.deck);
  //   this.pile = this.deck.dealPile();
  //   this.pile.pile.push(this.deck.take(1)[0]);
  //   this.pile.pile.push(this.deck.take(1)[0]);
  //   this.pile.render();
  //   this.queue = deepDup(this.players);
  //   this.initialPileDeal();
  //   this.endRound2();
  // }
  //
  // endRound2() {
  //   const dealerMessage = document.getElementById('dealer-message-box');
  //   var li = document.createElement('li');
  //   li.id = 'winner-message';
  //
  //   const winningHand = this.winner().hand;
  //   this.showHands();
  //
  //   li.innerHTML = `WINNER - ${this.winner().name} wins $${this.pot} with a ${winningHand.rank()}`;
  //
  //   dealerMessage.appendChild(li);
  //   this.winner().receiveWinnings(this.pot);
  //   this.pot = 0;
  //   this.returnCards();
  // }
