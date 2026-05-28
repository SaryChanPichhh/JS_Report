function getField(item, keys) {
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    if (item[key] !== undefined && item[key] !== null) {
      return item[key];
    }
  }
  return "";
}

function itemName(item) {
  return getField(item, ["ItemDesc", "Name", "itemDesc", "name"]).toString();
}

function lineTotal(item) {
  var qty = (item.Qty || 0);
  var price = (item.Price || 0);
  var discount = (item.DiscountPrice || 0);
  console.log("Line Total", qty * price - discount);
  return (qty * price - discount);
}

function groupBySellerAndDate(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  var groupedBySeller = data.reduce(function (accumulator, currentValue) {
    var seller = getField(currentValue, ["Seller", "seller"]).toString();
    var date = getField(currentValue, [
      "Dates",
      "Date",
      "date",
      "InvoiceDate",
      "invoiceDate",
      "PrintDate",
      "printDate",
    ]).toString();

    if (!accumulator[seller]) {
      accumulator[seller] = {};
    }
    if (!accumulator[seller][date]) {
      accumulator[seller][date] = {
        Date: date,
        Items: [],
        Subtotal: 0,
        TotalPrice: 0,
        TotalRiel: 0,
        TotalDollar: 0,
        Payments: [],
      };
    }

    var items = Array.isArray(currentValue.Items)
      ? currentValue.Items
      : [currentValue];

    accumulator[seller][date].Items =
      accumulator[seller][date].Items.concat(items);

    accumulator[seller][date].Subtotal += Number(currentValue.Subtotal || 0);
    accumulator[seller][date].TotalPrice += Number(
      currentValue.TotalPrice || 0,
    );
    accumulator[seller][date].TotalRiel += Number(currentValue.TotalRiel || 0);
    accumulator[seller][date].TotalDollar += Number(
      currentValue.TotalDollar || 0,
    );

    if (Array.isArray(currentValue.Payments)) {
      accumulator[seller][date].Payments = accumulator[seller][
        date
      ].Payments.concat(currentValue.Payments);
    }

    return accumulator;
  }, {});

  return Object.keys(groupedBySeller)
    .sort()
    .map(function (seller) {
      return {
        Seller: seller,
        Dates: Object.keys(groupedBySeller[seller])
          .sort()
          .map(function (date) {
            return groupedBySeller[seller][date];
          }),
      };
    });
}

function groupBySeller(data) {
  return groupBySellerAndDate(data);
}

function formatNumber(value) {
  var num = Number(value);
  if (isNaN(num)) {
    return value;
  }
  return '$'+ num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


function groupByPaymentType(data) {
  if (!Array.isArray(data)) {
    return [];
  }
  var groupedByPaymentType = data.reduce(function (accumulator, currentValue) {
    var paymentType = getField(currentValue, ["PaymentType", "paymentType"]).toString();
    if (!accumulator[paymentType]) {
      accumulator[paymentType] = {};
    }
    return accumulator;
  }, {});

  console.log(`Payment Type: ${JSON.stringify(Object.keys(groupedByPaymentType).map(function (paymentType) {
    return paymentType;
  }))}`);
  
  return Object.keys(groupedByPaymentType)
    .sort()
    .map(function (paymentType) {
      return {
        PaymentType: paymentType,
      };
    });
}

function groupPayments(dailyClosings) {
  if (!Array.isArray(dailyClosings)) {
    return [];
  }

  var paymentsMap = {};

  dailyClosings.forEach(function (closing) {
    if (closing && Array.isArray(closing.Payments)) {
      closing.Payments.forEach(function (payment) {
        if (payment) {
          var paymentType = getField(payment, ["PaymentType", "paymentType"]).toString().trim();
          if (!paymentType) {
            paymentType = "Other";
          }
          var totalReceived = Number(getField(payment, ["TotalRecieved", "totalRecieved", "TotalReceived", "totalReceived"]) || 0);

          if (!paymentsMap[paymentType]) {
            paymentsMap[paymentType] = 0;
          }
          paymentsMap[paymentType] += totalReceived;
        }
      });
    }
  });

  return Object.keys(paymentsMap)
    .sort()
    .map(function (type) {
      return {
        PaymentType: type,
        TotalRecieved: paymentsMap[type]
      };
    });
}

function sumTotalReceived(dailyClosings) {
  if (!Array.isArray(dailyClosings)) {
    return 0;
  }

  var sum = 0;
  dailyClosings.forEach(function (closing) {
    if (closing && Array.isArray(closing.Payments)) {
      closing.Payments.forEach(function (payment) {
        if (payment) {
          var totalReceived = Number(getField(payment, ["TotalRecieved", "totalRecieved", "TotalReceived", "totalReceived"]) || 0);
          sum += totalReceived;
        }
      });
    }
  });

  return sum;
}

function sumTotalDiscount(dailyClosings) {
  if (!Array.isArray(dailyClosings)) {
    return 0;
  }

  var sum = 0;
  dailyClosings.forEach(function (closing) {
    if (closing) {
      var items = Array.isArray(closing.Items)
        ? closing.Items
        : [closing];

      items.forEach(function (item) {
        if (item) {
          var discount = Number(getField(item, ["DiscountPrice", "discountPrice", "Discount", "discount"]) || 0);
          sum += discount;
        }
      });
    }
  });

  return sum;
}

module.exports = {
  getField,
  itemName,
  lineTotal,
  groupBySellerAndDate,
  groupBySeller,
  formatNumber,
  groupByPaymentType,
  groupPayments,
  sumTotalReceived,
  sumTotalDiscount
};
