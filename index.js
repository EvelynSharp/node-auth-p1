
const express = require('express');
const http = require('http');
//below are middlewares
//any incoming request will be passed through all middlewares by default
const bodyParser = require('body-parser');
const morgan = require('morgan');
//create app as an instance of express
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB SETUP
mongoose.connect('mongodb://localhost/node-auth-p1')

//APP SETUP
//app.use register morgan and bodyparser as middlewares
// a logging framework - log req activities in node console
// mostly used for debugging
app.use(morgan('combined'));
//used to parse incoming req to json no matter what req type is
app.use(bodyParser.json( { type: '*/*' } ))
router(app);

//SERVER SET UP
//http - node local library - good for very low level of http request incoming
const port = process.env.PORT || 3090;
//below make a http server knows how to received req, then it sends all request to "app"
const server = http.createServer(app);
server.listen(port);
console.log('server listening on', port)
