const uuid = require('uuid');

function getDateNow() {
    return new Date().toISOString().replace('T', ' ').replace(/\.\d\d\dZ/i, '');
}

function getUuid() {
    return `'${uuid.v4()}'`;
}

module.exports = { getDateNow, getUuid }