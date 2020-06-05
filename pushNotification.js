
var Token = require('./models/token');
var admin = require("firebase-admin");

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };


var serviceAccount = require('./node_modules/firebase-admin/announcements-42d06-firebase-adminsdk-uu8o1-2164b24bb5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://announcements-42d06.firebaseio.com"
});

exports.pushNotification = function(payload){
    Token.find({},function(err,tokens){
        if(err){
            console.log(err);
        }else{
            var tokenList = [];
            tokens.forEach(element =>{
                tokenList.push(element.token);
            })
            console.log(tokenList);
            console.log(payload)
            const options =  notification_options;
            console.log(payload);
            
              admin.messaging().sendToDevice(tokenList, payload, options)
              .then( response => {
        
               console.log("Notification sent successfully");
               
              })
              .catch( error => {
                  console.log(error);
              });


        }
    })
   

}