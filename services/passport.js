const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//in passport, a strategy is a method for authenticating user
//req -> hit passport, check login use strategy -> if login send to route handler

//use local strategy to sign in with pw and email,
//if signed in, route handle and give them a new jwt token
const LocalStrategy = require('passport-local');

// localstrats will default look for pw in BODY under pw, and username in username
//rest username to email below
const localOptions = { usernameField: 'email' };
//Create local strategy
const localLogin = new LocalStrategy( localOptions, (email, password, done) => {
  //verify email and pw,
  // if correct, call done with email, else call done with false
  // similar to jwtLogin
  User.findOne({ email: email}, (err, user) => {
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    //is pw == user.password? need to decoded "salted" pw
    // encrypt the provided pw with salt to match to hash - never decrypt hash
    

  })
})


//setup options for jwt strategy
//tell the new jwt strats below where to find the token - look in req header
//also tell secret
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


//create jwt strategy
//payload is the decoded jwt token  - sub (user.id) and iat
//done is a cb func, we need to call depending on if auth successfully
const jwtLogin = new JwtStrategy( jwtOptions, (payload, done) => {
  //see if userID exist in db
  // if so, call done with user obj, if not call done w/o user
  User.findById(payload.sub, (err, user) => {
    if(err) {return done(err, false);}
    if(user){
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//tell passport to use this strategy

passport.use(jwtLogin);
