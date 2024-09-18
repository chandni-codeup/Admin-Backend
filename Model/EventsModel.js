const mongoose= require('mongoose')

const eventSchema = new mongoose.Schema({
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
    eventImage:{
        type:String
    }
}, 
{
  timestamps: true
});

module.exports = mongoose.model('Events', eventSchema);