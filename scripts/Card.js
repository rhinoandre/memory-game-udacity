export default function Card(cardElement) {
  this.element = cardElement;
};

Card.prototype.getType = function() {
  return this.element.classList[1];
};

Card.prototype.showCard = function() {
  this.element.classList.remove('unselected');
};

Card.prototype.hideFace = function() {
  this.element.classList.add('unselected');
};

Card.prototype.markAsMatched = function() {
  this.element.classList.add('matched');
};

Card.prototype.reset = function() {
  this.element.classList.remove('matched');
  this.hideFace();
};

Card.prototype.isAlreadyMatched = function() {
  return /matched/.test(this.element.className);
};

Card.prototype.showWrongShotAnimation = function() {
  this.element.classList.add('wrong-shot');
  setTimeout(() => this.element.classList.remove('wrong-shot'), 1500);
};
