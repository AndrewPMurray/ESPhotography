import express from 'express';
import sessionRouter from './session.js';
import imagesRouter from './images.js';
import galleriesRouter from './galleries.js';

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/images', imagesRouter);
router.use('/galleries', galleriesRouter);

export default router;
