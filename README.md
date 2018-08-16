exec-mssql
=======

An npm project. Node.js
Execute your *.sql files which contain multiple sql statements.

## Usage

### As a CLI tool

1. Make sure you have `exec-mssql` installed globally
	```sh
	npm install -g exec-mssql
	```

2. Configure your db access for the first time. Usage: `exec-mssql -c host [port] user password`.
	```sh
	# default port is 3306
	exec-mssql -c "localhost" "database" "root" "root"
	```

- Execute a bunch of sql statements
	```sh
	exec-mssql "use db_cam; delete from admin;"
	```

- Execute a `.sql` file
	```sh
	exec-mssql -f ./db.sql
	```

### As a Node dependency

1. Make sure you have `exec-mssql` installed locally
	```sh
	npm install exec-mssql
	```

2. Require and use
	```js
	var exec_mssql = require('exec-mssql'),
		dbConfig = {
      host: 'localhost',
      database: 'myDatabase',
			user: 'root',
      password: 'root',
      options: {
        encrypt: false
      }
		},
		sql = 'use db_cam;',
		sqlFile = __dirname + '/db.sql';

	exec_mssql.config( dbConfig ).then( () => {
		exec_mssql.exec( sql ).then( results => {

      exec_mssql.execFile( sqlFile ).then( data => {
        if (data.err) throw data.err;
        console.log( results, data.results );

        exec_mssql.end();
        process.exit(0);
      }).catch( error => {
        console.error( 'error executing SQL file', error );
        exec_mssql.end();
        process.exit(0);
      })
    
    }).catch( error => {
      console.error( 'error executing SQL block', error );
      exec_mssql.end();
      process.exit(0);
    })
  })
  
	```
