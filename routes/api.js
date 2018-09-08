var express = require('express')
var router = express.Router()

const apiService = require('./api.service')

// Error handling
const sendError = (err, res) => {
  res.message = typeof err === 'object' ? err.message : err
  res.status(err.status).json(res)
}

// users route for getting all users
router.get('/sales', (req, res, next) => {
  apiService.getAll().then((record) => {
    res.send(record)
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// user route for getting sales information based on id passed
router.get('/sales/:id', (req, res, next) => {
  apiService.getById(req.params.id).then((record) => {
    res.send(record)
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// user route for getting bankcontract information based on id passed
router.get('/bankcontract/:id', (req, res, next) => {
    apiService.getByBankId(req.params.id).then((record) => {
      res.send(record)
    })
    .catch((err) => {
      sendError(err, res)
    })
})

// create route for creating one sale based on the information passed through req.body
router.post('/createsc', (req, res, next) => {
  apiService.create(req.body).then(() => {
    res.status(201).send('Created an item')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// create route for creating one bank record based on the information passed through req.body
router.post('/createbankcontract', (req, res, next) => {
  apiService.createBankContract(req.body).then(() => {
    res.status(201).send('Created an item')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// create route for creating bill record based on the information passed through req.body
router.post('/createbilloflading', (req, res, next) => {
  apiService.createbilloflading(req.body).then(() => {
    res.status(201).send('Created an item')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// create route for creating bill record based on the information passed through req.body
router.post('/initiatebilling', (req, res, next) => {
  apiService.initiatebilling(req.body).then(() => {
    res.status(201).send('Created an item')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// update route for updating one sale information based on id
router.put('/update/:id', (req, res, next) => {
  apiService.update(req.params.id, req.body).then(() => {
    res.status(204).send('Item updated')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

// delete route for deleting one sale based on id
router.delete('/delete/:id', (req, res, next) => {
  apiService.delete(req.params.id).then(() => {
    res.status(204).send('Item deleted')
  })
    .catch((err) => {
      sendError(err, res)
    })
})

module.exports = router
