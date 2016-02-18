'use strict';

var errorContainer = $('#errorContainer')
var errorAlert = 'Please write 11 digit phone number in following format: 1##########'
//validations
$('#recipientNumber').keyup(function(event) {
  errorContainer.text('')
  var currentValue = $('#recipientNumber').val();
  if (currentValue[0] != '1') {
    errorContainer.text('Phone number should start with  \'1\'')
  }
  if (/\D/.test(currentValue)) {
    console.log('Input invalid: Input must only contain numbers');
    return errorContainer.text(errorAlert)
  }
  if (currentValue.length > 11) {
    return errorContainer.text('Number cannot be greater than 11 digits')
  }
});
$("#recipientNumber").focusout(function() {
  errorContainer.text('')
  var currentValue = $('#recipientNumber').val();
  if (currentValue[0] != '1') {
    errorContainer.text('Phone number should start with  \'1\'')
  }
  if (/\D/.test(currentValue)) {
    console.log('Input invalid: Input must only contain numbers');
    return errorContainer.text(errorAlert)
  }
  if (currentValue.length > 11) {
    return errorContainer.text('Number cannot be greater than 11 digits')
  }
});
$('#textInfo').submit(function(event) {
  //check if currentValue is less than 11
  event.preventDefault();
  var numberToText = $('#recipientNumber').val();
  var messageContent = $('#messageContent').val()
  if (numberToText.length < 11) {
    return errorContainer.text('Number cannot be lesser than 11 digits')
  }
  var data = {
    numberToText: numberToText,
    messageContent: messageContent
  };
  var request = $.ajax({
    type: "POST",
    url: '/sendmessage',
    data: data,
    dataType: 'json'
  })
  request.done(function(data) {
    console.log(data)
    if (data.status != 200) {
      errorContainer.text(data.message)
    }
  })

  request.fail(function(jqXHR, status) {
    console.log(jqXHR.message);
    console.log(status.message);
    errorContainer.text(jqXHR.message)
    console.log('Request failed: ', status, jqXHR);
  });
});
