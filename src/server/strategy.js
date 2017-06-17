const passport = require('passport');
const Strategy = require('passport-local');

const User = require('./models').User;

passport.use(new Strategy(
  (username, password, done) => {
    User.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    })
    .catch(err => {
      return done(null, err);
    });
  }
));

module.exports = passport;