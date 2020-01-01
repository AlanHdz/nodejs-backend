const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const jwtMiddleware = require('express-jwt')

const places = require('./routes/places')
const users = require('./routes/users')
const sessions = require('./routes/sessions')
const favorites = require('./routes/favorites')
const visits = require('./routes/visits')
const visitPlaces = require('./routes/visitPlaces')
const applications = require('./routes/applications')

const findAppBySecret = require('./middlewares/findAppBySecret')
const findAppByApplicationId = require('./middlewares/findAppByApplicationId')
const authApp = require('./middlewares/authApp')()
const allowCORs = require('./middlewares/authCORs')()

const db = require('./config/database')
const secrets = require('./config/secrets')

db.connect()
const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(findAppBySecret)
app.use(findAppByApplicationId)
app.use(authApp.unless({ method: 'OPTIONS' }))
app.use(allowCORs.unless({ path: '/public' }))

app.use(jwtMiddleware({ secret: secrets.jwtSecret }).unless({ path: ['/sessions', '/users'], method: ['GET', 'OPTIONS'] }))

app.use('/places', places)
app.use('/users', users)
app.use('/sessions', sessions)
app.use('/favorites', favorites)
app.use('/visits', visits)
app.use('/places', visitPlaces)
app.use('/applications', applications)


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
    console.error(err)
    res.json(err);
});

module.exports = app;
