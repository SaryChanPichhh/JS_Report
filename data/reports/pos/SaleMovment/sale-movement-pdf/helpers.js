function rowNumber(index) {
  return index + 1;
}

function sumTotal(items, field) {
  var sum = 0;
  items.forEach(function (item) {
    if (item && item[field]) {
      sum += Number(item[field]);
    }
  });
  return sum;
}
