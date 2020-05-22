const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var swaggerUI = require('swagger-ui-express');
var swaggerJsDoc = require('./node_modules/swagger-jsdoc');
const webpush = require('web-push');
fakeDatabase = [];
const PUBLIC_VAPID = "BGsbeNX09WnLFR1uOnzu2ITfk7Eaetrq_Io2npGJxgkSPBOOUgTNd7uZYxkp7Rmy8zUOtLcAFI9gmRSfbC9LTH4";
const PRIVATE_VAPID ="ZvUqFxWf9G2MJ2L1KhAn09ombtb-H8cEfal7S9dsCBo";
webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);
app.post('/subscription', (req, res) => {
    const subscription = req.body
    fakeDatabase.push(subscription)
  })
  
  app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
      notification: {
        title: 'New Notification',
        body: 'This is the body of the notification',
        icon: 'assets/icons/icon-512x512.png',
      },
    }
  
    const promises = []
    fakeDatabase.forEach(subscription => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      )
    })
    Promise.all(promises).then(() => res.sendStatus(200))
  })


const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Omniwyse Announcement API",
            description:"Announcements can be send and receive through the API ",
            contact:{
                name:"Kalyan Kumar Reddy.K"
            },
            servers:["http://localhost:3000"]
        }
    },
    apis:["server.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static('uploads'))
var db = require('./db');

const multer = require('multer');

// Filtering the image
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
// SET STORAGE FOR IMAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ 
      storage: storage ,
      fileFilter:fileFilter
    })




var logincontroller = require('./controllers/logincontroller');
var findAllUsers = require('./controllers/usercontroller');
var postAnnouncement = require('./controllers/announcement');
var tagsController = require('./controllers/tagscontroller');

// Routes

app.post('/login',logincontroller.login);
app.get('/users',verifyToken,findAllUsers.findAllUsers);
app.post('/announcements',verifyToken, upload.single('image'),postAnnouncement.announcement);
app.get('/announcements',verifyToken,postAnnouncement.findAnnouncement);
app.get('/announcements/:id',verifyToken,postAnnouncement.findAnnouncemetById);

app.get('/getannouncementbytags/:tags',verifyToken,postAnnouncement.findAnnouncemetByTags)

app.get('/userintags/:userid',verifyToken,tagsController.findUserInTags)

// function for verifying Token

function verifyToken(req,res,next){
    const barearHeader = req.headers['authorization'];

    if(typeof barearHeader != 'undefined'){

        const barear = barearHeader.split(' ');

        const barearToken = barear[1];

        req.token = barearToken;

        next();

    }else{
        res.sendStatus(403);
    }
}

app.listen(3000,function(){
    console.log("API running at port 3000");
})