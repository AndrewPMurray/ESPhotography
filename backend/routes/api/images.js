const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

const { deleteSingleFile, singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { Image } = require('../../db/models');

const router = express.Router();

const validateImage = [
	check('title').notEmpty().withMessage('Title is required'),
	handleValidationErrors,
];

router.get('/', async (req, res) => {
	const images = await Image.findAll();
	return res.json(images);
});

router.get('/home', async (req, res) => {
	const images = await Image.findAll({
		where: {
			isHomepageImage: true,
		},
		order: [['homepageOrderNumber', 'ASC']],
	});
	return res.json(images);
});

router.post(
	'/',
	singleMulterUpload('image'),
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { title, galleryId, isHomepageImage, orderNumber } = req.body;
		const imgUrl = await singlePublicFileUpload(req.file);
		const image = await Image.create({
			url: imgUrl,
			title,
			galleryId,
			isHomepageImage,
			orderNumber,
			homepageOrderNumber: null,
		});

		return res.json(image);
	})
);

router.put(
	'/:id',
	csrfProtection,
	validateImage,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { title, isHomepageImage, orderNumber, homepageOrderNumber } = req.body;
		const image = await Image.findByPk(id);
		const editedImage = await image.update({
			title,
			isHomepageImage,
			orderNumber,
			homepageOrderNumber,
		});

		return res.json(editedImage);
	})
);

router.delete(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const image = await Image.findByPk(id);
		const urlParts = image.url.split('/');
		const key = urlParts[urlParts.length - 1];

		deleteSingleFile(key);

		await image.destroy();

		return res.json({ message: 'success' });
	})
);

module.exports = router;
