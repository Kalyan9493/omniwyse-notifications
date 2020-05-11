const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var announcement=new Schema({
    title:String,
    description:String,
    details:String,
    link:String,
    imageURL:String,
    tags:[{type:String, ref:'Tags'}],
    date:Date

});
module.exports = mongoose.model("Announcement",announcement);