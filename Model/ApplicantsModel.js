const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  profilePhoto: {
    type: String,
    required: false,
    default: ''
  },
  approved: {
    type: Boolean,
    default: false
  },
}, 

{
  timestamps: true
});

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;
