const router = require('express').Router();
const userRoutes = require('./user-routes');
const qRoutes = require('./questions.js');

router.use('/users', userRoutes);

router.use('/get', qRoutes);

module.exports = router;
