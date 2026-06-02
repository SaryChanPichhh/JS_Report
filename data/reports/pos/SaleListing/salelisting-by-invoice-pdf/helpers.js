function rowNumber(index) {
  return index + 1;
}

function formatTime(value) {
  if (!value) return "";
  const parts = value.toString().split("T");
  if (parts.length < 2) return value;
  const timePart = parts[1];
  const timeSubParts = timePart.split(":");
  if (timeSubParts.length < 2) return timePart;
  return `${timeSubParts[0]}:${timeSubParts[1]}`;
}

function formatNumber(value) {
  const num = Number(value || 0);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function groupByInvoice(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const grouped = {};

  items.forEach(function (item) {
    if (!item) return;

    var refKey = item.TransRef || "Unknown Invoice";

    if (!grouped[refKey]) {
      grouped[refKey] = {
        TransRef: refKey,
        TransDate: item.TransDate,
        Seller: item.Seller,
        CustomerName: item.CustomerName,
        Items: [],
        SubtotalCost: 0,
        SubtotalProfit: 0,
        SubtotalDeliveryFee: 0,
        SubtotalTotal: 0
      };
    }

    var group = grouped[refKey];
    group.Items.push(item);

    group.SubtotalCost += Number(item.Cost || 0);
    group.SubtotalProfit += Number(item.Profit || 0);
    group.SubtotalDeliveryFee += Number(item.DeliveryFee || 0);
    group.SubtotalTotal += Number(item.Total || 0);
  });

  return Object.keys(grouped).sort().map(function (key) {
    var group = grouped[key];
    return {
      TransRef: group.TransRef,
      TransDate: group.TransDate,
      Seller: group.Seller,
      CustomerName: group.CustomerName,
      Items: group.Items,
      SubtotalCost: formatNumber(group.SubtotalCost),
      SubtotalProfit: formatNumber(group.SubtotalProfit),
      SubtotalDeliveryFee: formatNumber(group.SubtotalDeliveryFee),
      SubtotalTotal: formatNumber(group.SubtotalTotal)
    };
  });
}

function sumField(items, field) {
  if (!Array.isArray(items)) return 0;
  var total = 0;
  items.forEach(function (item) {
    if (item && item[field] !== undefined && item[field] !== null) {
      total += Number(item[field]);
    }
  });
  return total;
}
