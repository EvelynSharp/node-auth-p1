const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  //jwt - has sub (subject) points to who this token belongs to
  //jwt - iat - issued at time
  return jwt.encode( { sub: user.id, iat: timestamp }, config.secret );
}

exports.signin = (req, res, next) => {
  //user already has username/pw authed - middleware in router.js
  //just need to provide token
  res.send({ token: tokenForUser(req.user) });
}


exports.signup = (req, res, next) => {
  // res.send({ success: 'true' });
  // console.log('x')
  let { email, password } = req.body;
  if (!email || !password ) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422) .send({ error: 'Email is in use'});
      //422: unprocessable entity (bad input)
    }
    //only creates in memory
    const user = new User({
      email,
      password
    });
    //save it, and add call back if want to know when it's been saved
    user.save( (err) => {
      if (err) { return next(err); }
      res.json( { token: tokenForUser(user) } );
    });

  });
}
