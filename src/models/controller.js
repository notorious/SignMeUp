function studentReg(gname, gaddress, guserName, gpassword, gdob, gtele, gmajor, gminor, gnotes){
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
        var sql = `INSERT INTO Students (name, address, userName, password, dob, tele, major, minor, notes) VALUES ("${gname}", "${gaddress}", "${guserName}", "${gpassword}", "${gdob}", "${gtele}", "${gmajor}", "${gminor}", "${gnotes}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}
/*
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
*/

//Currently broken please see example of how to get name from returnTable
/*
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
            //console.log(result);
            //console.log(result[0].name.toString());
            return result[0].name.toString();
        });
    });
}
*/

async function returnTable(gtable){
    var mysql = require('mysql');
    
    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });

    let p = new Promise(function(res,rej) {
        con.connect(function(err){
            if (err) throw err;
            con.query(`SELECT * FROM ${gtable}`, function(err, result, fields) {
                if (err) throw err;
                res(result);
            });
        });    
    });
    return await p;
}
//function that can return the id, username, and password of a user from a desired table (Student or Faculty)
async function returnLogin(gtable, id){
    var mysql = require('mysql');
    
    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });

    let p = new Promise(function(res,rej) {
        con.connect(function(err){
            if (err) throw err;
            con.query(`SELECT id, userName, password FROM ${gtable} WHERE id = ${id}`, function(err, result, fields) {
                if (err) throw err;
                res(result);
            });
        });    
    });
    return await p;
}

async function returnStudentReport(id){
    var mysql = require('mysql');
    
    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });

    let p = new Promise(function(res,rej) {
        con.connect(function(err){
            if (err) throw err;
            con.query(`SELECT id, name, tele, address, dob, major, minor, notes FROM Students WHERE id = ${id}`, function(err, result, fields) {
                if (err) throw err;
                res(result);
            });
        });    
    });
    return await p;
}

module.exports = {studentReg, returnTable, returnLogin, returnStudentReport}