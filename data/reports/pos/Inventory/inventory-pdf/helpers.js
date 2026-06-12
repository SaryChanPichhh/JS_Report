function groupByCategory(items) {
  if (!Array.isArray(items)) return [];
  const grouped = items.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = {
        category: category,
        items: [],
        subTotalStock: 0,
        subTotalCostUSD: 0,
        subTotalCostKHR: 0,
      };
    }
    acc[category].items.push(item);
    acc[category].subTotalStock += Number(item.stock || 0);
    const costUSD = Number(item.stock || 0) * Number(item.costPrice || 0);
    acc[category].subTotalCostUSD += costUSD;
    acc[category].subTotalCostKHR +=
      costUSD * Number(item.exchangeRate || 4100);
    return acc;
  }, {});
  return Object.values(grouped);
}
function rowNumber(index) {
  return index + 1;
}
function totalStock(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + Number(item.stock || 0), 0);
}

function totalCostUSD(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (sum, item) => sum + Number(item.stock || 0) * Number(item.costPrice || 0),
    0,
  );
}

function totalCostKHR(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const costUSD = Number(item.stock || 0) * Number(item.costPrice || 0);
    return sum + costUSD * Number(item.exchangeRate || 4100);
  }, 0);
}

function lineTotalUSD(stock, costPrice) {
  return Number(stock || 0) * Number(costPrice || 0);
}

function lineTotalKHR(stock, costPrice, exchangeRate) {
  return (
    Number(stock || 0) * Number(costPrice || 0) * Number(exchangeRate || 4100)
  );
}

function totalItems(items) {
  if (!Array.isArray(items)) return 0;
  return items.length;
}

function totalCategories(items) {
  if (!Array.isArray(items)) return 0;
  const categories = new Set(
    items.map((item) => item.category).filter(Boolean),
  );
  return categories.size;
}

function getExchangeRate(items) {
  if (!Array.isArray(items) || items.length === 0) return 4100;
  return Number(items[0].exchangeRate || 4100);
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
