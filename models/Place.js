const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uploader = require('./Uploader')
const slugify = require('../plugins/slugify')

let placeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    address: String,
    description: String,
    acceptsCreditsCard: {
        type: Boolean,
        default: false
    },
    coverImage: {
        type: String
    },
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

placeSchema.methods.updateImage = function (path, imageType) {
    return uploader(path).then((secure_url) => this.saveImageUrl(secure_url, imageType))
}

placeSchema.methods.saveImageUrl = function (secure_url, imageType) {
    this[imageType+'Image'] = secure_url
    return this.save()
}

placeSchema.pre('save', function(next) {
    if (this.slug) return next()
    generateSlugAndContinue.call(this,0, next)
})

placeSchema.statics.validatesSlugCount = function (slug) {
    return Place.count({ slug: slug }).then(count => {
        if (count > 0) return false
        return true
    })
} 

placeSchema.plugin(mongoosePaginate)

function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title)
    if(count != 0)
        this.slug = this.slug + "-"+count
    Place.validatesSlugCount(this.slug).then(isValid => {
        if (!isValid)
            return generateSlugAndContinue.call(this,count+1, next)
        next()
    })
}

let Place = model('Place', placeSchema)

module.exports = Place