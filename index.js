(function() {
	'use strict';
	require('dotenv').load();
	const express = require('express');
	const app = express();
	// ROUTES FILES
	const PAGE = {
		home: require('./routes/home.route'),
	};
	// API
	const API = {
		app: require('./api/app.api')
	};
	// APP SETTINGS
	require('./settings')(app);
	// ROUTES
	app.use('/', PAGE.home);
	// API
	app.use('/api/app', API.app);
	app.all('*', (req, res) => {
		res.sendStatus(404);
	});
	// APP SERVER
	app.listen((process.env.PORT || 5000), () => {
		console.log('Server started at port: ', (process.env.port || 5000));
	});
})();
