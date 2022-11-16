var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next){

    var username = request.body.username;

    var user_password = request.body.user_password;

    if(username && user_password)
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
                        response.redirect("/");
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

module.exports = router;