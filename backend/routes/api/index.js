const router = require('express').Router();
const sessionRouter = require('./session.js');
const imagesRouter = require('./images.js');
const galleriesRouter = require('./galleries.js');

router.use('/session', sessionRouter);
router.use('/images', imagesRouter);
router.use('/galleries', galleriesRouter);

module.exports = router;
