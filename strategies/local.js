const LocalStrategy = require('passport-local');
const passport = require('passport');
const db = require('../database');

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async(username, done) => {
    try{
    const result = await db.promise().query(`SELECT * FROM users WHERE username = ${username}`)
    if (result[0][0]) {
        done(null, result[0][0]);
    }
    } catch (err) {
        done(err, null);
    }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await db
        .promise()
        .query(`SELECT * FROM users WHERE username = '${username}'`);
      if (result[0].length === 0) {
        return done(null, false);
      } else {
        if (result[0][0].password === password) {
          return done(null, result[0][0]);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      done(err, false);
    }
  })
);