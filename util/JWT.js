var r = require('jsrsasign');

class JWT {

	constructor(privateKey, cobrandName, issuerId) {
		this.privateKey = privateKey;
		this.cobrandName = cobrandName;
		this.issuerId = issuerId;
	}

	getToken(guid) {
		var jws = r.jws.JWS();
		var payload = {};
		var header = {};
		var token;
		var seconds = Math.floor(Date.now() / 1000);

		payload.iss = this.issuerId;
		payload.iat = seconds;
		payload.exp = seconds + 900;
		payload.cobrandName = this.cobrandName;
		if (guid) payload.sub = guid;

		header.alg = "RS512";
		header.typ = "JWT";
		var pKey = r.KEYUTIL.getKey(this.privateKey);
		var token = r.jws.JWS.sign("RS512", JSON.stringify(header), JSON.stringify(payload), pKey);
		return token;
	}

	getBasicAuthToken(guid) {
		var jws = r.jws.JWS();
		var payload = {};
		var header = {};
		var token;
		var seconds = Math.floor(Date.now() / 1000);

		payload.sub = guid;
		payload.iat = seconds;
		payload.exp = seconds + 7200;

		header.alg = "RS512";
		header.typ = "JWT";
		var pKey = r.KEYUTIL.getKey(this.privateKey);
		var token = r.jws.JWS.sign("RS512", JSON.stringify(header), JSON.stringify(payload), pKey);
		return token;
	}

}

module.exports = {
	JWT
};