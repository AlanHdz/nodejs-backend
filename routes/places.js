const express = require('express')

let router = express.Router()

const placeController = require('../controllers/PlaceController')
const authenticateOwner = require('../middlewares/authenticateOwner')

router.route('/')
    .get(placeController.index)
    .post(placeController.multerMiddleware(),placeController.create, placeController.saveImage)

router.route('/:id')
    .get(placeController.find, placeController.show)
    .put(placeController.find, authenticateOwner ,placeController.update)
    .delete(placeController.find, authenticateOwner ,placeController.destroy)

module.exports = router