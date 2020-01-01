const express = require('express')

let router = express.Router()
const authenticateOwner = require('../middlewares/authenticateOwner')
const visitsController = require('../controllers/VisitsController')
const placesController = require('../controllers/PlaceController')


router.route('/:id/visits')
    .get(placesController.find, visitsController.index)
    .post(placesController.find,visitsController.create)


router.route('/:id/visits/:visit_id')
    .delete(placesController.find,visitsController.find, authenticateOwner, visitsController.destroy)

module.exports = router