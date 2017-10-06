'use strict';
var Alexa = require('alexa-sdk');
var constants = require('../constants/constants');
var clientSmsAPI = require('../helpers/TwilioClient');
var onboardingStateHandler=Alexa.CreateStateHandler(constants.states.ONBOARDING,{


    'NewSession':function () {
        console.log('inside new session');
        var firstName = this.attributes['firstName'];
        var existingCustomer = this.attributes['existingCustomer'];
        var acountLinked = this.attributes['acountLinked'];
        var acountLinked = this.attributes['acountLinked'];

        if(firstName){

            // change the state to main
            //this.emitWithState('LaunchRequest');

            this.emit(':ask','welcome backddddddd ${firstname}','welcome back ${firstname}');
        }
        else {
            this.emit(':ask','Welcome to Voice Transamerica! The skill that gives you all the information about the transamerica great Life Insurance Products. You can ask me about the various life insurance products that suits your need, or you if you are already a Transamerica policy holder you can keep track of your it by linkking your account . But first, I\'d like to get to know you better. Tell me your name by saying: My First Name is, and then your First name. ', 'Tell me your name by saying: My First Name is, and then your First name');

        }
    },

    'CallAgent':function () {
        console.log('inside  CallAgent');


        var message = this.event.request.intent.slots.MessageToAgent.value;

        var fmessage = "hello" +message;
        var agentNumber = '+17869253118';
        clientSmsAPI.sendSMS(fmessage,agentNumber).then(resp=>{
            this.emit(':tell','Message'+ resp);

        });

    },
    'FirstNameCapture':function () {
        console.log('inside FirstNameCapture');

        // get the solt value
        var firstName = this.event.request.intent.slots.USFirstName.value;
        if(firstName){
            this.attributes['firstName']=firstName;
            console.log('firstName',firstName);

            var alexaRespomse ="Hello " +firstName+ "! welcome to Voice Transamerica. If you already have Transamerica  product. Please say yes or No. ,’Tell me do you already have Transamerica product? ’";
            this.emit(':ask',alexaRespomse);

        }
        else{
            this.emit(':ask','Sorry I did not get your First Name can you please tell me your First Name by saying My First Name is, and then your First name.','please tell me your First Name by saying My First Name is, and then your First name.');

        }

    },

    'AMAZON.NoIntent': function() {

        console.log("inside no intent");
        var firstName = this.attributes['firstName'];

        var existingCustomer = this.attributes['existingCustomer'];
        console.log('existingCustomer',existingCustomer);

        if (typeof  existingCustomer=='undefined' || existingCustomer==''){
            this.attributes['existingCustomer']='N';

            var  alexaResponse= "No problem " + firstName+ " I can recommend you a product that best suits your need. But before that I need to collect some of your personal information  tell me your Last Name by saying My last Name is, and then your Last name.";
            this.emit(':ask',alexaResponse ,'Tell me your Last Name by saying My last Name is, and then your Last name.');

        }


    },

    'AMAZON.YesIntent': function() {
        this.handler.state= constants.states.LINK;

    },

    'LastNameCapture':function () {
        console.log('inside LastNameCapture');

        var firstName = this.attributes['firstName'];
        console.log('firstName',firstName);

        var usLastName = this.event.request.intent.slots.USLastName.value;
        console.log('usLastName',usLastName);

        if(usLastName){
            this.handler.state= constants.states.PERSONAL;
            this.attributes['userlastName']=usLastName;
            var alexaRespomse ="Hello " +firstName+ "! welcome to Voice Transamerica. If you already have Transamerica  product. Please say yes or No. ,’Tell me do you already have Transamerica product? ’";
            this.emit(':ask',alexaRespomse);

        }else {
            this.emit(':ask','Sorry I did not get your Last Name can you please tell me your Last Name by saying My Last Name is, and then your Last name.','tell me your Last Name by saying My Last Name is, and then your Last name.');

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
    'AMAZON.HelpIntent': function () {
        // State Automatically Saved with :tell
        var firstName = this.attributes['firstName'];
        if(firstName){

        }
    },
    'Unhandled': function () {
       this.emitWithState('AMAZON.HelpIntent');
    }


    /*
    'FirstNameCapture':function () {
            console.log('inside FirstNameCapture');

            // get the solt value
            var firstName = this.event.request.intent.slots.USFirstName.value;


            if(firstName){
                this.attributes['firstName']=firstName;
                console.log('firstName',firstName);
                var  alexaResponse= "Ok " + firstName+ " please tell me your Last Name by saying My last Name is, and then your Last name.";
                this.emit(':ask',alexaResponse ,'Tell me your Last Name by saying My last Name is, and then your Last name.');
            }
            else{
                this.emit(':ask','Sorry I did not get your First Name can you please tell me your First Name by saying My First Name is, and then your First name.','please tell me your First Name by saying My First Name is, and then your First name.');

            }

        },*/
});

module.exports=onboardingStateHandler;