const User = require('../models/User')
const helpers = require('./helpers')

const validParams = ['email', 'name', 'password']

function create(req, res, next) {
    let params = helpers.paramsBuilder(validParams, req.body)
    User.create(params).then(user => {
        req.user = user
        next()
        //res.json(user)
    }).catch(error => {
        console.log(error)
        res.status(422).json({
            error
        })
    }) 
}

module.exports = {
    create
}