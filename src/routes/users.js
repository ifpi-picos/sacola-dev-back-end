const router = require('express').Router();

const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get a user by id
router.get('/users/:id', userController.getUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Update a user by id
router.put('/users/:id', userController.updateUser);

// Delete a user by id
router.delete('/users/:id', userController.deleteUser);

module.exports = router;