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
  this.cards.forEach(card => {
    card.element.addEventListener('click', event => {
      if (card.isAlreadyMatched() || cardsSelected.some(c => c === card)) {
        return;
      }

      // TODO: Add a moviment
      cardsSelected.push(card);
      card.showCard();

      if (cardsSelected.length === 2) {
        handleMovement(...cardsSelected);
        cardsSelected = [];
      }
    });
  });

  function handleMovement(card1, card2) {
    if (card1.getType() === card2.getType()) {
      console.log('Cards match');
      // TODO: Show 'match' animation
      card1.markAsMatched()
      card2.markAsMatched()
      // TODO: Remove this event listener
    } else {
      console.log('Cards do not match');
      // TODO: Remove a point
      // TODO: Show 'not match' animation
      card1.hideFace();
      card2.hideFace();
    }
  }
}

Deck.prototype.resetGame = function() {
  // this.cards
};
