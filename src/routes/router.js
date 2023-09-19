const router = require('express').Router();

// Users routes
const userRouter = require('./users');
const steamRouter = require('./steamGames');

// Routes
router.use('/', userRouter);
router.use('/', steamRouter);

module.exports = router;