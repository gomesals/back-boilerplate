(function() {
	'use strict';
	const mongoose = require('mongoose');
	const appSchema = new mongoose.Schema({
	});
	var App = mongoose.model('App', appSchema, 'app');
	module.exports = {
		App: App
	};
})();