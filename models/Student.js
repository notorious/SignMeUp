class Student{
    constructor (id, name, address, userName, password, classSchedule, tele, major, minor, notes) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.userName = userName;
        this.password = password;
        this.classSchedule = classSchedule;
        this.tele = tele;
        this.major = major;
        this.minor = minor;
        this.notes = notes;
    }

    async userNameUpdate(newUserName){
        this.userName = newUserName;
        var id = this.id;
        studentUpdate("userName", newUserName, id);
    }

    async nameUpdate(newName){
        this.name = newName;
        var id = this.id;
        studentUpdate("name", newName, id);
    }

    async addressUpdate(newAddress){
        this.address = newAddress;
        var id = this.id;
        studentUpdate("address", newAddress, id);
    }
//need to add: compare old password to database before changing it
    async passwordUpdate(oldPassword, newPassword){
        this.password = newPassword;
        var id = this.id;
        studentUpdate("password", newPassword, id);
    }

    async teleUpdate(newTele){
        this.tele = newTele;
        var id = this.id;
        studentUpdate("tele", newTele, id);
    }

    async majorUpdate(newMajor){
        this.major = newMajor;
        var id = this.id;
        studentUpdate("major", newMajor, id);
    }

    async minorUpdate(newMinor){
        this.minor = newMinor;
        var id = this.id;
        studentUpdate("minor", newMinor, id);
    }

    async notesUpdate(newNotes){
        this.notes = newNotes;
        var id = this.id;
        studentUpdate("notes", newNotes, id);
    }
}

async function studentlogOn(userName, password){
    let p = new Promise(function(res,rej) {
    (async () => {
        temp = await returnLogin("Students", userName, password);
        console.log(temp);
        if (temp[0] == null){
            res([null, -1]);
        }
        else{
            test = new Student(temp[0].id, temp[0].name, temp[0].address , userName, password, temp[0].classSchedule, temp[0].tele, temp[0].major, temp[0].minor, temp[0].notes);
            res([test, 0]);
        }
        })();
    });
    return await p;
}


function studentUpdate(gColumn, gUpdate, id){
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
            var sql = `UPDATE Students SET ${gColumn} = "${gUpdate}" WHERE id = ${id}`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
                
            });
        });
}

async function returnLogin(gtable, userName, password){
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
            con.query(`SELECT * FROM ${gtable} WHERE userName = "${userName}" AND password = "${password}"`, function(err, result, fields) {
                if (err) throw err;
                res(result);
            });
        });    
    });
    return await p;
}
/*
(async () => {
    //temp = await dt.returnTable("Students");
    temp = await studentlogOn("testUpdate", "1234");
    //console.log(temp);
    test = temp[0];
    code = temp[1];
    console.log(test)
    if (test == null) {
        console.log("User does not exist, check credentials before running again")
        return;
    }
    test.userNameUpdate("TestUpdate");
})();
*/