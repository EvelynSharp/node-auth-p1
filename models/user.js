//tell mongoose what a user is and ask it to handle
const mongoose = require('mongoose');
//schema is what we use to tell mongoose the particular fields we'll use
const Schema = mongoose.Schema;

//define model
//turn req to lowercase before saving to avoid user typing complication with uniqueness for emails
const userSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//create the model class
//'user' points to connection, tell mongoose that and to use userSchema
//ModelClass is a class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
