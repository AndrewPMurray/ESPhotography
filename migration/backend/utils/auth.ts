import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { User } from '../db/models';
import { NextFunction, Request, Response } from 'express';

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res: Response, user) => {
	const token = jwt.sign({ data: user.toSafeObject() }, secret, {
		expiresIn: parseInt(expiresIn),
	});

	const isProduction = process.env.NODE_ENV === 'production';

	res.cookie('token', token, {
		maxAge: parseInt(expiresIn) * 1000,
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction && 'lax',
	});

	return token;
};

const restoreUser = (req: Request & { user: typeof User }, res: Response, next: NextFunction) => {
	const { token } = req.cookies;

	return jwt.verify(token, secret, {}, async (err, jwtPayload) => {
		if (err) {
			return next();
		}

		if (!jwtPayload || typeof jwtPayload === 'string') return next();

		try {
			const { id } = jwtPayload.data;
			req.user = await User.scope('currentUser').findByPk(id);
		} catch (e) {
			res.clearCookie('token');
			return next();
		}

		if (!req.user) res.clearCookie('token');

		return next();
	});
};

const requireAuth = [
	restoreUser,
	function (req: Request & { user: typeof User }, _res: Response, next: NextFunction) {
		if (req.user) return next();

		const err: Error & Partial<{ title: string; errors: string[]; status: number }> = new Error(
			'Unauthorized'
		);
		err.title = 'Unauthorized';
		err.errors = ['Unauthorized'];
		err.status = 401;
		return next(err);
	},
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
