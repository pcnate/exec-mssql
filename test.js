require('dotenv').config();
var exec_mssql = require('./index');

var config = {
  "user":           process.env.user,
  "password":       process.env.password,
  "server":         process.env.server,
  "database":       process.env.database,
  "options": {
    "encrypt":        process.env.options_encrypt        === '1' ? true : false,
    "useColumnNames": process.env.options_useColumnNames === '1' ? true : false,
  }
}

execsqlblock = function( callback ) {
  exec_mssql.config( config ).then( () => {
    exec_mssql.exec( /*sql*/`SELECT * FROM LP_Users`).then( data => {
      if( data.err ) {
        console.error( 'error executing sql', data.err );
      }
      console.log( 'execsqlblock done', data.results );
      callback();
    }).catch( error => {
      console.error( 'execsqlblock errored', error );
      callback();
    });
  });
}

execsqlfile = function( callback ) {
  exec_mssql.config( config ).then( () => {
    exec_mssql.execFile( './test.sql' ).then( data => {
      if( data.err ) {
        console.error( 'error executing sql', data.err );
      }
      console.log( 'execsqlfile done', data.results );
      callback();
    }).catch( error => {
      console.error( 'execsqlfile errored', error );
      callback();
    });
  });
}

execsqlblock( () => {
  execsqlfile( () => {
    console.log( 'done with both blocks' );
  })
})