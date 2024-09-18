const mongoose= require('mongoose')

const newsSchema = new mongoose.Schema({
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
    newsImage:{
        type:String
    },

}, 
{
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);