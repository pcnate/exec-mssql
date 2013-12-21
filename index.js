var mysql = require('mysql');
var fs = require('fs');
var config = require('./config');

function execsql(filename, callback) {
	fs.readFile(filename, 'utf8', function (err, data) {
		if (err) throw err;

		var conn = mysql.createConnection(config);
		conn.connect();
		conn.query(data, function (err, results) {
			callback(err, results);
		});
		conn.end();
	});
}

module.exports = execsql;
