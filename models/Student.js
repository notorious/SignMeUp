class Student{
    constructor (id, name, address, userName, password, classComplete, classCurrent, classExt, tele, major, minor, notes) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.userName = userName;
        this.password = password;
        this.classComplete = classComplete;
        this.classCurrent = classCurrent;
        this.classExt = classExt;
        this.tele = tele;
        this.major = major;
        this.minor = minor;
        this.notes = notes;
    }

    async userNameUpdate(newUserName){
        this.userName = newUserName;
        var id = this.id;
        this.studentUpdate("userName", newUserName, id);
    }

    async nameUpdate(newName){
        this.name = newName;
        var id = this.id;
        this.studentUpdate("name", newName, id);
    }

    async addressUpdate(newAddress){
        this.address = newAddress;
        var id = this.id;
        this.studentUpdate("address", newAddress, id);
    }

    async passwordUpdate(oldPassword, newPassword){
        if (oldPassword == this.password){
            console.log("Password match");
            this.password = newPassword;
            var id = this.id;
            this.studentUpdate("password", newPassword, id);
            return 0;
        }
        console.log("Password Mismatch");
        return -1;
    }

    async teleUpdate(newTele){
        this.tele = newTele;
        var id = this.id;
        this.studentUpdate("tele", newTele, id);
    }

    async majorUpdate(newMajor){
        this.major = newMajor;
        var id = this.id;
        this.studentUpdate("major", newMajor, id);
    }

    async minorUpdate(newMinor){
        this.minor = newMinor;
        var id = this.id;
        this.studentUpdate("minor", newMinor, id);
    }

    async notesUpdate(newNotes){
        this.notes = newNotes;
        var id = this.id;
        this.studentUpdate("notes", newNotes, id);
    }

//the next 3 methods take the class complete current and external string and extract the string into a usable array of arrays.
    returnCompletedClassSchedule(){
        var x = this.classComplete;
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

        return q;
    }

    returnCurrentClassSchedule(){
        var x = this.classCurrent;
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
        return q;
    }

    returnExtClassSchedule(){
        var x = this.classExt;
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
    

        return q;
    }

    studentUpdate(gColumn, gUpdate, id){
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

    returnGPA(){
        q = this.returnCurrentClassSchedule();
        var gpa = 0;
        var units = 0;
        for (let i = 0; i < q.length; i++){
            switch(q[i][4]){
                case "A+":
                    gpa += (4 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "A":
                    gpa += (4 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "A-":
                    gpa += (3.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B+":
                    gpa += (3.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B":
                    gpa += (3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B-":
                    gpa += (2.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C+":
                    gpa += (2.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C":
                    gpa += (2 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C-":
                    gpa += (1.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D+":
                    gpa += (1.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D":
                    gpa += (1 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D-":
                    units += parseInt(q[i][3]);
                    break;
                case "F":
                    units += parseInt(q[i][3]);
                    break;
                default:
                    break;
            }
        }
        q = this.returnCompletedClassSchedule();
        for (let i = 0; i < q.length; i++){
            switch(q[i][4]){
                case "A+":
                    gpa += (4 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "A":
                    gpa += (4 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "A-":
                    gpa += (3.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B+":
                    gpa += (3.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B":
                    gpa += (3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B-":
                    gpa += (2.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C+":
                    gpa += (2.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C":
                    gpa += (2 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C-":
                    gpa += (1.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D+":
                    gpa += (1.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D":
                    gpa += (1 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D-":
                    units += parseInt(q[i][3]);
                    break;
                case "F":
                    units += parseInt(q[i][3]);
                    break;
                default:
                    break;
            }
        }
        q = this.returnExtClassSchedule();
        for (let i = 0; i < q.length; i++){
            switch(q[i][4]){
                case "A+":
                    gpa += (4 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "A":
                    gpa += (4 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "A-":
                    gpa += (3.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B+":
                    gpa += (3.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B":
                    gpa += (3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "B-":
                    gpa += (2.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C+":
                    gpa += (2.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C":
                    gpa += (2 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "C-":
                    gpa += (1.7 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D+":
                    gpa += (1.3 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D":
                    gpa += (1 * parseInt(q[i][3]));
                    units += parseInt(q[i][3]);
                    break;
                case "D-":
                    units += parseInt(q[i][3]);
                    break;
                case "F":
                    units += parseInt(q[i][3]);
                    break;
                default:
                    break;
            }
        }
        gpa = gpa/units;
        console.log(gpa);
        return gpa;
    }
}

async function studentlogOn(userName, password){
    let p = new Promise(function(res,rej) {
    (async () => {
        temp = await returnLogin("Students", userName, password);
        console.log(temp);
        if (temp[0] == null){
            res(null);
        }
        else{
            test = new Student(temp[0].id, temp[0].name, temp[0].address , userName, password, temp[0].classComplete, temp[0].classCurrent, temp[0].classExt, temp[0].tele, temp[0].major, temp[0].minor, temp[0].notes);
            res(test);
        }
        })();
    });
    return await p;
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

module.exports = {studentlogOn, Student};