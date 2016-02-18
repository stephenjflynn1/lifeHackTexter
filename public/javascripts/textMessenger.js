
var numberToText = document.getElementById("recipientNumber");
var messageContent = document.getElementById("messageContent");



// Load the twilio module
var twilio = require('twilio');
var http = require('http');

// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('AC1b2ecbb48b05f6242114526bb723fd7a ', '4c1cf79973a8ed3105ea67dff0d38e95');

// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.


document.getElementById("textInfo").onsubmit = function onSubmit(form)
{
client.sms.messages.create({
    to: numberToText,
    from:'+19177467597',
    body: messageContent
}, function(error, message) {
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
    } else {
        console.log(error);
    }
  }

});
