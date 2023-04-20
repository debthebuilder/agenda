const mysql = require("mysql");

const config =  mysql.createConnection({
   
    host: "localhost",
    user: "root",
    password: "root",
    database: "agenda",
    port: 8889
    
});

config.connect();

module.exports = config;