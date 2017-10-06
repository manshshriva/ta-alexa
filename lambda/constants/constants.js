var constants = Object.freeze({

// set you app id
    appId:'',
    dynamoDBTableName:'alexaCustomer360',
    // skill states
    states:{
        ONBOARDING:'',
        PERSONAL:'_PERSONAL',
        LINK: '_LINK'
    }
});
module.exports= constants;