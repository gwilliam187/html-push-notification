import express from 'express';
import webPush from 'web-push';
import bodyParser from 'body-parser';
import expressStatic from 'express-static';
import fs from 'fs';

const publicVapidKey = 'BOjMUvVojL2dVyhTZ1qmkqcZtwVDAlg4EyCboqQT8chu2djD9HfOaO-EKtLGv453LcynpR1amk7dan7kZLXZdJ8';
const privateVapidKey = 'hH1SQcZh82zbehyk3IPJNeRzhVz6_J3uxarq6hbLFtQ';
webPush.setVapidDetails('mailto:username@user123.com', publicVapidKey, privateVapidKey);

const app = express();

app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
	const subscription = req.body;

	fs.writeFile('./sub.json', JSON.stringify(subscription), err => {

	})

	res.status(201).json({});
});

app.post('/notify', (req, res) => {
	const payload = JSON.stringify({ title: req.body.title, content: req.body.content });
	res.status(201).json({});

	let subscription = fs.readFileSync('./sub.json');
	subscription = JSON.parse(subscription);

	webPush.sendNotification(subscription, payload).catch(err => {
		console.error(err);
	})
})

app.use(expressStatic('./'));

app.listen(3000, () => {
	console.log('Listening on port 3000');
})