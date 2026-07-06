function sumTotal(items, field) {
  if (!Array.isArray(items)) {
    return 0;
  }

  var sum = 0;
  items.forEach(function (item) {
    if (item && item[field] !== undefined && item[field] !== null) {
      sum += Number(item[field]) || 0;
    }
  });

  return sum.toFixed(2);
}
function sumQuantity(items, field) {
  if (!Array.isArray(items)) {
    return 0;
  }

  var sum = 0;
  items.forEach(function (item) {
    if (item && item[field] !== undefined && item[field] !== null) {
      sum += (item[field]) || 0;
    }
  });
  return sum;
}
try {
  var Handlebars = require("handlebars");
  Handlebars.registerHelper("sumTotal", sumTotal);
} catch (e) {
  // silent catch
}

function groupByInvoiceDate(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  var grouped = {};
  items.forEach(function (item) {
    if (item) {
      var date =
        item.InvoicDate ||
        item.InvoiceDate ||
        item.invoiceDate ||
        "Unknown Date";
      if (!grouped[date]) {
        grouped[date] = {
          InvoiceDate: date,
          Items: [],
          TransRef: item.TransRef || "",
        };
      }
      grouped[date].Items.push(item);
    }
  });

  return Object.keys(grouped).map(function (date) {
    return grouped[date];
  });
}

try {
  var Handlebars = require("handlebars");
  Handlebars.registerHelper("groupByInvoiceDate", groupByInvoiceDate);
} catch (e) {
  // silent catch
}

function groupByTransRef(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  var grouped = {};
  items.forEach(function (item) {
    if (item) {
      var date =
        item.InvoicDate ||
        item.InvoiceDate ||
        item.invoiceDate ||
        "Unknown Date";
      var ref = item.TransRef || item.transRef || "Unknown Ref";
      var key = date + "_" + ref;

      if (!grouped[key]) {
        grouped[key] = {
          TransRef: ref,
          InvoiceDate: date,
          Items: [],
        };
      }
      grouped[key].Items.push(item);
    }
  });

  return Object.keys(grouped).map(function (key) {
    return grouped[key];
  });
}

try {
  var Handlebars = require("handlebars");
  Handlebars.registerHelper("groupByTransRef", groupByTransRef);
} catch (e) {
  // silent catch
}

function groupByDateThenTransRef(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  var dateMap = {};
  items.forEach(function (item) {
    if (item) {
      var date =
        item.InvoicDate ||
        item.InvoiceDate ||
        item.invoiceDate ||
        "Unknown Date";
      var ref = item.TransRef || item.transRef || "Unknown Ref";

      if (!dateMap[date]) {
        dateMap[date] = {
          InvoiceDate: date,
          transRefMap: {},
        };
      }

      if (!dateMap[date].transRefMap[ref]) {
        dateMap[date].transRefMap[ref] = {
          TransRef: ref,
          Items: [],
        };
      }

      dateMap[date].transRefMap[ref].Items.push(item);
    }
  });

  return Object.keys(dateMap).map(function (date) {
    var dateGroup = dateMap[date];
    var transRefGroups = Object.keys(dateGroup.transRefMap).map(function (ref) {
      return dateGroup.transRefMap[ref];
    });
    return {
      InvoiceDate: dateGroup.InvoiceDate,
      TransRefGroups: transRefGroups,
    };
  });
}

try {
  var Handlebars = require("handlebars");
  Handlebars.registerHelper("groupByDateThenTransRef", groupByDateThenTransRef);
} catch (e) {
  // silent catch
}
