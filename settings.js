(function() {
	'use strict';
	const express = require('express');
	const bodyParser = require('body-parser');
	const session = require('express-session');
	const moment = require('moment');
	const cookieParser = require('cookie-parser');
	const compression = require('compression');
	const mongoose = require('mongoose');
	const mongodbUri = process.env.MONGO;
	const options = {
		server: {
			socketOptions: {
				keepAlive: 300000,
				connectTimeoutMS: 30000
			}
		},
		replset: {
			socketOptions: {
				keepAlive: 300000,
				connectTimeoutMS: 30000
			}
		},
	};
	module.exports = (app) => {
		// Express
		app.use(session({
			secret: 'Random',
			saveUninitialized: true,
			resave: true
		}));
		app.use(compression());
		app.use(cookieParser());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(express.static('./public'));
		app.use((req, res, next) => {
			if (req.session.profile) {
				app.locals.level = req.session.profile.level;
			}
			return next();
		});
		app.set('view engine', 'pug');
		app.locals.Site = {
			title: 'Acabot',
			base: process.env.BASE
		};
		// Mongoose
		mongoose.connect(mongodbUri, options);
		mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', connected);
		mongoose.connection.on('error', errConenection);
		mongoose.connection.on('disconnected', disconnected);
		process.on('SIGINT', function() {
			mongoose.connection.close(closedByApp);
		});

		function connected() {
			console.log('Database connected: ' + moment().format('DD/MM/YYYY HH:mm'));
		}

		function errConenection(err) {
			console.log('Database connection error: ' + moment().format('DD/MM/YYYY HH:mm'));
			console.log(err);
		}

		function disconnected() {
			console.log('Mongoose disconnected: ' + moment().format('DD/MM/YYYY HH:mm'));
		}

		function closedByApp() {
			console.log('Mongoose connection disconnected through app termination: ' + moment().format('DD/MM/YYYY HH:mm'));
			process.exit(0);
		}
	};
})();
