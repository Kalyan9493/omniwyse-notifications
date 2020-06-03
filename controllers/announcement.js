var Announcement = require('../models/announcements');
const jwt = require('jsonwebtoken');
var ScheduledAnnouncement = require('../models/scheduledAnnouncements')

exports.announcement = function(req,res){

    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
            console.log(err);
        }else{
            if(req.file){
                if(req.body.scheduledTime){
                    var image = req.file.path;
                    console.log(image);
                    var url = image.split('/');
                    var imageurl = url[1]; 
                    var tag = JSON.parse(req.body.tags);
                    ScheduledAnnouncement.insertMany({title:req.body.title,description:req.body.description,details: req.body.details,link:req.body.link,imageURL : imageurl,tags:tag,date:Date(),scheduledDate:req.body.scheduledTime,isScheduled:true},function(err,data){
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal server error ")
                        }else{
                            res.send(data);
                        }
                    });

                }else{
                    var image = req.file.path;
                    var url = image.split('/');
                    console.log(image)
                    var imageurl =url[1]; 
                    var tag = JSON.parse(req.body.tags);
                    console.log(req.body.scheduledTime);
                    Announcement.insertMany({title:req.body.title,description:req.body.description,details: req.body.details,link:req.body.link,imageURL : imageurl,tags:tag,date:Date(),isScheduled:false},function(err,data){
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal server error ")
                        }else{
                            res.send(data);
                        }
                    });

                }
               

            }else{
                if(req.body.scheduledTime){
                    var tag = JSON.parse(req.body.tags);
                    console.log(req.body.scheduledTime);
                    ScheduledAnnouncement.insertMany({title:req.body.title,description:req.body.description,details: req.body.details,link:req.body.link,tags:tag,date:Date(),scheduledDate:req.body.scheduledTime,isScheduled:true,imageURL:null},function(err,data){
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal server error ")
                        }else{
                            res.send(data);
                        }
                    });

                }else{
                    var tag = JSON.parse(req.body.tags);
                    Announcement.insertMany({title:req.body.title,description:req.body.description,details: req.body.details,link:req.body.link,tags:tag,date:Date(),imageURL:null,isScheduled:false},function(err,data){
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal server error ")
                        }else{
                            res.send(data);
                        }
                    });

                }
               
            }
           

        }
    });

   
}

exports.findAnnouncement = function(req,res){
    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
            console.log(err);
        }else{
  
            Announcement.find().sort({date:-1}).exec(function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }else{

                    res.send(data);
        
                }
            });

        }
    })
}

exports.findAnnouncemetById =  function(req,res){
    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
            console.log(err);
        }else{
  
  
    Announcement.findById(req.params.id,(function(err,data){
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            //const imgArray= data.image.map(element => element._id);
            res.send(data);

        }
    }));
}
    })

}


exports.findAnnouncemetByTags =  function(req,res){
    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
            console.log(err);
        }else{
            var tag = JSON.parse(req.params.tags);
            var currentTime = new Date();
            console.log(req.params.tags);
            
    Announcement.find({tags:{$in : tag}}).sort({date:-1}).exec(function(err,data){
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            //const imgArray= data.image.map(element => element._id);
            res.send(data);

        }
    });
}
    })

}
