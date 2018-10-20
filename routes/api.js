var express = require('express')
var router = express.Router()

const apiService = require('./api.service')

// Error handling
const sendError = (err, res) => {
  res.message = typeof err === 'object' ? err.message : err
  res.status(err.status).json(res)
}

// users route for getting all users
router.get('/users', async (req, res, next) => {
  const users = await apiService.getAll();
  res.send(users)
})

// user route for getting user information based on id passed
router.get('/user/:id', async (req, res, next) => {
  const user = await apiService.getById(req.params.id);
  res.send(user);
})

// create route for creating one user based on the userinformation passed through req.body
router.post('/create', async (req, res, next) => {
  await apiService.create(req.body);
  res.status(201).send('Created an item');
})

// update route for updating one user information based on id
router.put('/update/:id', async (req, res, next) => {
  await apiService.update(req.params.id, req.body);
  res.status(204).send('Item updated');
})

// delete route for deleting one user based on id
router.delete('/delete/:id', async (req, res, next) => {
  await apiService.delete(req.params.id);
  res.status(204).send('Item deleted');
})

module.exports = router