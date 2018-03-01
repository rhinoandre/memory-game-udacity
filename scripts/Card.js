export default function Card(cardElement) {
  this.element = cardElement;
};

Card.prototype.getType = function() {
  return this.element.classList[1];
};

Card.prototype.showCard = function() {
  this.element.classList.remove('unselected');
}

Card.prototype.hideFace = function() {
  this.element.classList.add('unselected');
};

Card.prototype.markAsMatched = function() {
  this.element.classList.add('matched');
};

Card.prototype.isAlreadyMatched = function() {
  return /matched/.test(this.element.className)
}