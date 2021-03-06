import { _getCards, _getCurrentTime, _handleMovement, _normizeTime } from './utils';

export default function Deck() {
  this.element = document.querySelector('.game-table');
  this.cardsSelected = [];
  this.movements = 0;
  this.successMatches = 0;
  this.cards = _getCards(this.element);
  this.timer = new Date().getTime();
  this.shuffle();

  this._movesListeners = [];
};

Deck.prototype.onMovesChange = function (movesChangeHandler) {
  this._movesListeners.push(movesChangeHandler);
}

Deck.prototype.shuffle = function () {
  const cache = [].concat(this.cards);
  const arrayLength = cache.length;
  for (var i = 0; i < arrayLength; i++) {
    let randon = Math.floor(Math.random() * cache.length);
    this.element.appendChild(cache.splice(randon, 1)[0].element);
  }
};

Deck.prototype.startGame = function() {
  this.cards.forEach(card => {
    card.element.addEventListener('click', event => {
      if (canSelectAnotherCard(card, this.cardsSelected)) {
        return;
      }

      this.cardsSelected.push(card);
      card.showCard();

      // Only if has two cads selected continue the logic
      if (this.cardsSelected.length === 2) {
        this.handleMovements();
        _handleMovement(...this.cardsSelected)
          .then(() => { // Cards matches
            this.successMatches++;
            if (this.successMatches === 8) { // Success matches is equal to the number of half of the cards
               this.userWins(); // Shows win popup
            }
          })
          .catch(() => console.log('Cards do not match')) // Any logic that will be triggered when cards do not match
          .finally(() => this.cardsSelected = []);
      }
    });
  });

  function canSelectAnotherCard(newCard, cardsSelected) {
    return newCard.isAlreadyMatched() || cardsSelected.some(c => c === newCard) || cardsSelected.length > 1
  }
}

Deck.prototype.handleMovements = function (reset = false) {
  this.movements = reset ? 0 : ++this.movements;
  this._movesListeners.forEach(movesHandle => movesHandle(this.movements));
};

Deck.prototype.resetGame = function() {
  this.cardsSelected = [];
  this.timer = new Date().getTime();
  this.successMatches = 0;
  this.cards.forEach(card => card.reset());
  this.handleMovements(true);
  this.shuffle();
};

Deck.prototype.restartGame = function() {
  this.resetGame();
  document.querySelector('.game-review').style.display = 'none';
};

Deck.prototype.userWins = function() {
  const spentTime = _getCurrentTime(this.timer);
  const gameReview = document.querySelector('.game-review');

  gameReview.style.display = 'block';
  gameReview.querySelector('.spentTime').innerHTML = spentTime;
  gameReview.querySelector('.movementsTaken').innerHTML = this.movements;
  gameReview.querySelector('.starsLeft').innerHTML = document.querySelectorAll('.full-star:not(.hide-star)').length;
};

Deck.prototype.onTimeChanges = function(listener) {
  setInterval(() => listener(_getCurrentTime(this.timer)), 1000);
}