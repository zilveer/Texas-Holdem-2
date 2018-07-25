const comparator = (val1, val2) => {
  if (val1 === val2) {
    return 0;
  } else if (val1 > val2) {
    return 1;
  } else {
    return 1;
  }
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   return arr;
};
