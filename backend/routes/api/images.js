const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

const { deleteSingleFile, singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { Image } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
	const images = await Image.findAll();
	return res.json(images);
});

router.post(
	'/',
	singleMulterUpload('image'),
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { title, galleryId, isHomepageImage } = req.body;
		const imgUrl = await singlePublicFileUpload(req.file);
		const image = await Image.create({
			url: imgUrl,
			title,
			galleryId,
			isHomepageImage,
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
