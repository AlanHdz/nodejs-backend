const { Schema, model } = require('mongoose')
const randomstring = require('randomstring')

function assignRandomAndUniqueValueToField(app, field, next) {
    const randomString = randomstring.generate(20)
    let searchCriteria = {}
    searchCriteria[field] = randomString
    Application.count(searchCriteria).then(count => {
        if (count > 0) return assignRandomAndUniqueValueToField(app, field, next)

        app[field] = randomString
        next()
    })
}

let applicationSchema = new Schema({
    applicationId: {
        type: String,
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true,
        unique: true
    },
    origins: {
        type: String
    },
    name: {
        type: String
    }
})

applicationSchema.pre('validate', function (next) {
    assignRandomAndUniqueValueToField(this, 'applicationId', () => {
        assignRandomAndUniqueValueToField(this, 'secret', next)
    })
})

const Application = model('Application', applicationSchema)

module.exports = Application