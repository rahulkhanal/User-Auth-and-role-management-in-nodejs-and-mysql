const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    database: "test",
    user: "root",
    password: ""
})

con.connect((err)=>{
    if (err) throw err;
    console.log("Connectd to database successfully............");
})

module.exports = con; 