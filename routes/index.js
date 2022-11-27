var express = require('express');
var router = express.Router();
var dt = require('../models/Student');

// Connect to Database
var database = require('../public/javascripts/database');

// GET '/' page
router.get('/', function(req, res) {
  res.render('home', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next) {
    var role = request.body.role;

    var username = request.body.username;

    var user_password = request.body.user_password;

    // Check if student, or faculty
    if(username && user_password && (role == "student"))
    {
        var temp;
        (async () => {
            temp = await dt.studentlogOn(username, user_password);
            if (temp === null) {
                console.log("User does not exist, check credentials before running again")
                response.redirect("/");
            } else {
                request.session.studentObj = temp;
                request.session.studentSchedule = request.session.studentObj.returnCurrentClassSchedule();
                request.session.studentCompletedClasses = request.session.studentObj.returnCompletedClassSchedule();
                request.session.studentCompletedClassesEXT = request.session.studentObj.returnExtClassSchedule();
                request.session.studentGPA = request.session.studentObj.returnGPA();
                console.log(request.session.studentGPA)
                console.log(request.session.studentCompletedClassesEXT);
                return response.redirect("/student");
            }
        })();
        
    } else if (username && user_password && (role == "faculty")) {
        query = `
        SELECT * FROM FCFS.Faculty
        WHERE userName = "${username}"
        `;

            database.query(query, function(error, data){

                if(data.length > 0)
                {
                    for(var count = 0; count < data.length; count++)
                    {
                        if(data[count].password == user_password)
                        {
                            request.session.user_id = data[count].id;
                            request.session.user_data = data[count];
                            request.session.role = 2;
                            return response.redirect("/faculty");
                        }
                        else
                        {
                            response.redirect("/");
                        }
                    }
                }
                else
                {
                    response.redirect("/");
                }
                response.end();
            });
    }
    else
    {
        response.redirect("/");
        response.end();
    }

});

router.get('/logout', function(request, response){
    request.session.destroy();
    response.redirect("/");
});

router.get('/login', function(request, response){
    response.render('login', { session : request.session})
})

router.get('/help', function(request, response){
    response.render('help-page', { session : request.session})
})

router.get('/faculty', function(request, response){
    response.render('faculty-home', { session : request.session})
})

router.get('/student', function(request, response){
    response.render('student-home', {session : request.session})
})

router.get('/class-schedule', function(request, response){
    response.render('class-schedule', {session : request.session})
})

router.get('/student-record', function(request, response){
    response.render('student-electronic-record', {session : request.session})
})

router.get('/course-registration', function(request, response){
    response.render('course-registration', {session : request.session})
})

router.get('/course-requirements', function(request, response){
    response.render('course-requirements', {session : request.session})
})

router.get('/faculty-course-grades', function(request, response){
    response.render('faculty-course-grades', {session : request.session})
})

router.get('/faculty-course-registration', function(request, response){
    response.render('faculty-course-registration', {session : request.session})
})

router.get('/faculty-course-requirements', function(request, response, next){
    response.render('faculty-course-requirements', {session : request.session})
})

router.get('/faculty-information', function(request, response){
    response.render('faculty-information', {session : request.session})
})

router.get('/faculty-student-record', function(request, response){
    response.render('faculty-student-record', {session : request.session})
})

module.exports = router;