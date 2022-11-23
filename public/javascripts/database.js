const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'fcfs.c2oe7fkglsr2.us-west-2.rds.amazonaws.com',
	database : 'FCFS',
	user : 'admin',
	password : '529dh-bj345-wbedaj'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;
