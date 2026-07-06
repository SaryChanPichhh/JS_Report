function groupByCategoryCode(Items, ExchangeRate) {
  if (!Array.isArray(Items)) return [];
  const rate = Number(ExchangeRate || 4100);
  const grouped = Items.reduce((acc, item) => {
    const categoryCode = item.CategoryCode || "UNCATEGORIZED";
    if (!acc[categoryCode]) {
      acc[categoryCode] = {
        CategoryCode: categoryCode,
        CategoryDesc: item.CategoryDesc || "Uncategorized",
        Items: [],
        SubTotalQty: 0,
        SubTotalUSD: 0,
        SubTotalKHR: 0,
      };
    }
    acc[categoryCode].Items.push(item);
    acc[categoryCode].SubTotalQty += Number(item.Qty || 0);
    acc[categoryCode].SubTotalUSD += Number(item.Total || 0);
    acc[categoryCode].SubTotalKHR += Number(item.Total || 0) * rate;
    return acc;
  }, {});
  return Object.values(grouped);
}

function lineTotalKHR(Total, ExchangeRate) {
  return Number(Total || 0) * Number(ExchangeRate || 4100);
}

function totalQty(Items) {
  if (!Array.isArray(Items)) return 0;
  return Items.reduce((sum, item) => sum + Number(item.Qty || 0), 0);
}

function totalItemCostUSD(Items) {
  if (!Array.isArray(Items)) return 0;
  return Items.reduce((sum, item) => sum + Number(item.Total || 0), 0);
}

function totalItemCostKHR(Items, ExchangeRate) {
  if (!Array.isArray(Items)) return 0;
  const rate = Number(ExchangeRate || 4100);
  return Items.reduce((sum, item) => sum + Number(item.Total || 0) * rate, 0);
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
