const databaseConnection = require('./db').databaseConnection;
const getUuid = require('./utils').getUuid;

function populateDb() {
    createPatients();
    addConcepts();
    addDrugs();
    addObservations();
    addDrugOrders();
}

function createPatients() {
    queries = [
        "INSERT INTO `person` VALUES (10, 'M', '1971-12-07 12:26:30', 0, 0, NULL, NULL, 1, '2021-05-31 11:54:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ", 0, NULL, NULL);",
        "INSERT INTO `patient` VALUES (10, 1, '2021-05-31 11:55:00', NULL, NULL, 0, NULL, NULL, NULL, 'Unknown');",
        "INSERT INTO `patient_identifier` VALUES (10, 10, '10000X', 3, 1, 6, 1, '2021-05-31 11:59:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `person_name` VALUES (10, 1, 10, NULL, 'Tom', NULL, NULL, 'Andriessen', NULL, NULL, NULL, 1, '2021-05-31 12:06:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ");",

        "INSERT INTO `person` VALUES (11, 'F', '1937-10-28 04:22:02', 0, 0, NULL, NULL, 1, '2021-05-31 12:16:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ", 0, NULL, NULL);",
        "INSERT INTO `patient` VALUES (11, 1, '2021-05-31 12:16:00', NULL, NULL, 0, NULL, NULL, NULL, 'Unknown');",
        "INSERT INTO `patient_identifier` VALUES (11, 11, '10000X', 3, 1, 6, 1, '2021-05-31 12:18:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `person_name` VALUES (11, 1, 11, NULL, 'Irma', NULL, NULL, 'Jansen', NULL, NULL, NULL, 1, '2021-05-31 12:21:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ");",

        "INSERT INTO `person` VALUES (12, 'F', '1945-06-20 18:50:53', 0, 0, NULL, NULL, 1, '2021-05-31 12:28:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ", 0, NULL, NULL);",
        "INSERT INTO `patient` VALUES (12, 1, '2021-05-31 12:29:00', NULL, NULL, 0, NULL, NULL, NULL, 'Unknown');",
        "INSERT INTO `patient_identifier` VALUES (12, 12, '10000X', 3, 1, 6, 1, '2021-05-31 12:30:00', NULL, NULL, 0, NULL, NULL, NULL, "+ getUuid() + ");",
        "INSERT INTO `person_name` VALUES (12, 1, 12, NULL, 'Johanna', NULL, NULL, 'Molenkamp', NULL, NULL, NULL, 1, '2021-05-31 12:34:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ");",

        "INSERT INTO `person` VALUES (13, 'F', '1927-02-20 21:14:43', 0, 0, NULL, NULL, 1, '2021-05-31 12:38:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ", 0, NULL, NULL);",
        "INSERT INTO `patient` VALUES (13, 1, '2021-05-31 12:39:00', NULL, NULL, 0, NULL, NULL, NULL, 'Unknown');",
        "INSERT INTO `patient_identifier` VALUES (13, 13, '10000X', 3, 1, 6, 1, '2021-05-31 12:39:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `person_name` VALUES (13, 1, 13, NULL, 'Jacoba', NULL, NULL, 'Vries', NULL, NULL, NULL, 1, '2021-05-31 12:44:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ");",

        "INSERT INTO `person` VALUES (14, 'F', '1971-03-05 21:24:24', 0, 0, NULL, NULL, 1, '2021-05-31 14:09:00', NULL, NULL, 0, NULL, NULL, NULL, " + getUuid() + ", 0, NULL, NULL);",
        "INSERT INTO `patient` VALUES (14, 1, '2021-05-31 14:11:00', NULL, NULL, 0, NULL, NULL, NULL, 'Unknown');",
        "INSERT INTO `patient_identifier` VALUES (14, 14, '10000X', 3, 1, 6, 1, '2021-05-31 14:11:00', NULL, NULL, 0, NULL, NULL, NULL , " + getUuid() + ");",
        "INSERT INTO `person_name` VALUES (14, 1, 14, NULL, 'Janneke', NULL, NULL, 'Sloot', NULL, NULL, NULL, 1, '2021-06-01 14:46:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ");"
    ];

    executeQueries(queries);
}

