export function shuffle(array) {
  const cache = [].concat(array);
  let suffled = [];
  const arrayLength = cache.length;
  for (var i = 0; i < arrayLength; i++) {
    let randon = Math.floor(Math.random() * cache.length);
    suffled.push(...cache.splice(randon, 1));
  }

  return suffled;
}
