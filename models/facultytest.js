class Faculty {
    constructor(id, name, userName, password, tele, title, address, officeTele, department, currentCourses) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.address = address;
        this.tele = tele;;
        this.title = title;
        this.officeTele = officeTele;
        this.department = department;
        this.currentCourses = currentCourses;
    }

    async userNameUpdate(newUserName){
        this.userName = newUserName;
        let id = this.id;
            FacultyUpdate("userName", newUserName, id);
    }

    async nameUpdate(newName){
        this.userName = newName;
        let id = this.id;
            FacultyUpdate("Name", newName, id);
    }

    async teleUpdate(newTele){
        this.newTele = newTele;
        let id = this.id;
            FacultyUpdate("Telephone", newTele, id);
    }

    async nameUpdate(newName){
        this.userName = newName;
        let id = this.id;
            FacultyUpdate("Name", newName, id);
    }

    async titleUpdate(newTitle){
        this.newTitle = newTitle;
        let id = this.id;
            FacultyUpdate("Title", newTitle, id);
    }

    async OfficeTeleUpdate(newOfficeTele){
        this.newOfficeTele = newOfficeTele;
        let id = this.id;
            FacultyUpdate("Office Telephone", newOfficeTele, id);
    }

    async departmentUpdate(newdepartment){
        this.newdepartment = newdepartment;
        let id = this.id;
            FacultyUpdate("Department", newdepartment, id);
    }

    async CurrentCoursesUpdate(newCurrentCourses){
        this.newCurrentCourses = newCurrentCourses;
        let id = this.id;
            FacultyUpdate("Current Courses", newCurrentCourses, id);
    }

    async AddressUpdate(newAddress){
        this.newAddress = newAddress;
        let id = this.id;
            FacultyUpdate("Addresss", newAddress, id);
    }

    //add passord asyn function
}

async function FacultyLogOn(userName, password){
    let p = new Promise(function(res,rej) {
    (async () => {
        temp = await returnLogin("Faculty", userName, password);
        console.log(temp);
        if (temp[0] == null){
            res([null, -1]);
        }
        else{
            test = new Faculty(temp[0].id, temp[0].name, temp[0].address , userName, password, temp[0].title, temp[0].tele, temp[0].department, temp[0].officeTele, temp[0].currentCourses);
            res([test, 0]);
        }
        })();
    });
    return await p;
}

function FacultyUpdate(gColumn, gUpdate, id){
    let mysql = require('mysql');

    let con = mysql.createConnection({
        host: "fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com",
        user: "admin",
        password: "529dh-bj345-wbedaj",
        database: "FCFS"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("connected!");
            let sql = `UPDATE Faculty SET ${gColumn} = "${gUpdate}" WHERE id = ${id}`;
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