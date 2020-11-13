exports.handler = function(context, event, callback) {
    const got = require('got');
    const response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');
    
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (typeof event.email === 'undefined') {
        response.setBody({
        "success": false,
        "message": "Please Define Email"
        })
        response.setStatusCode(400);
        return callback(null, response);
    }
    
    console.log(event.email);

    got
    .post('https://api.sendgrid.com/v3/validations/email', {
        headers: {
            'authorization': `Bearer ${context.SG_EMAIL_VERIFY_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": event.email})
        })
        .then(resp => {
            console.log('Body');
            console.log(resp.body);
            console.log(resp.headers);  
            response.setBody(resp.body);
            callback(null, response);
        })
        .catch(err => {
            response.setBody(err);
            callback(response);
            });
    
    };