var ScheduledAnnouncements = require('../models/scheduledAnnouncements');
var mongo = require('mongoose');

exports.getScheduledAnnouncements = function(req,res){
  
        var currentDate = new Date();
    ScheduledAnnouncements.find({scheduledDate:{$gt:currentDate}}).sort({scheduledDate:-1}).exec(function(err,data){
        if(err){
            console.error(err);
        }else{
            res.send(data);
        }
    })

}

exports.findScheduledAnnouncementById = function(req,res){
   
    ScheduledAnnouncements.findById(req.params.id,function(err,data){
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }else{
            res.send(data);
        }
    });

}


exports.updateScheduledAnnouncement = function(req,res){
            var id = {_id:req.params.id};
            if(req.file){
                if(req.body.scheduledTime){
                    var image = req.file.path;
                    console.log(image);
                    var url = image.split('\\');
                    var imageurl = url[1]; 
                    var updatedValues = {$set:{title:req.body.title,description:req.body.description,details: req.body.details,link:req.body.link,imageURL : imageurl,tags:req.body.tags,date:Date(),scheduledDate:req.body.scheduledTime,isScheduled:true}};
                }
            }else{
                
                updatedValues = {$set:{title:req.body.title,description:req.body.description,details: req.body.details,link:req.body.link,tags:req.body.tags,date:Date(),scheduledDate:req.body.scheduledTime,isScheduled:true}};
            }
            ScheduledAnnouncements.updateOne(id,updatedValues,function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send("Update Failed");
                }else{
                    res.send(data);
                }
            })
}

exports.deleteScheduledAnnouncement = function(req,res){
    
    ScheduledAnnouncements.findByIdAndDelete(req.params.id,function(err,data){
        if(err){
            console.log(err);
            res.status(500).send("Announcement Cannot Be Deleted");
        }else{
            res.send(data);
        }
    })
}