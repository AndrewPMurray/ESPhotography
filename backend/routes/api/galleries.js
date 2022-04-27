const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

const { deleteSingleFile } = require('../../awsS3');
const { handleValidationErrors } = require('../../utils/validation');
const { Gallery, Image, Sequelize } = require('../../db/models');
const gallery = require('../../db/models/gallery');

const router = express.Router();

const validateGallery = [
	check('title')
		.notEmpty()
		.withMessage('Title is required')
		.custom((value) => {
			return Gallery.findOne({
				where: {
					title: {
						[Sequelize.Op.iLike]: value,
					},
				},
			}).then((res) => {
				if (res) {
					return Promise.reject('Title name already exists');
				}
			});
		}),
	handleValidationErrors,
];

const defaultGallerySort = async (_req, _res, next) => {
	const galleries = await Gallery.findAll({
		order: [['orderNumber', 'ASC']],
	});
	galleries.forEach(async (gallery, i) => {
		await gallery.update({
			orderNumber: i,
		});
	});
	return next();
};

const defaultImageSort = async (id) => {
	const images = await Image.findAll({
		where: {
			galleryId: id,
		},
		order: [['orderNumber', 'ASC']],
	});
	images.forEach(async (image, i) => {
		await image.update({ orderNumber: i });
	});
};

router.get('/', defaultGallerySort, async (req, res) => {
	const galleries = await Gallery.findAll({
		include: {
			model: Image,
			as: 'images',
			limit: 1,
		},
	});
	return res.json(galleries);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	await defaultImageSort(id);
	const gallery = await Gallery.findByPk(id, {
		include: {
			model: Image,
			as: 'images',
		},
		order: [[{ model: Image, as: 'images' }, 'orderNumber', 'ASC']],
	});
	return res.json(gallery);
});

router.post(
	'/',
	csrfProtection,
	validateGallery,
	asyncHandler(async (req, res) => {
		const { title, description, orderNumber } = req.body;
		const gallery = await Gallery.create({
			title,
			description,
			orderNumber,
		});

		return res.json(gallery);
	})
);

router.put(
	'/:id',
	csrfProtection,
	validateGallery,
	asyncHandler(async (req, res) => {
		const { id, title, description, orderNumber } = req.body;
		const gallery = await Gallery.findByPk(id);
		await gallery.update({
			title,
			description,
			orderNumber,
		});
		const updatedGallery = await Gallery.findByPk(id, {
			include: {
				model: Image,
				as: 'images',
			},
			order: [[{ model: Image, as: 'images' }, 'orderNumber', 'ASC']],
		});
		return res.json(updatedGallery);
	})
);

router.put(
	'/:id/order',
	csrfProtection,
	asyncHandler(async (req, res) => {
		const { id, title, description, orderNumber } = req.body;
		const gallery = await Gallery.findByPk(id);
		await gallery.update({
			title,
			description,
			orderNumber,
		});
		const updatedGallery = await Gallery.findByPk(id, {
			include: {
				model: Image,
				as: 'images',
			},
			order: [[{ model: Image, as: 'images' }, 'orderNumber', 'ASC']],
		});
		return res.json(updatedGallery);
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
			order: [[{ model: Image, as: 'images' }, 'orderNumber', 'ASC']],
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
			const urlParts = image.url.split('/');
			const key = urlParts[urlParts.length - 1];

			deleteSingleFile(key);

			await image.destroy();
		});

		await gallery.destroy();

		return res.json({ message: 'success' });
	})
);

module.exports = router;
