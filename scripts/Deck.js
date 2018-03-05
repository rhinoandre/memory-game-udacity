import Card from './Card';

export default function Deck(element) {
  this.element = element;
  this.cards = _getCards.call(this);
  this.cardsSelected = [];
  this.movements = 0;
  this.shuffle();

  function _getCards(){
    return [...this.element.querySelectorAll('.card')]
      .map(cardElement => new Card(cardElement));
  }
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
      if (card.isAlreadyMatched() || this.cardsSelected.some(c => c === card) || this.cardsSelected.length > 1) {
        return;
      }

      this.cardsSelected.push(card);
      card.showCard();
      if (this.cardsSelected.length === 2) {
        this.onMoveChange();
        handleMovement(...this.cardsSelected)
          .then(() => console.log('Cards match'))
          // TODO: Remove a start
          .catch(() => console.log('Cards do not match'))
          .finally(() => this.cardsSelected = []);
      }
    });
  });

  function handleMovement(card1, card2) {
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
}

Deck.prototype.onMoveChange = function (reset = false) {
  this.movements = reset ? 0 : ++this.movements;
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
  this.onMoveChange(true);
  this.cards.forEach(card => card.reset());
  this.shuffle();
};
