const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
const routes = require('./routes');

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
app.use((_req, _res, next) => {
	const err = new Error('The requested resource could not be found.');
	err.title = 'Resource Not Found';
	err.errors = ['The requested resource could not be found.'];
	err.status = 404;
	next(err);
});

app.use((err, _req, _res, next) => {
	// check if Sequelize error
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = 'Validation error';
	}
	next(err);
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	return res.json({
		title: err.title || 'Server Error',
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = app;
