const express=require('express')
const { newApplicant, allApplicants , approveApplicants, allAprovedApplicants} = require('../Controller/ApplicantCtrl')
const router=express.Router()

router.post('/newApplicant',newApplicant)
router.get('/allApplicants',allApplicants)
router.post('/approveApplicants',approveApplicants)
router.get('/allAprovedApplicants',allAprovedApplicants)

module.exports=router