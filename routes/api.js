var express = require('express')
var router = express.Router()

const apiService = require('./api.service')

// Error handling
const sendError = (err, res) => {
  res.message = typeof err === 'object' ? err.message : err
  res.status(err.status).json(res)
}

// users route for getting all users
router.get('/users', (req, res, next) => {
  apiService.getAll().then((user) => {
    res.send(user)
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// user route for getting user information based on id passed
router.get('/user/:id', (req, res, next) => {
  apiService.getById(req.params.id).then((user) => {
    res.send(user)
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// create route for creating one user based on the userinformation passed through req.body
router.post('/create', (req, res, next) => {
  apiService.create(req.body).then(() => {
    res.status(201).send('Created an item')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// update route for updating one user information based on id
router.put('/update/:id', (req, res, next) => {
  apiService.update(req.params.id, req.body).then(() => {
    res.status(204).send('Item updated')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// delete route for deleting one user based on id
router.delete('/delete/:id', (req, res, next) => {
  apiService.delete(req.params.id).then(() => {
    res.status(204).send('Item deleted')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

module.exports = router
