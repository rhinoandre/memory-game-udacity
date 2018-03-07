import Card from './Card';

function _handleMovement(card1, card2) {
  return new Promise((resolve, reject) => {
    if (card1.getType() === card2.getType()) {
      card1.markAsMatched();
      card2.markAsMatched();
      resolve();
    } else {
      card1.showWrongShotAnimation();
      card2.showWrongShotAnimation();
      setTimeout(() => {
        card1.hideFace();
        card2.hideFace();
        reject();
      }, 2000);
    }
  });
}

function _getCards(element){
  return [...element.querySelectorAll('.card')]
    .map(cardElement => new Card(cardElement));
}

function _normizeTime(time) {
  return time < 10 ? `0${time}` : time;
}

export default function Deck() {
  this.element = document.querySelector('.game-table');
  this.rateStars = document.querySelectorAll('.fa-star')
  this.cardsSelected = [];
  this.movements = 0;
  this.cards = _getCards(this.element);
  this.timer = new Date().getTime();
  this.shuffle();
};

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
      if (card.isAlreadyMatched() || this.cardsSelected.some(c => c === card) || this.cardsSelected.length > 1) {
        return;
      }

      this.cardsSelected.push(card);
      card.showCard();
      if (this.cardsSelected.length === 2) {
        this.onMoveChange();
        _handleMovement(...this.cardsSelected)
          .then(() => console.log('Cards match'))
          .catch(() => console.log('Cards do not match'))
          .finally(() => this.cardsSelected = []);
      }
    });
  });
}

Deck.prototype.onMoveChange = function (reset = false) {
  this.movements = reset ? 0 : ++this.movements;
  this.rating(this.movements);
  document.dispatchEvent(new CustomEvent('onmovement', {
    detail: {
      movements: this.movements
    },
    bubbles: true,
    cancelable: true
  }));
};

Deck.prototype.resetGame = function() {
  this.cardsSelected = [];
  this.timer = new Date().getTime();
  this.cards.forEach(card => card.reset());
  this.onMoveChange(true);
  this.shuffle();
};

Deck.prototype.restartGame = function() {
  this.resetGame();
  document.querySelector('.game-review').style.display = 'none';
};

Deck.prototype.gameFinishes = function() {
  document.querySelector('.game-review').style.display = 'block';
};

Deck.prototype.rating = function(moves) {
  // TODO: I think this logic is ugly. It should be improved
  if (moves === 0) {
    [...document.querySelectorAll('.full-star')].forEach(star => star.classList.remove('hide-star'));
    [...document.querySelectorAll('.empty-star')].forEach(star => star.classList.add('hide-star'))
  } else if (moves >= 16 && moves < 24 ) {
    document.querySelectorAll('.full-star')[2].classList.add('hide-star');
    document.querySelectorAll('.empty-star')[0].classList.remove('hide-star');
  } else if (moves >= 24 && moves < 32) {
    document.querySelectorAll('.full-star')[1].classList.add('hide-star');
    document.querySelectorAll('.empty-star')[1].classList.remove('hide-star');
  } else if (moves >= 32 ) {
    document.querySelectorAll('.full-star')[0].classList.add('hide-star');
    document.querySelectorAll('.empty-star')[2].classList.remove('hide-star');
  }
};

Deck.prototype.gameTime = function(listener) {
  this._timerInterval = setInterval(() => {
    const timePassed = new Date(new Date().getTime() - this.timer);
    listener(_normizeTime(timePassed.getMinutes()) + ':' + _normizeTime(timePassed.getSeconds()));
  }, 1000);
}