const Handlebars = require("handlebars");
const sharedHelpers = require("./data/reports/pos/ClosingInventoryDetail/shared-helpers/content.js");

for (const name in sharedHelpers) {
  if (typeof sharedHelpers[name] === "function") {
    Handlebars.registerHelper(name, sharedHelpers[name]);
  }
}
