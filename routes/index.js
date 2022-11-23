var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next) {

    var role = request.body.role;

    var username = request.body.username;

    var user_password = request.body.user_password;

    if(username && user_password && (role == "student"))
    {
      query = `
      SELECT * FROM FCFS.Students
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
                        request.session.role = 1;
                        return response.redirect("/student");
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
        response.send('Please Enter Username and Password Details');
        response.end();
    }

});

router.get('/logout', function(request, response, next){
    request.session.destroy();
    response.redirect("/");

});

router.get('/login', function(request, response, next){
    response.render('login', { session : request.session })
})

router.get('/faculty', function(request, response, next){
    response.render('faculty-home', { session : request.session })
})

router.get('/student', function(request, response, next){
    response.render('student-home', {session : request.session })
})

router.get('/class-schedule', function(request, response, next){
    response.render('class-schedule', {session : request.session})
})

router.get('/student-record', function(request, response, next){
    response.render('student-record')
})

router.get('/course-registration', function(request, response, next){
    response.render('course-registration')
})

router.get('/course-requirements', function(request, response, next){
    response.render('course-requirements')
})

router.get('/faculty-course-grades', function(request, response, next){
    response.render('faculty-course-grades')
})

router.get('/faculty-course-registration', function(request, response, next){
    response.render('faculty-course-registration')
})

router.get('/faculty-course-requirements', function(request, response, next){
    response.render('faculty-course-requirements')
})

router.get('/faculty-information', function(request, response, next){
    response.render('faculty-information')
})

router.get('/faculty-student-record', function(request, response, next){
    response.render('faculty-student-record')
})

module.exports = router;