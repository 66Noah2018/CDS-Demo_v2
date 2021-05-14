function dateToString(date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function parseDate(string) {
    if (!string) return null;
    else return Date(string);
}

module.exports = { dateToString, parseDate }