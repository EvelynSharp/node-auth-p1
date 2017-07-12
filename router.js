const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//create passport middleware - requireAuth Helper
const requireAuth = passport.authenticate('jwt', { session: false });


//req represents the incoming http req, include req data
//res represents the response we'll format and return back
//next is mostly for err handling
module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there'})
  })
  app.post('/signup', Authentication.signup);
}
