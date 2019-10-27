var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');

var config = require('../conf/config');
var publicKey = fs.readFileSync(path.join(__dirname, '/../', config.publicKeyPath));

module.exports = (req, res, next) => {
	console.log('Cookies: ', req.cookies)
	var userToken = req.cookies.userToken;

	try {
		var decodedToken = jwt.verify(userToken, publicKey);
		next();
	} catch (e) {
		res.redirect('/logout');
	}
};
