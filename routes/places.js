const express = require('express')

let router = express.Router()

const placeController = require('../controllers/PlaceController')

router.route('/')
    .get(placeController.index)
    .post(placeController.multerMiddleware(),placeController.create, placeController.saveImage)

router.route('/:id')
    .get(placeController.find, placeController.show)
    .put(placeController.find, placeController.update)
    .delete(placeController.find, placeController.destroy)

module.exports = router