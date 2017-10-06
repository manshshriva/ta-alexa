"use strict";

// Twilio Credentials
var accountSid = 'AC9f887cefac6c35672bb6a3dd4190e2e1';
var authToken = '55e095e65cb4a64f579f1fdaaef734e3';
var fromNumber = '+17864606378';
const client = require('twilio')(accountSid, authToken);

module.exports = {

    sendSMS: (message,agentPhoneNumber) => {
        return new Promise((resolve,reject)=>{
            console.log("insde sendSMS"+message);
            client.messages.create({
                body: message,
                to: agentPhoneNumber,
                from: fromNumber
            }).then((message) => {
                    process.stdout.write(message.sid);
                    return resolve(message);
                })
                .catch((error)=>{
                    return reject(error);
                });
        })
    }
};