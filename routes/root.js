const express = require('express')

// controller functions
const rootController = require('../controllers/root')

const router = express.Router()

// login route
router.get('/', rootController.getHome)

module.exports = router
