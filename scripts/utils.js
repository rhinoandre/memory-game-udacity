import Card from './Card';

export function _handleMovement(card1, card2) {
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

export function _getCards(element){
  return [...element.querySelectorAll('.card')]
    .map(cardElement => new Card(cardElement));
}

export function _normizeTime(time) {
  return time < 10 ? `0${time}` : time;
}

export function _getCurrentTime(initialTime) {
  const timePassed = new Date(new Date().getTime() - initialTime);
  return _normizeTime(timePassed.getMinutes()) + ':' + _normizeTime(timePassed.getSeconds());
}