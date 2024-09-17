const mongoose= require('mongoose')

const noticeSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    expiry:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:String
    },
    noticeImage:{
        type:String
    }
}, 
{
  timestamps: true
});

module.exports = mongoose.model('Notice', noticeSchema);