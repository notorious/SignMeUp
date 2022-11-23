//const { interpolate } = require('eslint/lib/linter');

function studentReg(gname, gaddress, guserName, gpassword, gdob, gtele, gmajor, gminor, gnotes){
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });

    var tname;
    var id;
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("connected!");
        var sql = `INSERT INTO Students (name, address, userName, password, dob, tele, major, minor, notes) VALUES ("${gname}", "${gaddress}", "${guserName}", "${gpassword}", "${gdob}", "${gtele}", "${gmajor}", "${gminor}", "${gnotes}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result);
        });

        var sql = `SELECT * FROM Students WHERE tele = "${gtele}"`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("found");
            console.log(result[0].id);
            id = result[0].id;
            tname = result[0].id.toString() + guserName + "ScheduleTable";
            var sql = `UPDATE Students SET classSchedule = "${tname}" WHERE id = ${id}`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                var sql = `CREATE TABLE ${tname} (id INT AUTO_INCREMENT PRIMARY KEY, courseName VARCHAR(255), semesterComp VARCHAR(255), units INT, grade VARCHAR(255), equiv VARCHAR(255), equivID VARCHAR(255))`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Table created");
                });
            });
        });
    });
}

function facultyReg(gname, guserName, gpassword, gtele, gofficeTele, gofficeHours, gofficeNum, gtitle, gdepartment, gaddress){
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
        var sql = `INSERT INTO Faculty (name, userName, password, tele, officeTele, officeHours, officeNum, title, department, address) VALUES ("${gname}", "${guserName}", "${gpassword}", "${gtele}", "${gofficeTele}", "${gofficeHours}", "${gofficeNum}", "${gtitle}", "${gdepartment}, "${gaddress}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}

function facultyReg(gTable, gname, gaddress, guserName, gpassword){
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
        var sql = `INSERT INTO ${gTable} (name, address, userName, password) VALUES ("${gname}", "${gaddress}", "${guserName}", "${gpassword}")`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}
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

async function returnStudentSchedule(id){
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
            con.query(`SELECT id, classSchedule FROM Students WHERE id = ${id}`, function(err, result, fields) {
                if (err) throw err;
                gtable = result[0].classSchedule;
                con.query(`SELECT * FROM ${gtable}`, function(err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                    res(result);
                });
            });          
        });    
    });
    return await p;
}

async function enterStudentSchedule(id, gcourseName, gsemesterComp, gunits, gGrade){
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
        con.query(`SELECT id, classSchedule FROM Students WHERE id = ${id}`, function(err, result, fields) {
            if (err) throw err;
            gtable = result[0].classSchedule;
            var sql = `INSERT INTO ${gTable} (courseName, semesterComp, units, grade) VALUES ("${gcourseName}", "${gsemesterComp}", "${gunits}", "${gGrade}")`;
            con.query(sql, function(err, result, fields) {
                if (err) throw err;
                console.log("Table updated");
            });
        });   
    });
}

module.exports = {studentReg, facultyReg, returnTable, returnLogin, returnStudentReport, enterStudentSchedule, returnStudentSchedule};