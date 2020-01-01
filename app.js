const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const jwtMiddleware = require('express-jwt')

const places = require('./routes/places')
const users = require('./routes/users')
const sessions = require('./routes/sessions')
const favorites = require('./routes/favorites')

const db = require('./config/database')
const secrets = require('./config/secrets')

db.connect()
const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwtMiddleware({ secret: secrets.jwtSecret }).unless({ path: ['/sessions', '/users'], method: 'GET' }))

app.use('/places', places)
app.use('/users', users)
app.use('/sessions', sessions)
app.use('/favorites', favorites)


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
