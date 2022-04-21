const router = require('express').Router();
const sessionRouter = require('./session.js');
const imagesRouter = require('./images.js');

router.use('/session', sessionRouter);
router.use('/images', imagesRouter);

module.exports = router;
