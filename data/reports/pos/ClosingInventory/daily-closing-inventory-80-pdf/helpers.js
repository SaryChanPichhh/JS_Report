function groupByCategoryCode(items) {
  if (!Array.isArray(items)) return [];

  const groupedByCategoryCode = items.reduce((acc, item) => {
    const categoryCode = item.CategoryCode; // or item.categoryCode if your field is lowercase

    if (!acc[categoryCode]) {
      acc[categoryCode] = {
        categoryCode: categoryCode,
        categoryDesc: item.CategoryDesc, // or item.categoryDesc if your field is lowercase
        items: [],
      };
    }

    acc[categoryCode].items.push(item);
    acc[categoryCode].subTotal = acc[categoryCode].items.reduce(
      (sum, currentItem) => sum + Number(currentItem.FinalPrice || 0),
      0,
    );

    return acc;
  }, {});
  console.log(`group by category code :`, groupedByCategoryCode);

  return Object.values(groupedByCategoryCode);
}
