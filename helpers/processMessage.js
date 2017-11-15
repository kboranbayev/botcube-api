const FACEBOOK_ACCESS_TOKEN = 'EAAHWUyjO420BAAQlOTjJFSTJQpyysT9LKoWUe3iVlhgXdNnaVSBqCOibBgL3UP6ZBsyrk5X7w4GodeYCXkp93kQDoK83ujiZCQZBHfEjUgdK6ggZBNlsilFDQ8phZCZBcpuXFqg4y5UP40GIvN2HstyApZAqDdoZCNZBZCwfBjQZBiM28aBBq3Czo5k';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const API_AI_TOKEN = 'ae648709ec5944709197c744fd08d547';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const request = require('request');

const sendTextMessage = (senderId, text) => {
	console.log('Sending text');
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: FACEBOOK_ACCESS_TOKEN },
          	method: 'POST',
            	json: {
               		recipient: { id: senderId },
                        message: { text },
                }

       	})
}

const sendImage = (senderId, imageUri) => {
	console.log('Sending image');
	console.log('Image Uri ' + imageUri);
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: FACEBOOK_ACCESS_TOKEN },
                method: 'POST',
                json: {
                        recipient: { id: senderId },
                        message: {
				attachment: {
					type: 'image',
					payload: { url: imageUri }
				}
			},
                }

	})
}


module.exports = (event) => {
	const senderId = event.sender.id;
	const message = event.message.text;
	const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'botcube-b7e3e'});


	apiaiSession.on('response', (response) => {
		const result = response.result.fulfillment.speech;
		console.log('Fulfillment speech result ' + result);
		console.log('IntentName ' + response.result.metadata.intentName);
		if (response.result.metadata.intentName === 'images.search') {
			sendImage(senderId, result);
		} else {
			sendTextMessage(senderId, result);
		}
	});

	apiaiSession.on('error', error => console.log(error));
	apiaiSession.end();
};
