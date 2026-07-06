function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) return value;
  if (date.getFullYear() <= 1) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function formatMoney(value) {
  const num = Number(value || 0);

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function groupByTransRef(items) {
  if (!Array.isArray(items)) return [];

  const groups = {};

  items.forEach((item) => {
    const transRef = item.TransRef || "NO-TRANS-REF";
    if (!groups[transRef]) {
      groups[transRef] = {
        TransRef: transRef,
        SupplierCode: item.SupplierCode || "",
        SupplierName: item.SupplierName || "",
        SupplierNameKH: item.SupplierNameKH || "",
        Warehouse: item.Warehouse || "",
        Items: [],
        TotalQty: 0,
        TotalCost: 0,
      };
    }

    groups[transRef].Items.push(item);
    groups[transRef].TotalQty += Number(item.Qty || 0);
    groups[transRef].TotalCost += Number(item.TotalCost || 0);
  });

  return Object.values(groups);
}

function itemDescription(item, language) {
  if (language === "KM" && item.ItemDescKH) {
    return item.ItemDescKH;
  }

  return item.ItemDesc || "";
}

function grandQty(orders) {
  if (!Array.isArray(orders)) return 0;

  return orders.reduce((total, order) => {
    const items = Array.isArray(order.Items) ? order.Items : [];

    return (
      total +
      items.reduce((sum, item) => {
        return sum + Number(item.Qty || 0);
      }, 0)
    );
  }, 0);
}

function grandTotalCost(orders) {
  if (!Array.isArray(orders)) return 0;

  return orders.reduce((total, order) => {
    const items = Array.isArray(order.Items) ? order.Items : [];

    return (
      total +
      items.reduce((sum, item) => {
        return sum + Number(item.TotalCost || 0);
      }, 0)
    );
  }, 0);
}
