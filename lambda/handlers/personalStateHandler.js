'use strict';
var Alexa = require('alexa-sdk');
var constants = require('../constants/constants');

var personalStateHandler=Alexa.CreateStateHandler(constants.states.PERSONAL,{

    'AMAZON.YesIntent': function() {
        this.emit(':ask', 'Great! ' + 'I can link your Transamerica policy so you can track it anytime. Tell me your Policy number by sayinng  My policy number is and  then your policy number', 'Tell me your Policy number by sayinng  My policy number is and  then your policy number');
    },

    'AMAZON.NoIntent': function() {

        console.log("inside no intent");
        var firstName = this.attributes['firstName'];

        var existingCustomer = this.attributes['existingCustomer'];
        console.log('existingCustomer',existingCustomer);

        if (typeof  existingCustomer=='undefined' || existingCustomer==''){
            this.attributes['existingCustomer']='N';
            this.emit(':ask', 'No problem, I can recommend you a product that best suits your need. But before that I need to collect some of your personal information. Tell me your age by saying my age is and then your age.', 'Tell me your age by saying: My age is , and then your age.');
        }
        else if(typeof existingCustomer=='N' || existingCustomer !=''){

            var smoker = this.attributes['smoker'];
            console.log('inside smoker',smoker);

            if(typeof smoker=='undefined' || smoker==''){
                this.attributes['smoker']='N';
                var alexa = "Great ,"+firstName+"! tell me Do you consume alcohol? say Yes or No.,'tell me Do you consume Alcohol? say Yes or No.'";
                this.emit(':ask',alexa);
            }
            else if(typeof smoker=='N' || smoker !=''){
                var consumeAlcohol = this.attributes['consumeAlcohol'];
                if(typeof consumeAlcohol=='undefined' ||  consumeAlcohol ==''){
                    console.log('inside consumeAlcohol');
                    this.attributes['consumeAlcohol']='N';
                    this.handler.state= constants.states.LINK;

                    // product recomondation
                    // this.emit(':ask',alexa);
                    this.emit(':tell','Recommandation of product is not yet implemented');
                }
                else if(typeof consumeAlcohol=='N' || consumeAlcohol !=''){

                    this.emit(':tell',"Good bye"+ firstName);

                }
                else {
                    var alexaRespomse ="Sorry " +firstName+ "! tell me Do you consume alcohol? say Yes or No.,'tell me Do you consume Alcohol? say Yes or No.’";
                    this.emit(':ask',alexaRespomse);
                }
            }else {

                var alexaRespomse ="Sorry " +firstName+ "tell me Do you smoke? say Yes or No.,'tell me Do you smoke? say Yes or No.’";
                this.emit(':ask',alexaRespomse);
            }

        }else{

            var alexaRespomse ="Sorry " +firstName+ "I did not get that If you already have Transamerica  product. Please say yes or No. ,’Tell me do you already have Transamerica product? ’";
            this.emit(':ask',alexaRespomse);

        }
    },

});