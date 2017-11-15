module.exports = (req, res) => {
	const hubChallenge = req.query['hub.challenge'];

	const hubMode = req.query['hub.mode'];
	const verifyTokenMatches = (req.query['hub.verify_token'] === 'tuxedo_cat');

	if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
		console.log('it works');
		res.status(200).send(req.query['hub.mode']);
	} else {
		console.log('its forbidden,but as long as it works')
		res.status(403).end();
	}
};
