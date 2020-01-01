const helpers = require('./helpers')

const validParams = ['origins', 'name']

const Application = require('../models/Application')


function find(req, res, next) {
    Application.findById(req.params.id).then(application => {
        req.mainObj = application
        req.application = application
        next()
    }).catch(next)
}

function index(req, res) {

}


function create(req, res) {
    let params = helpers.paramsBuilder(validParams, req.body)
    Application.create(params)
        .then(application => {
            res.json(application)
        }).catch(err => {
            res.status(422).json({ err })
        })

}

function destroy(req, res) {
    req.application.remove().then(application => {
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
}