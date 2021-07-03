# CDS-Demo_v2
Proposed functionality openmrs - demo v2

SETUP
manually create database openmrs in local mysql installation
npm run setup
npm i

START SERVER
terminal 1: npm run watch
terminal 2: npm run server
browser: localhost:3000/index.html

CHANGING THE DATABASE
add the changes to the end of the initNewDb.txt file and update the database_version
in server.js, on line 17, change the database_version to the new value in the altered database. this will trigger an automatic update the next time npm run server is executed