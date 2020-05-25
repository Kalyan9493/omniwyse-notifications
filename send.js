var admin = require("firebase-admin");

var serviceAccount = require('./node_modules/firebase-admin/announcements-42d06-firebase-adminsdk-uu8o1-2164b24bb5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://announcements-42d06.firebaseio.com"
});

//module.exports.admin = admin