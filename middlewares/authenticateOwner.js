module.exports = function (req, res, next) {
    if (req.mainObj && (req.mainObj._user == req.user.id)) return next()
    return next(new Error('You have no permissions to be here'))
}