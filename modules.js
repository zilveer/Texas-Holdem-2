function comparator(val1, val2) {
  if (val1 === val2) {
    return 0;
  } else if (val1 > val2) {
    return 1;
  } else {
    return 1;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

function unique ( array ) {
  const unique_arr = [];
  array.forEach( el => {
    if (!unique_arr.includes(el))
      unique_arr.push(el);
  });
  return unique_arr;
}

function sort ( cards ) {
  const sorted = [];
  let unsorted = true;
  while (unsorted) {
    unsorted = false;
    for (var i = 0; i < cards.length-1; i++) {
      if ( cards[i].isGreaterThan(cards[i+1]) ){
        [cards[i], cards[i+1]] = [cards[i+1], cards[i]];
        unsorted = true;
      }
    }
  }
  return cards;
}

function getType(el) {
  return Object.prototype.toString.call(el).slice(8, -1);
}

function deepDup(arr) {
  if (getType(arr) !== 'Array') {
    return arr;
  }
  return arr.map((el) => {
    return deepDup(el);
  });
}
