var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var { JWT } = require('../util/JWT');
var config = require('../conf/config');
var creds = require('../conf/creds');
var pK = fs.readFileSync(path.join(__dirname, '/../', config.jwtKeyPath), 'utf8');

// This renders the login page
router.get('/', function(req, res, next) {
	res.render('login');
});

// This handles submitting the login page
router.post('/', function(req, res, next) {
	if (creds.credentials[req.body.username] === req.body.password) {
		var jwt = new JWT(pK, config.cobrandName, config.issuerId);
		var userToken = jwt.getToken(req.body.username);
		res.cookie('userToken', userToken, { maxAge: 28800000, httpOnly: true, sameSite: true });
		res.render('fastlink', { 'fastLinkURL': config.nodeUrl, 'jwtToken': userToken, 'guid': req.body.username, 'isLoggedIn': true });
	} else {
		res.render('login', { 'error': true });
	}
});

module.exports = router;
