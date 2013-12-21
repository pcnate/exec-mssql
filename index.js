var mysql = require('mysql');
var fs = require('fs');
var config = require('./config');

function execsql( filename ){
fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	
	var conn = mysql.createConnection( config );
	conn.connect();
	conn.query(data, function(err, results){
		if(err) throw err;
		for(var i=0; i<results.length; i++){
			console.log( i + ':' + JSON.stringify(results[i]) );
		}
	});
	conn.end();
});
}

module.exports = execsql;
