const router = require('express').Router();

// Users routes
const userRouter = require('./users');
router.use('/', userRouter);

module.exports = router;