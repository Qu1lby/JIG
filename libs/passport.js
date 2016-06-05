/* This module allow to connect the user with our Database */
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, database, passport, pass_hash) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    database.executeQuery('SELECT * FROM user_info WHERE id = ' + id, function(rows) {
      done(null, rows[0]);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      database.executeQuery('SELECT * FROM user_info WHERE nom = "' + username + '" LIMIT 1', function(rows) {
        if (!rows.length)
          return done(null, false);
        if (pass_hash.verify(password, rows[0].password))
          return done(null, rows[0]);

        return done(null, false);
      });
    }));
}
