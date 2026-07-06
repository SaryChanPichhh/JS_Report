function groupByCategory(Items) {
  if (!Array.isArray(Items)) return [];
  const grouped = Items.reduce((acc, item) => {
    const Category = item.Category || "Uncategorized";
    if (!acc[Category]) {
      acc[Category] = {
        Category: Category,
        Items: [],
        subTotalStock: 0,
        subTotalCostUSD: 0,
        subTotalCostKHR: 0,
      };
    }
    acc[Category].Items.push(item);
    acc[Category].subTotalStock += Number(item.Stock || 0);
    const costUSD = Number(item.Stock || 0) * Number(item.CostPrice || 0);
    acc[Category].subTotalCostUSD += costUSD;
    acc[Category].subTotalCostKHR +=
      costUSD * Number(item.ExchangeRate || 4100);

    return acc;
  }, {});
  return Object.values(grouped);
}
function rowNumber(index) {
  return index + 1;
}
function totalStock(Items) {
  if (!Array.isArray(Items)) return 0;
  return Items.reduce((sum, item) => sum + Number(item.Stock || 0), 0);
}

function totalCostUSD(Items) {
  if (!Array.isArray(Items)) return 0;
  return Items.reduce(
    (sum, item) => sum + Number(item.Stock || 0) * Number(item.CostPrice || 0),
    0,
  );
}

function totalCostKHR(Items) {
  if (!Array.isArray(Items)) return 0;
  return Items.reduce((sum, item) => {
    const costUSD = Number(item.Stock || 0) * Number(item.CostPrice || 0);
    return sum + costUSD * Number(item.ExchangeRate || 4100);
  }, 0);
}

function lineTotalUSD(Stock, CostPrice) {
  return Number(Stock || 0) * Number(CostPrice || 0);
}

function lineTotalKHR(Stock, CostPrice, ExchangeRate) {
  return (
    Number(Stock || 0) * Number(CostPrice || 0) * Number(ExchangeRate || 4100)
  );
}

function totalItems(Items) {
  if (!Array.isArray(Items)) return 0;
  return Items.length;
}

function totalCategories(Items) {
  if (!Array.isArray(Items)) return 0;
  const categories = new Set(
    Items.map((item) => item.Category).filter(Boolean),
  );
  return categories.size;
}

function getExchangeRate(Items) {
  if (!Array.isArray(Items) || Items.length === 0) return 4100;
  return Number(Items[0].ExchangeRate || 4100);
}

function formatUSD(value) {
  const num = Number(value || 0);
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatKHR(value) {
  const num = Number(value || 0);
  return (
    num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) + " ៛"
  );
}

function formatNumber(value) {
  const num = Number(value || 0);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
