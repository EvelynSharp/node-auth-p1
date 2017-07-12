//tell mongoose what a user is and ask it to handle
const mongoose = require('mongoose');
//schema is what we use to tell mongoose the particular fields we'll use
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

//define model
//turn req to lowercase before saving to avoid user typing complication with uniqueness for emails
const userSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//on save hook, encrypt password
//'.pre' = before 'save', run this call back function
userSchema.pre('save', function(next) {
  // if use ES6 =>, this will refer to global scope
  const user = this; //this refers to the user model
  bcrypt.genSalt(10, (err, salt) => {
    console.log(user.password);
    if(err) { return next(err); }
    // hash (encrypt) pw using salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) { return next(err); }
      //overwrite pw text with hashed pw
      user.password = hash;
      next(); // go ahead and save
    });
  });
});

//any user obj created will have access to all func defined with .method
userSchema.methods.comparePassword = function( candidatePassword, callback)  {
  //bcrypt will do the encrypt and compare behind the scene
  bcrypt.compare( candidatePassword, this.password, (err, isMatch) => {
    if(err) { return callback(err); }
    callback(null, isMatch); // ismatch will be true/false 
  } )
}

//create the model class
//'user' points to connection, tell mongoose that and to use userSchema
//ModelClass is a class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
