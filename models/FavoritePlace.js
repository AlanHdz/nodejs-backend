const { Schema, model  } = require('mongoose')

let favoriteSchema = new Schema({
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    }
})

const FavoritePlace = model('FavoritePlace', favoriteSchema)


module.exports = FavoritePlace