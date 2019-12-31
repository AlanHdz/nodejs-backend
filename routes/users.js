const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController')
const sessionController = require('../controllers/SessionController')


router.route('/')
    .post(usersController.create, 
        sessionController.generateToken, 
        sessionController.sendToken)
    .get(usersController.myPlaces)
module.exports = router;
