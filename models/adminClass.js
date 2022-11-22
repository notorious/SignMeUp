// JavaScript source code


class Admin {
    constructor(userName, password) {
        
        this.userName = userName;
        this.password = password;



    }

    facultyReg(gname, gusername, fpassword, gtele, gofficeTele, gofficeHours, gofficeNum, gtitle) {

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
            VALUES("${gname}", "${gpassword}", "${gtele}", "${gofficeTele}", "${gofficeHours}", "${gofficeNum}", "${title}")`;
            con.query(sql, function
                (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

        });
}

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
        var sql = `INSERT INTO Student(id, name, address, userName, password, classSchedule, telephone,major, minor, notes) VALUES("${sId}", "${sName}", "${sAddress}", "${sUserName}", "${sPassword}", "${sClassSchedule}", "${sTelephone}" "${sMajor}", "${sMinor}", "${sNotes}")`;
        con.query(sql, function
            (err, result) {
            if(err) throw err;
            console.log("1 record inserted");
            });
        });

}//StudentReg
}