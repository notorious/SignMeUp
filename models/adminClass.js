// JavaScript source code


class Admin {
    constructor(userName, password) {
        
        this.userName = userName;
        this.password = password;



    }
//faculty registration creates and adds a faculty memeber into the faculty table
    facultyReg(gname, gusername, gpassword, gtele, gofficeTele, gofficeHours, gofficeNum, gtitle) {

        var mysql = require('mysql');

        var con =
            mysql.createConnection({
                host:
                    "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
                user: "admin",
                password: "529dh-bj345-wbedaj",
                database: "FCFS"

            });

        con.connect(function (err) {
            if (err) throw err;

            console.log("connected");
            var sql = `INSERT INTO Faculty(name, userName, password, tele, officeTele, officeHours, officeNum, title)
            VALUES("${gname}",  "${gusername}", "${gpassword}", "${gtele}", "${gofficeTele}", "${gofficeHours}", "${gofficeNum}", "${gtitle}")`;
            con.query(sql, function
                (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

        });
}
//Student registration creates and adds a student into the student registration
    studentReg(sId, sName, sAddress, sUserName, sPassword, sClassSchedule, sTele, sMajor, sMinor, sNotes) {

        var mysql = require('mysql');

        var con =
            mysql.createConnection({
                host:
                    "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
                user: "admin",
                password: "529dh-bj345-wbedaj",
                database: "FCFS"
            })

        con.connect(function (err) {
            if (err) throw err;

            console.log("connected");
            var sql = `INSERT INTO Student(id, name, address, userName, password, classSchedule, telephone,major, minor, notes) VALUES("${sId}", "${sName}", "${sAddress}", "${sUserName}", "${sPassword}", "${sClassSchedule}", "${sTele}" "${sMajor}", "${sMinor}", "${sNotes}")`;
            con.query(sql, function
                (err, result) {
                if(err) throw err;
                console.log("1 record inserted");
                });
            });

    }
}