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
