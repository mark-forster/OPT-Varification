const express = require('express')
const router= express.Router()
const authController = require('../controllers/auth.controller')
router.post('/login', authController.Login )
router.post('/varify', authController.varifyOtp)
module.exports = router;