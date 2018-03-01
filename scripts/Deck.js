import Card from './Card';

export default function Deck(element) {
  this.element = element;
  this.cards = getCards.call(this);
  this.shuffle();

  function getCards(){
    return [...this.element.querySelectorAll('.card')]
      .map(cardElement => new Card(cardElement));
  }
}

Deck.prototype.shuffle = function () {
  const cache = [].concat(this.cards);
  const suffled = [];
  const arrayLength = cache.length;
  for (var i = 0; i < arrayLength; i++) {
    let randon = Math.floor(Math.random() * cache.length);
    // suffled.push(...cache.splice(randon, 1));
    this.element.appendChild(cache.splice(randon, 1)[0].element);
  }
};

Deck.prototype.startGame = function() {
  let cardsSelected = [];
  let movements = 0;
  this.cards.forEach(card => {
    card.element.addEventListener('click', event => {
      if (card.isAlreadyMatched() || cardsSelected.some(c => c === card) || cardsSelected.length > 1) {
        return;
      }

      // TODO: Add a moviment
      cardsSelected.push(card);
      card.showCard();
      if (cardsSelected.length === 2) {
        sendMovementsEvent.call(this, ++movements);
        handleMovement(...cardsSelected)
          // TODO: Show 'match' animation
          .then(() => console.log('Cards match'))
          // TODO: Remove a point
          // TODO: Show 'not match' animation
          .catch(() => console.log('Cards do not match'))
          .finally(() => cardsSelected = []);
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
        setTimeout(() => {
          card1.hideFace();
          card2.hideFace();
          reject();
        }, 2000);
      }
    });
  }

  function sendMovementsEvent(moves) {
    document.dispatchEvent(new CustomEvent("onmovement", {
      detail: {
        movements: moves
      },
      bubbles: true,
      cancelable: true
    }));
  }
}

Deck.prototype.resetGame = function() {
  // this.cards
};
