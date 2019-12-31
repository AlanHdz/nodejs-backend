const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController')

/* GET users listing. */
router.route('/')
  .post(usersController.create)
module.exports = router;
