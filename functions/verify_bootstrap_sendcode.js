exports.handler = function(context, event, callback) {
    const client = context.getTwilioClient();

    const protocol = (context.DOMAIN_NAME.startsWith('localhost:') ? 'http' : 'https')
    const callback_url = `${protocol}://${context.DOMAIN_NAME}${context.PATH.substr(0, context.PATH.lastIndexOf('/'))}/verify.html`
    
    console.log(event);
    
    if (event.channel == 'email') {
     client.verify.services(process.env.VERIFY_SERVICE)
     .verifications
     .create({    to: event.to,
                  locale : event.locale,
                  channel: event.channel,
                  channelConfiguration: {
                    substitutions: { // used in email template
                      email: event.to,
                      callback_url: callback_url
                    }
                  }
             })
     .then(verification => callback(null,verification))
     .catch( err => {
        console.log(err);
        callback(err);
   });
    } else {
     client.verify.services(process.env.VERIFY_SERVICE)
     .verifications
     .create({    to: event.to,
                  locale : event.locale,
                  channel: event.channel
             })
     .then(verification => callback(null,verification))
     .catch( err => {
        console.log(err);
        callback(err);
   });
    }


  };