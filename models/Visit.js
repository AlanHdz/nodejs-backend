const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const REACTIONS = ['like', 'love', 'disappointment', 'yummy', 'anger', 'disgust']

let visitSchema = new Schema({
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    observation: String,
    reaction: {
        type: String,
        enum: REACTIONS
    }
})

visitSchema.statics.forUser = function(userId, page) {
    return Visit.paginate({ '_user': userId}, { page: page, limit: 5, sort: { '_id': -1 } } )
}

visitSchema.plugin(mongoosePaginate)

const Visit = model('Visit', visitSchema)

module.exports = Visit