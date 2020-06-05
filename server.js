const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var swaggerUI = require('swagger-ui-express');
var swaggerJsDoc = require('./node_modules/swagger-jsdoc');
var webpush = require('web-push');
var path = require('path');
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Omniwyse Announcement API",
            description:"Announcements can be send and receive through the API ",
            contact:{
                name:"Kalyan Kumar Reddy.K"
            },
            servers:["http://127.0.0.1:3000"]
        }
    },
    apis:["server.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

var router = express.Router();
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
var deviceTokenController = require('./controllers/tokenController');
var scheduledAnnouncementController = require('./controllers/scheduledAnnouncement');

// Routes

app.post('/login',logincontroller.login);
app.get('/users',verifyToken,findAllUsers.findAllUsers);
app.post('/announcements',verifyToken, upload.single('image'),postAnnouncement.announcement);
app.get('/announcements',verifyToken,postAnnouncement.findAnnouncement);
app.get('/announcements/:id',verifyToken,postAnnouncement.findAnnouncemetById);

app.get('/getannouncementbytags/:tags',verifyToken,postAnnouncement.findAnnouncemetByTags)

app.get('/userintags/:userid',verifyToken,tagsController.findUserInTags)
app.post('/devicetoken',deviceTokenController.deviceTokens);
app.get('/devicetoken',deviceTokenController.getTokens);

app.get('/scheduledannouncement',scheduledAnnouncementController.getScheduledAnnouncements);
app.get('/scheduledannouncement/:id',scheduledAnnouncementController.findScheduledAnnouncementById);
app.delete('/scheduledannouncement/:id',scheduledAnnouncementController.deleteScheduledAnnouncement);
app.put('/scheduledannouncement/:id',scheduledAnnouncementController.updateScheduledAnnouncement);
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

// Scheduler for scheduled announcement

var scheduler = require('./scheduler');
scheduler.scheduler()

app.listen(3000,function(){
    console.log("API running at port 3000");
})