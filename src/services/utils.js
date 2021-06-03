function getDateNow() {
    return new Date().toISOString().replace('T', ' ').replace(/\.\d\d\dZ/i, '');
}

module.exports = { getDateNow }