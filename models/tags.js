const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var tags=new Schema({

    employees:[{type:ObjectId, ref:'User'}],
    javaTeam:[{type:ObjectId, ref:'User'}],
    javascriptTeam:[{type:ObjectId, ref:'User'}]

});
module.exports = mongoose.model("Tags",tags);