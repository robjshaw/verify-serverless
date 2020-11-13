// exports.handler = function(context, event, callback) {

//     const client = context.getTwilioClient();

// 	console.log(event);
	
// 	client.verify.services(process.env.VERIFY_SERVICE)
// 		.verificationChecks
// 		.create ( {to: event.to, code: event.code})
// 		.then(verification_check => {
// 			console.log(verification_check.status);
// 			callback(null, verification_check);
// 		})
// 		.catch( err => {
// 			console.log(err);
// 			callback(err);
// 		});
// };



/**
 *  Check Verification
 *
 *  This Function shows you how to check a verification token for Twilio Verify.
 *
 *  Pre-requisites
 *  - Create a Verify Service (https://www.twilio.com/console/verify/services)
 *  - Add VERIFY_SERVICE_SID from above to your Environment Variables (https://www.twilio.com/console/functions/configure)
 *  - Enable ACCOUNT_SID and AUTH_TOKEN in your functions configuration (https://www.twilio.com/console/functions/configure)
 *
 *
 *  Returns JSON:
 *  {
 *    "success": boolean,
 *    "message": string
 *  }
 */

exports.handler = function(context, event, callback) {
	const response = new Twilio.Response();
	response.appendHeader('Content-Type', 'application/json');
	
	// uncomment to support CORS
	// response.appendHeader('Access-Control-Allow-Origin', '*');
	// response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	// response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  
	if (typeof event.to === 'undefined' ||
		typeof event.code === 'undefined') {
	  response.setBody({
		"success": false,
		"message": "Missing parameter."
	  })
	  response.setStatusCode(400);
	  return callback(null, response);
	}
  
	const client = context.getTwilioClient();
	const service = context.VERIFY_SERVICE;
	const to = event.to;
	const code = event.code;
  
	client.verify.services(service)
	  .verificationChecks
	  .create({
		to: to,
		code: code
	  })
	  .then(check => {
		if (check.status === "approved") {
		  response.setStatusCode(200);
		  response.setBody({
			"success": true,
			"message": "Verification success."
		  });
		  callback(null, response);
		} else {
		  response.setStatusCode(401);
		  response.setBody({
			"success": false,
			"message": "Incorrect token."
		  });
		  callback(null, response);
		}
	  })
	  .catch(error => {
		console.log(error);
		response.setStatusCode(error.status);
		response.setBody({
		  success: false,
		  message: error.message
		});
		callback(null, response);
	  });
  };