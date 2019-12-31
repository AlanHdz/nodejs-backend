const User = require('../models/User')
const buildParams = require('./helpers')

const validParams = ['email', 'name', 'password']

function create(req, res) {
    let params = buildParams(validParams, req.body)
    User.create(params).then(user => {
        res.json(user)
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