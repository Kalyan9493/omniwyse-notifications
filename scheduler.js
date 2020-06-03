const cron = require('node-cron');

const ScheduledAnnouncements = require('./models/scheduledAnnouncements');
const Announcements = require('./models/announcements');

exports.scheduler = function(){ cron.schedule("* * * * *",function(){
    console.log("job runnning .....");

    var currentTime = new Date();
    ScheduledAnnouncements.find({scheduledDate:{$lte:currentTime}},function(err,data){
        if(err){
            console.log(err);
        }else{
            if(data.length>0){
                var dataString = JSON.stringify(data);
                var dataObject = JSON.parse(dataString);
                console.log("Scheduled Announcement Triggered")
                dataObject.forEach(element => {
                    Announcements.insertMany({title:element.title,description:element.description,details:element.details,link:element.link,imageURL:element.imageURL,tags:element.tags,isScheduled:true,date:element.scheduledDate},function(err,data1){
                        if(err){
                            console.log(err);
                        }else{
                            
                            console.log(data1);
                            console.log("Data Inserted");
                            ScheduledAnnouncements.findByIdAndDelete(element._id,function(err,data2){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log(data2)
                                    console.log("Data Deleted And Added To Announcement");
                                }
                            });
                        }
                    });
                    
                });
       
            }
        }

    });



})

}

       