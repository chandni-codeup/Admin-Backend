const express=require('express')
const router=express.Router()
const {secureEndpoint, verifyToken} = require('../Controller/AuthCtrl')
// const { googleLogin } = require('../Controller/AuthCtrl')

// router.get('/google',googleLogin)
router.post('/secure-endpoint',secureEndpoint)
router.get('/verify-token',verifyToken)

module.exports=router