const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const SERVER_PORT = 3000;

const verificationController = require('./controllers/verification.js');
const messageWebhookController = require('./controllers/messageWebhook.js');
const imageSearchController = require('./controllers/imageSearch.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.get('/', verificationController);

app.get('/', (req, res) => {
	if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
		res.status(200).send(req.query['hub.challenge']);
	} else {
		res.status('403').end();
	}
});

app.post('/', messageWebhookController);
app.post('/image-search', imageSearchController);

/*
app.post('/', (req, res) => {
	console.log(req.body);
	if (req.body.object == 'page') {
		req.body.entry.forEach((entry) => {
			entry.messaging.forEach((event) => {
				if (event.message && event.message.text) {
					sendMessage(event);
				}
			});
		});
	}
});
*/
app.get('/hello', function(req, res) {
	res.send('Hello!');
})


app.listen(SERVER_PORT, () => console.log('Webhoook server is listening port ' + SERVER_PORT));
