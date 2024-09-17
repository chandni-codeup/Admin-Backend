const mongoose = require('mongoose'); 

var adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePhoto:{
        type:String
    }
});

module.exports = mongoose.model('Admin', adminSchema);