function rowNumber(index) {
  return index + 1;
}
function groupByDate(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  var grouped = {};

  data.forEach(function (item) {
    if (!item) return;

    var dateVal = item.Date || item.date || "Unknown Date";
    var dateKey = dateVal;
    if (typeof dateVal === "string" && dateVal.includes("T")) {
      dateKey = dateVal.split("T")[0];
    }

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        Date: dateKey,
        Items: [],
        SubtotalSalePrice: 0,
        SubtotalDiscount: 0,
        SubtotalCost: 0,
        SubtotalExpense: 0,
        SubtotalNetPrice: 0,
        SubtotalProfit: 0,
        Payments: [],
      };
    }

    var group = grouped[dateKey];

    var parseVal = function (val) {
      if (val === undefined || val === null) return 0;
      if (typeof val === "number") return val;
      var str = val.toString().replace(/,/g, "");
      var parsed = parseFloat(str);
      return isNaN(parsed) ? 0 : parsed;
    };

    var format = function (num) {
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    group.Items.push({
      SalePrice: format(parseVal(item.SalePrice)),
      Discount: format(parseVal(item.Discount)),
      Cost: format(parseVal(item.Cost)),
      Expense: format(parseVal(item.Expense)),
      NetPrice: format(parseVal(item.NetPrice)),
      Profit: format(parseVal(item.Profit)),
      Payments: Array.isArray(item.Payments)
        ? item.Payments.map(function (p) {
            return {
              PaymentType: p.PaymentType,
              TotalReceived: format(parseVal(p.TotalReceived)),
              CurrencySymbol: p.CurrencySymbol || "$",
            };
          })
        : [],
    });

    group.SubtotalSalePrice += parseVal(item.SalePrice);
    group.SubtotalDiscount += parseVal(item.Discount);
    group.SubtotalCost += parseVal(item.Cost);
    group.SubtotalExpense += parseVal(item.Expense);
    group.SubtotalNetPrice += parseVal(item.NetPrice);
    group.SubtotalProfit += parseVal(item.Profit);

    if (Array.isArray(item.Payments)) {
      item.Payments.forEach(function (payment) {
        if (!payment) return;
        var pType = payment.PaymentType;
        var currency = payment.CurrencySymbol || "$";
        var total = parseVal(payment.TotalReceived);

        var existing = null;
        for (var i = 0; i < group.Payments.length; i++) {
          if (
            group.Payments[i].PaymentType === pType &&
            group.Payments[i].CurrencySymbol === currency
          ) {
            existing = group.Payments[i];
            break;
          }
        }

        if (existing) {
          existing.TotalReceived = parseVal(existing.TotalReceived) + total;
        } else {
          group.Payments.push({
            PaymentType: pType,
            TotalReceived: total,
            CurrencySymbol: currency,
          });
        }
      });
    }
  });

  var result = Object.keys(grouped)
    .sort()
    .map(function (key) {
      var group = grouped[key];

      var format = function (num) {
        return num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };

      return {
        Date: group.Date,
        Items: group.Items,
        SubtotalSalePrice: format(group.SubtotalSalePrice),
        SubtotalDiscount: format(group.SubtotalDiscount),
        SubtotalCost: format(group.SubtotalCost),
        SubtotalExpense: format(group.SubtotalExpense),
        SubtotalNetPrice: format(group.SubtotalNetPrice),
        SubtotalProfit: format(group.SubtotalProfit),
        Payments: group.Payments.map(function (p) {
          return {
            PaymentType: p.PaymentType,
            TotalReceived: format(p.TotalReceived),
            CurrencySymbol: p.CurrencySymbol,
          };
        }),
      };
    });

  return result;
}
