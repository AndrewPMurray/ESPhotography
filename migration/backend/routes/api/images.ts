import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { check } from 'express-validator';
import csurf from 'csurf';
import { handleValidationErrors } from '../../utils/validation';

import { deleteSingleFile, singlePublicFileUpload, singleMulterUpload } from '../../minioS3';
import { Image } from '../../db/models';

const csrfProtection = csurf({ cookie: true });

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
	asyncHandler(async (req: Request, res: Response) => {
		const { title, description, galleryId, isHomepageImage, orderNumber, homepageOrderNumber } =
			req.body;
		const imgUrl = await singlePublicFileUpload(req.file);
		if (imgUrl) {
			const image = await Image.create({
				url: imgUrl,
				title,
				description,
				galleryId,
				isHomepageImage,
				orderNumber,
				homepageOrderNumber,
			});

			return res.json(image);
		}
		return res.status(500).json({ error: 'file upload failed' });
	})
);

router.put(
	'/:id',
	csrfProtection,
	validateImage,
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { title, description, isHomepageImage, orderNumber } = req.body;
		const image = await Image.findByPk(id);
		const editedImage = await image.update({
			title,
			description,
			isHomepageImage,
			orderNumber,
		});

		return res.json(editedImage);
	})
);

router.delete(
	'/:id',
	csrfProtection,
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const image = await Image.findByPk(id);
		const urlParts = image.url.split('/');
		const key = urlParts[urlParts.length - 1];

		deleteSingleFile(key);

		await image.destroy();

		return res.json({ message: 'success' });
	})
);

export default router;
