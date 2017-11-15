const processMessage = require('../helpers/processMessage.js');

module.exports = (req, res) => {
	console.log(req.body);
	console.log(req.body === 'page');
	if (req.body.object === 'page') {
		req.body.entry.forEach(entry => {
			entry.messaging.forEach(event => {
				if (event.message && event.message.text) {
					processMessage(event);
				}
			});
		});
		res.status(200).end();
	}
};
