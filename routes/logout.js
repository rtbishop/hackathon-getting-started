var express = require('express');
var router = express.Router();

// Log out the user
router.get('/', function(req, res, next) {
	if (req.cookies.userToken) {
		res.clearCookie('userToken', { path: '/' })
	}
	res.redirect('/');
});

module.exports = router;