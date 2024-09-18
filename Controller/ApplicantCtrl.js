const express = require('express');
const Applicant = require('../Model/ApplicantsModel');


const newApplicant=async (req, res) => {
  try {
    const { name, email, profilePhoto } = req.body;
    const newApplicant = new Applicant({
      name,
      email,
      profilePhoto, 
    });
    await newApplicant.save();
    res.status(201).json({
      message: 'Applicant created successfully',
      applicant: newApplicant,
    });
  } 
  catch (error) {
    res.status(500).json({
      message: 'Error creating applicant',
      error: error.message,
    });
  }
}

const allApplicants=async(req,res)=>{
    try {
        const applicants = await Applicant.find({ approved: false });
        res.status(200).json(applicants);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching applicants', error });
      }
}

const approveApplicants=  async (req, res) => {
    const { applicantId } = req.body;
  
    try {
      const approvedApplicant = await Applicant.findByIdAndUpdate(applicantId, { approved: true }, { new: true });
      if (approvedApplicant) {
        res.status(200).json({ message: 'Applicant approved successfully', approvedApplicant });
      } else {
        res.status(404).json({ error: 'Applicant not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error approving applicant', error });
    }
  }


  const allAprovedApplicants= async(req,res)=>{
   
        try {
          const allAprovedApplicants = await Applicant.find({ approved: true });
          res.status(200).json(allAprovedApplicants);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching approved applicants', error });
        }
      
  }


module.exports = {newApplicant, allApplicants, approveApplicants, allAprovedApplicants};
