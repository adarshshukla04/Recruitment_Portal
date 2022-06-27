const mysql = require('mysql2');
const schedule = require('node-schedule');

// DB Connection
const connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASS,
    database : process.env.DBNAME
});

exports.con = connection

exports.dbConnect = () => {
    connection.connect(function(err) {
        if(err){
            console.log(err);
        }else{
            console.log("DB CONNECTED :)");
        }
    });
}