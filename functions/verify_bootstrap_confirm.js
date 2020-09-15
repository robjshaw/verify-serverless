exports.handler = function(context, event, callback) {

    const client = context.getTwilioClient();

	client.verify.services(process.env.VERIFY_SERVICE)
		.verificationChecks
		.create ( {to: event.to, code: event.code})
		.then(verification_check => {
			console.log(verification_check.status);
			callback(null, verification_check);
		});
};