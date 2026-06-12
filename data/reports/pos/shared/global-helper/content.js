function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatMoney(value, locale, currency) {
  console.log(value,typeof value);

  if(value === null || value === undefined) {
    return "0";
  }
  if(typeof value === 'string' ){
    return value;
  }
  const num = Number(value || 0);
  return num.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function isNullOrEmpty(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return value;
}
