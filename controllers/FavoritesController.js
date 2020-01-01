const FavoritePlace = require('../models/FavoritePlace')
const User = require('../models/User')
const Place  = require('../models/Place')
const helpers = require('./helpers')
const validParams = ['_place']

function find(req, res, next) {
    FavoritePlace.findById(req.params.id).then(fav => {
        req.mainObj = fav
        req.favorite = fav
        next()
    }).catch(next)
}

function index(req, res) {
    User.findOne({ '_id': req.user.id }).then(user => {
        user.favorites.then(favs => {
            res.json(favs)
        })
    }).catch(err => {
        res.json(err)
    })
}


function usersFavoritesinPlace(req, res) {
    Place.findOne({ slug: req.params.id })
        .then((place) => {
            place.usersplaces.then(favs => {
                res.json(favs)
            })
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
}


function create(req, res) {
    let params = helpers.paramsBuilder(validParams, req.body)
    params['_user'] = req.user.id

    FavoritePlace.create(params)
        .then(favorite => {
            res.json(favorite)
        }).catch(err => {
            res.status(422).json({ err })
        })

}


function destroy(req, res) {
    req.favorite.remove().then(fav => {
        res.json({})
    }).catch(err => {
        res.status(500).json({ err })
    })
}

module.exports = {
    index,
    create,
    find,
    destroy,
    usersFavoritesinPlace
}