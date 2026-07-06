function rowNumber(index) {
    return index + 1;
}

function sumTotal(items, field) {
    var sum = 0;
    items.forEach(function (item) {
        if (item && item[field]) {
            sum += Number(item[field]);
        }
    });
    return sum;
}

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