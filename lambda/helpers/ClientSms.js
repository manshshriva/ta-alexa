'use strict';

console.log('Loading event');

// Twilio Credentials
var accountSid = 'AC9f887cefac6c35672bb6a3dd4190e2e1';
var authToken = '55e095e65cb4a64f579f1fdaaef734e3';
var fromNumber = '+17864606378';
var twilio = require('twilio');

module.exports = {

        sendSMS: (message) => {
            return new Promise((resolve,reject)=>{
            console.log('inside  sendSMS');
             var client =new twilio.Twilio('','',accountSid,authToken);

          /*   client.mesclientsage.create({
                            body: 'Hello from Node'+message,
                            to: '+17869253118',  // Text this number
                            from: fromNumber // From a valid Twilio number
                        }).then((message)=>{
                            console.log(message);
                            return resolve(message)
                        }).catch((error) => {
                            console.log(error);
                            return reject(error);
                        })*/

           /*var client =new twilio.RestClient(accountSid,authToken);
           client.sendMessage(
               { body: 'Hello from Node'+message,
                  to: '+17869253118', // Text this number
                  from: fromNumber ,// From a valid Twilio number
                } , function(err, responseData) { //this function is executed when a response is received from Twi
                   if (!err) {

                       // "err" is an error received during the request, if any
                       // "responseData" is a JavaScript object containing data received fro Twilio.
                       // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                       // http://www.twilio.com/docs/api/rest/sending-sms#example-1 console.log(responseData.from);
                       // outputs "+14506667788"
                      console.log(responseData.body); // outputs "word to your mother."

                       return resolve(responseData);
                   }else {
                        return reject(err);
                   }

                  });*/



        })
        
    }
};