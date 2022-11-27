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
                    var array1 = [];
                    var array2 = [];
                    var string = "";
                    var y = 0;
                    for (let i = 0; i < temp.length; i++){
                        while(temp[i] != "," && i < temp.length){
                            string += temp[i];
                            i++;
                        }
                        i++;
                        array1.push(string);
                        string = "";
                        while (y < temp2.length){
                            if(temp2[y] == "}"){
                                y++;
                                break;
                            }
                            else if (temp2[y] == "{" ){}
                            
                            else{
                                string += temp2[y];
                            }
                            y++;
                        }
                        //console.log(string);
                        array1.push(string);
                        array2.push(array1);
                        string = "";
                        array1 = new Array();
                    }
                    //console.log(array2);
                    res(array2);
                }
                res(result);
            });
        });    
    });
    return await p;
}

//sid is the student id, mid is the major id
async function returnCompletedMajorCourses(sid, mid){
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
            var x;
            con.query(`SELECT classComplete FROM Students WHERE id = "${sid}"`, function(err, result, fields) {
                if (err) throw err;
                x = result[0].classComplete;
                var y = "";
                var z = new Array(6);
                var q = [];
                var count = 0;
                if (x != null){
                    for (let i = 0; i < x.length; i++){
                        if (x[i] == ","){
                            z[count] = y;
                            count++;
                            y = "";
                        }
                        else if (x[i] == " " || x[i] == "{"){}
                        else if (x[i] == "\""){
                            i++;
                            while(x[i] !== "\""){
                                y += x[i];
                                i++;
                                
                            } 
                        }
                        else if(x[i] == "}"){
                            q.push(z);
                            z = new Array(6);
                            count = 0;
                        }
                        else{
                            y += x[i];
                            
                            
                        }

                    }
                }
                var coursesTaken = [];
                for (let i = 0; i < q.length; i++){
                    coursesTaken.push(q[i][1]);
                }

                    con.query(`SELECT coursesReq FROM Major WHERE majorID = "${mid}"`, function(err, result, fields) {
                        if (err) throw err;
                        x = result[0].coursesReq;
                        var y = "";
                        var q = [];
                        if (x != null){
                            for (let i = 0; i < x.length; i++){
                                if (x[i] == ","){
                                    q.push(y);
                                    y = "";
                                }
                                else{
                                    y += x[i];
                                    
                                    
                                }

                            }
                        }
                        var courseReq = q;
                        var cross = [];

                        for (let i = 0; i < coursesTaken.length; i++){
                            for (let w = 0; w < courseReq.length; w++){
                                if (coursesTaken[i] == courseReq[w]){
                                    cross.push(coursesTaken[i]);
                                }
                            }
                        }
                        res(cross);
                    });
            });

        
        });    
    });
    return await p;
}

module.exports = {returnMajor, returnMajorOutline, returnCompletedMajorCourses};