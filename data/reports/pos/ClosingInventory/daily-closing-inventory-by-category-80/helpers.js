function groupByCategoryCode(items, exchangeRate) {
  if (!Array.isArray(items)) return [];
  const rate = Number(exchangeRate || 4100);
  const grouped = items.reduce((acc, item) => {
    const categoryCode = item.categoryCode || "UNCATEGORIZED";
    if (!acc[categoryCode]) {
      acc[categoryCode] = {
        categoryCode: categoryCode,
        categoryDesc: item.categoryDesc || "Uncategorized",
        items: [],
        subTotalQty: 0,
        subTotalUSD: 0,
        subTotalKHR: 0,
      };
    }
    acc[categoryCode].items.push(item);
    acc[categoryCode].subTotalQty += Number(item.qty || 0);
    acc[categoryCode].subTotalUSD += Number(item.total || 0);
    acc[categoryCode].subTotalKHR += Number(item.total || 0) * rate;
    return acc;
  }, {});
  return Object.values(grouped);
}

function lineTotalKHR(total, exchangeRate) {
  return Number(total || 0) * Number(exchangeRate || 4100);
}

function totalQty(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function totalItemCostUSD(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + Number(item.total || 0), 0);
}

function totalItemCostKHR(items, exchangeRate) {
  if (!Array.isArray(items)) return 0;
  const rate = Number(exchangeRate || 4100);
  return items.reduce((sum, item) => sum + Number(item.total || 0) * rate, 0);
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
  
  return `${day}/${month}/${year}`;
}

function formatDateTime(value) {
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
