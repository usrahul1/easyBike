const admin = require("firebase-admin");

var serviceAccount = require("./easybike-rahul-firebase-adminsdk-fbsvc-39d55862f2.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
