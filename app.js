var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var api = require('./routes/api')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api', api)

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.render('index', {
    title: 'MEAN Stack'
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(res.status(404).render('404', {title: 'Sorry, page not found'}))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

module.exports = app
