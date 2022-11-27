async function returnCourses(){
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
            con.query("SELECT * FROM Major WHERE Courses = studentClass", function (err, result) {  //add here custom Major variables and Courses variables based on
                                                                                                     //the students major and class taking
                if (err) throw err;
                res(result);
                if (result.length == 0)
                    console.log("Course not valid")
                else
                    console.log("Course accepted")
                
            });
        });    
    });
    return await p;
}

module.exports = {returnCourses};
