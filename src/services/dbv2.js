const getUuid = require('./utils').getUuid;
const executeQueries = require('./utils').executeQueries;

function updateDatabase() {
    queries = [
        "INSERT INTO `orders` VALUES (6, 2, 170000, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:50:00', 0, NULL, NULL, NULL, 14, NULL, " + getUuid() + ", 'ROUTINE', 'ORD-5', NULL, 'NEW', NULL, 1, NULL, NULL, NULL, NULL, NULL);",
        "SET SQL_SAFE_UPDATES = 0;",
        "UPDATE `database_version` SET database_version = 2;",
        "SET SQL_SAFE_UPDATES = 1;"
    ]

    executeQueries(queries);
}

module.exports = { updateDatabase }