var fs = require('fs');
var _ = require('underscore');
var mssql = require('mssql');
var configuration = {
	multipleStatements: true
};
var conn = null;

/**
 * execute a block of sql
 *
 * @param {string} sql sql to be executed
 */
function exec( sql ) {
  return new Promise( ( resolve, reject ) => {

    conn.request().query( sql )
    .then( results => {
      resolve({ err: false, results });
    })
    .catch( error => {
      console.error( 'error executing sql block', error );
      reject( 'error executing sql block', error );
    });
    
  })
}

/**
 * execute a block of sql from a text/sql file
 *
 * @param {string} filename path to a file to be executed
 */
function execFile( filename ) {
  return new Promise( ( resolve, reject ) => {

    fs.readFile( filename, 'utf8', function ( err, sqlText ) {
      if ( err ) throw err;
      sqlText = sqlText.replace( /^GO$/gmi, ';' );
      console.log( sqlText );
      exec( sqlText ).then( data => {
        let err = data.err;
        let results = data.results;
        resolve({ err, results });
      }).catch( error => {
        console.error( 'error executing sql file', error );
        reject( 'error executing sql file', error );
      });
    });

  });
}

/**
 * build the configuration object and create the database connection
 *
 * @param {object} options to be used to connect to the database
 */
function config ( options ) {
  return new Promise( ( resolve, reject ) => {

    if ( conn ) resolve( conn );
    _.extend( configuration, _.pick( options, ['server', 'database', 'user', 'password', 'options'] ) );
    mssql.connect( configuration ).then( newPool => {
      conn = newPool;
      resolve( newPool );
    });

  })
};

/**
 * end the connection
 */
function end() {
	conn.close();
	return this;
};

module.exports = {
  exec:     exec,
  execFile: execFile,
  end:      end,
  config:   config
}