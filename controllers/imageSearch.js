
const GETTY_IMAGES_KEY = 'zk4d26qcd5khu7q5nauen54t';
const request = require('request');

module.exports = (req, res) => {
	if (req.body.result.action === 'image') {
		const imageName = req.body.result.parameters['image_name'];
		//const apiUrl = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=' + imageName;
		const apiUrl = 'https://api.gettyimages.com/v3/search/images/creative?phrase=' + imageName;
		//console.log('req.body.result.parameters' + JSON.parse(req.body.result.parameters));
		request ({
			uri: apiUrl,
			methods: 'GET',
			headers: {'Api-Key': GETTY_IMAGES_KEY}
		}, (err, response, body) => {
			if (err) {
				console.err(err);
			} else {
				const imageUri = JSON.parse(body).images[0].display_sizes[0].uri;
				//const imageUri = JSON.parse(body).images[0];
				console.log('JSON.parse(body) = ' + JSON.parse(body));
				console.log('imageUri = ' + imageUri);
				return res.json({
					speech: imageUri,
					displayText: imageUri,
					source: 'image_name'
				});
			}
		})
	}
}
