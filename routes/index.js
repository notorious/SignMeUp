var express = require('express');
var router = express.Router();
var st = require('../models/Student');
var fc = require('../models/Faculty');

// GET '/' page
router.get('/', function(req, res) {
  res.render('home', { title: 'Express', session : req.session });
});

// POST '/login' page
router.post('/login', function(request, response) {
    var role = request.body.role;

    var username = request.body.username;

    var user_password = request.body.user_password;

    // Check if student, or faculty
    if(username && user_password && (role == "student")) {

        var student;
        (async () => {
            student = await st.studentlogOn(username, user_password);
            if (student === null) {
                console.log("User does not exist, check credentials before running again")
                response.redirect("/");
            } else {
                request.session.studentObj = student;
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

        var faculty;
        (async () => {
            faculty = await fc.FacultyLogOn(username, user_password);
            if (faculty === null) {
                console.log("User does not exist, check credentials before running again")
                response.redirect("/");
            } else {
                request.session.facultyObj = faculty;
                return response.redirect("/faculty");
            }
        })();

    } else {
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
    response.render('student-help-page', { session : request.session})
})

router.get('/faculty', function(request, response){
    response.render('faculty-home', { session : request.session})
})

router.get('/student', function(request, response){
    response.render('student-home', {session : request.session})
})

router.get('/class-schedule', function(request, response){
    response.render('student-class-schedule', {session : request.session})
})

router.get('/student-record', function(request, response){
    response.render('student-electronic-record', {session : request.session})
})

router.get('/student-course-registration', function(request, response){
    response.render('student-course-registration', {session : request.session})
})

router.get('/student-course-requirements', function(request, response){
    response.render('student-major-course', {session : request.session})
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