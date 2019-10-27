var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var axios = require('../util/axios');

router.get('/', function(req, res, next) {
	axios.get('/accounts', {
		headers: {
			'Authorization': 'Bearer '+req.cookies.userToken
		}
	})
	.then(resp => {
		console.log(JSON.stringify(resp.data));
		var yodleeAccounts = resp.data.account;
		res.render('data', { 'accounts': yodleeAccounts });
	})
	.catch(err => {
		console.log(JSON.stringify(err.response.data));
		res.send('Error encountered, check console');
	})
});

module.exports = router;
