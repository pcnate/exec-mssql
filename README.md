execsql
=======

An npm project. Node.js
Execute you *.sql file which contains multiple sql statements. Usate: init database.

## Usage

### As a CLI tool

1. Make sure that you have `execsql` installed globally
	```shell
	npm install -g execsql
	```
2. Configure your db account first
	```shell
	execsql -c "root" "root"
	```

2. Execute a `.sql` file
	```shell
	execsql ./db.sql
	```

### As a Node dependency

1. Make sure that you have `execsql` installed locally
	```shell
	npm install execsql
	```

2. Require and use
	```js
	var execsql = require('execsql'),
		dbConfig = {
			user: 'root',
			password: 'root'
		},
		sqlFile = __dirname + '/db.sql';
	execsql.config(dbConfig)
		.exec(sqlFile, function(err, results){
			console.log(results);
		});
	```
