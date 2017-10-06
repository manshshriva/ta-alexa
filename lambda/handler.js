'use strict';
var Alexa = require('alexa-sdk');

var onbordingStateHandler = require('./handlers/onboardingStateHandlers');
var mainStateHandler = require('./handlers/mainStateHandler');
var personalStateHandler = require('./handlers/personalStateHandler');

var constants = require('./constants/constants');


module.exports.alexaSkills = (event, context, callback) => {
    var alexa = Alexa.handler(event, context);
    alexa.apiId= constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        onbordingStateHandler,
        mainStateHandler,
        personalStateHandler
    );
    alexa.execute();
};
/*

var handlers = {

    'DeleteProfile': function() {

        var policyNumber = this.event.request.intent.slots.policy.value;
        this.emit(':ask', 'Great! ' + 'I can link your Transamerica policy so you can track it anytime. Tell me your Policy number by sayinng  My policy number is and  then your policy number', 'Tell me your Policy number by sayinng  My policy number is and  then your policy number');

    },


    'AMAZON.StopIntent': function () {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'AMAZON.CancelIntent': function () {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'SessionEndedRequest': function () {
        // Force State Save When User Times Out
        this.emit(':saveState', true);
    }

};*/
