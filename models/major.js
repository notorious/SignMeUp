async function returnMajor(gmajor){
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
            con.query(`SELECT courseReq FROM Major WHERE majorTitle = "${gmajor}"`, function(err, result, fields) {
                if (err) throw err;
                res(result);
            });
        });    
    });
    return await p;
}

async function returnMajorOutline(gid){
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
            con.query(`SELECT selectedCourses, statusHistory FROM MajorOutline WHERE studentID = ${gid}`, function(err, result, fields) {
                if (err) throw err;
                if (result[0] != null){
                    var temp = result[0].selectedCourses;
                    var temp2 = result[0].statusHistory;
                    var array1;
                }
                res(result);
            });
        });    
    });
    return await p;
}

module.exports = {returnMajor, returnMajorOutline};