function addConcepts() {
    queries = [
        "INSERT INTO `concept` VALUES (170000, 0, 'Citalopram', 'SSRI', NULL, 4, 3, 0, 1, '2021-06-03 09:12:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid()+ ");",
        "INSERT INTO `concept_name` VALUES (170000, 170000, 'Citalopram', 'en', 0, 1, '2021-06-03 09:20:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",
        "INSERT INTO `concept` VALUES (170001, 0, 'Escitalopram', 'SSRI', NULL, 4, 3, 0, 1, '2021-06-03 09:13:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170001, 170001, 'Escitalopram', 'en', 0, 1, '2021-06-03 09:22:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",
        "INSERT INTO `concept` VALUES (170002, 0, 'Fluoxetine', 'SSRI', NULL, 4, 3, 0, 1, '2021-06-03 09:14:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170002, 170002, 'Fluoxetine', 'en', 0, 1, '2021-06-03 09:23:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0); ",
        "INSERT INTO `concept` VALUES (170003, 0, 'Paroxetine', 'SSRI', NULL, 4, 3, 0, 1, '2021-06-03 09:15:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170003, 170003, 'Paroxetine', 'en', 0, 1, '2021-06-03 09:23:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",
        "INSERT INTO `concept` VALUES (170004, 0, 'Sertraline', 'SSRI', NULL, 4, 3, 0, 1, '2021-06-03 09:16:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170004, 170004, 'Sertraline', 'en', 0, 1, '2021-06-03 09:24:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",

        "INSERT INTO `concept` VALUES (170005, 0, 'Desvenlafaxine', 'SNRI', NULL, 4, 3, 0, 1, '2021-06-03 09:17:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170005, 170005, 'Desvenlafaxine', 'en', 0, 1, '2021-06-03 09:28:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",
        "INSERT INTO `concept` VALUES (170006, 0, 'Duloxetine', 'SNRI', NULL, 4, 3, 0, 1, '2021-06-03 09:17:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170006, 170006, 'Duloxetine', 'en', 0, 1, '2021-06-03 09:29:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",
        "INSERT INTO `concept` VALUES (170007, 0, 'Levomilnacipran', 'SNRI', NULL, 4, 3, 0, 1, '2021-06-03 09:18:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170007, 170007, 'Levomilnacipran', 'en', 0, 1, '2021-06-03 09:30:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);",
        "INSERT INTO `concept` VALUES (170008, 0, 'Venlafaxine', 'SNRI', NULL, 4, 3, 0, 1, '2021-06-03 09:19:00', 1, 0, NULL, 0, NULL, NULL, " + getUuid() + ");",
        "INSERT INTO `concept_name` VALUES (170008, 170008, 'Venlafaxine', 'en', 0, 1, '2021-06-03 09:31:00', NULL, 0, 0, NULL, NULL, " + getUuid() + ", NULL, 0);"
    ];

    executeQueries(queries);
}

function addDrugs() {
    queries = [
        "INSERT INTO `drug` VALUES (15, 71617, 'Aspirin', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 13:58:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (16, 956, 'Celecoxib', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 14:01:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (17, 738, 'Celebrex', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 14:09:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (18, 956, 'Celebrex', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 14:10:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (19, 436, 'Diclofenac', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 14:11:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (20, 912, 'Ibuprofen', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 14:12:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (21, 263, 'Indomethacin', 0, NULL, NULL, NULL, NULL, 1, '2021-06-01 14:13:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        
        
        "INSERT INTO `drug` VALUES (22, 170000, 'Citalopram', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:33:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (23, 170001, 'Escitalopram', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:34:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (24, 170002, 'Fluoxetine', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:35:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (25, 170003, 'Paroxetine', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:35:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (26, 170004, 'Sertraline', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:36:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (27, 170005, 'Desvenlafaxine', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:37:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (28, 170006, 'Duloxetine', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:38:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (29, 170007, 'Levomilnacipran', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:39:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",
        "INSERT INTO `drug` VALUES (30, 170008, 'Venlafaxine', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:40:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);",

        "INSERT INTO `drug` VALUES (31, 358, 'Dextromethorphan', 0, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:45:00', 0, NULL, NULL, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL);"
    ];

    executeQueries(queries);
}

function addObservations() {
    queries = [
        "INSERT INTO `obs` VALUES (1, 13, 729, NULL, NULL, '2021-06-01 13:13:00', 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 90000, NULL, NULL, NULL, '', 1, '2021-06-01 13:37:00', 0, NULL, NULL, NULL, " + getUuid() + ", NULL, NULL, 'FINAL', NULL);"
    ];

    executeQueries(queries);
}

function addDrugOrders() {
    queries = [
        "INSERT INTO `orders` VALUES (5, 2, 358, 3, 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2021-06-03 09:50:00', 0, NULL, NULL, NULL, 14, NULL, " + getUuid() + ", 'ROUTINE', 'ORD-5', NULL, 'NEW', NULL, 1, NULL, NULL, NULL, NULL, NULL);"
    ];

    executeQueries(queries);
}

function executeQueries(queries) {
    queries.forEach(query => {
        databaseConnection.execute(query.trim(), (err, results, fields) => {
            if (err) {
                console.log(query.trim());
                throw err;
            }
        })
    })
}

module.exports = {
    populateDb
}