function groupBySellerAndDate(data) {
  var groupedData = data.reduce((accumulator, currentValue) => {
    const seller = currentValue.seller;
    if (!accumulator[seller]) {
      accumulator[seller] = [];
    }
    accumulator[seller].push(currentValue);
    return accumulator;
  }, {});

  return Object.values(groupedData);
}
