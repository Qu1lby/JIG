/* This module is use to interact with the Database */

database = module.exports = {
  mysql: require('mysql'),
  mySqlClient: null,

  /* Init the connection */
  connect: function (host, user, password, datab) {
    this.mysql = require('mysql');
    this.mySqlClient = this.mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: datab
    });
  },

  close: function () {
    this.mySqlClient.end();
  },

  getSQL: function () {
    return this.mySqlClient;
  },

  /* Execute a query */
  executeQuery: function (myQuery, callback) {
    var res = this.mySqlClient.query(myQuery, function select(error, results, fields) {

      if (error) {
        console.log('[ERR] ' + error);
        console.log('[QUERY] ' + myQuery);
        return;
      }

      if (callback != undefined)
        callback(results);
      else return;
    });
  },

  /* Get result of Query */
  getResult: function (myQuery, callback) {
    var res = this.mySqlClient.query(myQuery, function select(error, results, fields) {

      if (error) {
        console.log('[ERR] ' + error);
        console.log('[QUERY] ' + myQuery);
        return;
      }

      if (callback != undefined)
        return results;

    });
          },

  /* Escape character */
  escape: function (data) {
    return this.mySqlClient.escape(data);
  }
}
