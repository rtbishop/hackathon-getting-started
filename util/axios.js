var config = require('../conf/config');
var axios = require('axios');

var instance = axios.create({
	baseURL: config.yslUrl,
	headers: {
		'Content-Type': 'application/json',
		'Api-Version': '1.1',
		'Accept-Encoding': 'application/gzip',
		'Cobrand-Name': config.cobrandName
	}
});

module.exports = instance;