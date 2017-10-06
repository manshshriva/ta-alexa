'use strict';
var Alexa = require('alexa-sdk');
var constants = require('../constants/constants')
var mainStateHandler=Alexa.CreateStateHandler(constants.states.MAIN,{

    'LaunchRequest':function () {

        var firstName = this.attributes['firstName'];
        var existingCustomer = this.attributes['existingCustomer'];
        var acountLinked = this.attributes['acountLinked'];
        var acountLinked = this.attributes['acountLinked'];

        if(firstName){

            // change the state to main
            this.emitWithState('LaunchRequest');

            this.emit(':ask','welcome back ${firstname}','welcome back ${firstname}');
        }
        else {
            this.handler.state= constants.states.ONBOARDING;
            this.emitWithState('NewSession');

        }
    },
    'PolicyNumber': function() {
        var policyNumber = this.event.request.intent.slots.policy.value;

        this.emit(':ask', 'Great! ' + 'I can link your Transamerica policy so you can track it anytime. Tell me your Policy number by sayinng  My policy number is and  then your policy number', 'Tell me your Policy number by sayinng  My policy number is and  then your policy number');

    },

    'AMAZON.HelpIntent': function () {
        // State Automatically Saved with :tell
        var firstName = this.attributes['firstName'];
        if(firstName){

        }
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
    },
    'Unhandled': function () {
        this.emitWithState('AMAZON.HelpIntent');
    }
});

module.exports=mainStateHandler;