import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'sequelize';

import { port } from './config';

import db from './db/models';

import { environment } from './config';
import routes from './routes';
import type { CustomError } from './utils/types';
const isProduction = environment === 'production';

dotenv.config();

const app = express();
// import router from './routes';

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// cors to be used only in development or testing
if (!isProduction) {
	app.use(cors());
}
// helmet set a variety of headers for improved security of the app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: 'cross-origin',
	})
);
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && 'lax',
			httpOnly: true,
		},
	})
);

app.use(routes);

// Catch unhandled requests for error handling
app.use((_req: Request, _res: Response, next: NextFunction) => {
	const err: CustomError = new Error('The requested resource could not be found.');
	err.title = 'Resource Not Found';
	err.errors = ['The requested resource could not be found.'];
	err.status = 404;
	next(err);
});

app.use((err: CustomError, _req: Request, _res: Response, next: NextFunction) => {
	// check if Sequelize error
	if (err instanceof ValidationError) {
		const valErr = {
			errors: err.errors.map((e) => e.message ?? e),
			title: 'Validation error',
		};
		return next(valErr);
	}
	next(err);
});

app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
	res.status(err.status || 500);
	console.error(err);
	return res.json({
		title: err.title || 'Server Error',
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

const start = async (): Promise<void> => {
	db.sequelize
		.authenticate()
		.then(() => {
			console.log('Database connection successful! Sequelize is now ready to use...');

			// start listening for connections
			app.listen(port, () => console.log(`Listening on port ${port}...`));
		})
		.catch((err) => {
			console.log('Database connection failure.');
			console.error(err);
		});
};

void start();
