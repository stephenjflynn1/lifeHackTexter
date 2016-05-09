var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var twilio = require('twilio');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Load the twilio module

// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('AC1b2ecbb48b05f6242114526bb723fd7a ', '4c1cf79973a8ed3105ea67dff0d38e95');

// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.

app.use('/', routes);
app.use('/users', users);
app.post('/sendmessage', function(req, res) {
  client.sms.messages.create({
      to: req.body.numberToText,
      from:'+17814714360',
      body: "LIFE HACK: When showing up late for work, don't show up with a cup of coffee you bought along the way"
  }, function(error, message) {
    console.log(message, 'response from twillo');
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
          res.json(message)
      } else {
          console.log(error);
          res.json(error);
      }
    })
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
