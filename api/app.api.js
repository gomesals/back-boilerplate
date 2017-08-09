(function() {
	'use strict';
	const App = require('../models/app.model').App;
	const express = require('express');
	const router = express.Router();
	router.route('/').get(_get).post(_post);
	router.route('/:id').get(getItem).put(_put).delete(_delete);

	function _get(req, res) {
		App.find({}, (err, data) => {
			if (err) throw err;
			if (data) res.json(data);
		});
	}

	function _post(req, res) {
		const data = req.body.data;
		let values = {
		};
		
		App.create(values, (err, dataLines) => {
			if (err) throw err;
		});
	
		res.sendStatus(200);
	}

	function getItem(req, res) {
		App.findOne({
			'_id': req.params.id
		}, (err, data) => {
			if (err) throw err;
			if (data) {
				res.json(data);
			} else {
				res.sendStatus(404);
			}
		});
	}

	function _put(req, res) {
		res.send('put request');
	}

	function _delete(req, res) {
		App.remove({
			'_id': req.params.id
		}, (err, data) => {
			if (err) throw err;
			if (data.result.n) {
				res.sendStatus(200);
			} else {
				res.sendStatus(204);
			}
		});
	}

	module.exports = router;
})();
