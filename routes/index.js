var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next){

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
                        response.render("student-home");
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
                            response.render("faculty-home");
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

router.get('/faculty', function(request, response, next){
    response.render('faculty-home')
})

router.get('/student', function(request, response, next){
    response.render('student-home')
})

module.exports = router;