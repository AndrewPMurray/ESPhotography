const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

const { handleValidationErrors } = require('../../utils/validation');
const { Gallery, Image } = require('../../db/models');

const router = express.Router();

const validateGallery = [
	check('title').notEmpty().withMessage('Title is required'),
	handleValidationErrors,
];

router.get('/', async (req, res) => {
	const galleries = await Gallery.findAll({
		include: {
			model: Image,
			as: 'images',
		},
	});
	return res.json(galleries);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const gallery = await Gallery.findByPk(id, {
		include: {
			model: Image,
			as: 'images',
		},
	});
	return res.json(gallery);
});

router.post(
	'/',
	csrfProtection,
	validateGallery,
	asyncHandler(async (req, res) => {
		const { title, description } = req.body;
		const gallery = await Gallery.create({
			title,
			description,
		});

		return res.json(gallery);
	})
);

router.put(
	'/:id/key',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { url } = req.body;
		const { id } = req.params;
		const gallery = await Gallery.findByPk(id);
		await gallery.update({
			keyImageURL: url || null,
		});
		const updatedGallery = await Gallery.findByPk(id, {
			include: {
				model: Image,
				as: 'images',
			},
		});
		return res.json(updatedGallery);
	})
);

router.delete(
	'/:id',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const gallery = await Gallery.findByPk(id);
		const images = await Image.findAll({
			where: {
				galleryId: id,
			},
		});

		images.forEach(async (image) => {
			await image.destroy();
		});

		await gallery.destroy();

		return res.json({ message: 'success' });
	})
);

module.exports = router;
