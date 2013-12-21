var fs = require('fs'),
	_ = require('underscore'),
	mysql = require('mysql'),
	config = {
		multipleStatements: true,
		host: 'localhost'
	};

function exec(filename, callback) {
	fs.readFile(filename, 'utf8', function (err, data) {
		if (err) throw err;
		var conn = mysql.createConnection(config);
		conn.connect();
		conn.query(data, function (err, results) {
			if (!_.isArray(results)) {
				results = [results];
			}
			callback(err, results);
		});
		conn.end();
	});
	return this;
}

exports.exec = exec;
exports.config = function (options) {
	_.extend(config, _.pick(options, ['user', 'password']));
	return this;
}
