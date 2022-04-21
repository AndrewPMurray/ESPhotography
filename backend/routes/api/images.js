const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { deleteSingleFile, singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { Image } = require('../../db/models');

const router = express.Router();

const validateImage = [
	check('credential')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a valid email or username'),
	check('password').exists({ checkFalsy: true }).withMessage('Please provide a password'),
	handleValidationErrors,
];

router.get('/', async (req, res) => {
	const images = await Image.findAll();
	return res.json(images);
});

router.post(
	'/',
	singleMulterUpload('image'),
	csrfProtection,
	asyncHandler(async (req, res) => {
		const imgUrl = await singlePublicFileUpload(req.file);
		const image = await Image.create({
			url: imgUrl,
		});

		return res.json(image);
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
