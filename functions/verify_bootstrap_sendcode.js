exports.handler = function(context, event, callback) {
    const client = context.getTwilioClient();
    
    console.log(event);
    
    client.verify.services(process.env.VERIFY_SERVICE)
       .verifications
       .create({    to: event.to,
                    locale : event.locale,
                    channel: event.channel
               })
       .then(verification => callback(null,verification));
  };