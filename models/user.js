//tell mongoose what a user is and ask it to handle
const mongoose = require('mongoose');
//schema is what we use to tell mongoose the particular fields we'll use
const Schema = mongoose.Schema;

//define model
const userSchema = new Schema ({
  email: String,
  password: String
});

//create the model class


//export the model
