var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var token = new Schema({
    token : String
})

module.exports = mongoose.model("Token",token);