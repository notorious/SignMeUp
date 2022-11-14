function studentReg(gname, gaddress, guserName, gpassword){
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });


    con.connect(function(err) {
        if (err) throw err;
        console.log("connected!");
        var sql = "INSERT INTO Students (name, address, userName, password) VALUES (${gname}, ${gaddress}, ${guserName}, ${gpassword})";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}
function displayTable(gtable){
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });


    con.connect(function(err){
        if (err) throw err;
        con.query("SELECT * FROM ${gtable}", function(err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}

function returnName(gtable){
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });

    con.connect(function(err){
        if (err) throw err;
        con.query(`SELECT * FROM ${gtable}`, function(err, result, fields) {
            if (err) throw err;
            console.log(result);
            console.log(result[0]);
            return(result.name);
        });
    });
}

module.exports = {studentReg, displayTable, returnName}