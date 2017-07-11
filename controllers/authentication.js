const User = require('../models/user');

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
      res.json( { success: 'true' } );
    });

  });
}
