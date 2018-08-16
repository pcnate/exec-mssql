exec-mssql
=======

Execute your ms.sql files which contain multiple sql statements.\
`GO` deliminators in files are replaced at runtime by `;`

## Usage

### As a CLI tool

1. Make sure you have `exec-mssql` installed globally
	```sh
	npm install -g exec-mssql
	```

2. Configure your db access for the first time. Usage: `exec-mssql [-e] -c "server" "database" "user" "password"`.
	```sh
	exec_mssql -c "localhost" "database" "root" "root"
	```

- Execute a bunch of sql statements
	```sh
	exec_mssql "use db_cam; delete from admin;"
	```

- Execute a `.sql` file
	```sh
	exec_mssql -f ./db.sql
	```

### As a Node dependency

1. Make sure you have `exec-mssql` installed locally
	```sh
	npm install exec-mssql
	```

2. Require and use
	```js
    var exec_mssql = require('exec-mssql');
    const dbConfig = {
      host:     'localhost',
      database: 'myDatabase',
      user:     'root',
      password: 'root',
      options:  {
        encrypt: true
      }
    };
    const sql = 'use db_cam;';
    const sqlFile = __dirname + '/db.sql';

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
