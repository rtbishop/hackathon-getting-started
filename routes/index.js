var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var { JWT } = require('../util/JWT');
var config = require('../conf/config');
var creds = require('../conf/creds');
var pK = fs.readFileSync(path.join(__dirname, '/../', config.jwtKeyPath), 'utf8');

// Displays home page
router.get('/', function(req, res, next) {
	if (req.cookies.userToken) {
		res.render('fastlink', { 'fastLinkURL': config.nodeUrl, 'jwtToken': req.cookies.userToken, 'isLoggedIn': true });
	} else {
		res.render('login');
	}
});

// This handles submitting the login page
router.post('/', function(req, res, next) {
	if (creds.credentials[req.body.username] === req.body.password) {
		var jwt = new JWT(pK, config.cobrandName, config.issuerId);
		var userToken = jwt.getToken(req.body.username);
		res.cookie('userToken', userToken, { maxAge: 28800000, httpOnly: true, sameSite: true });
		res.render('fastlink', { 'fastLinkURL': config.nodeUrl, 'jwtToken': userToken, 'isLoggedIn': true });
	} else {
		res.render('login', { 'error': true });
	}
});

module.exports = router;
