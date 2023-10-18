import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';

import { validationResult } from 'express-validator';

export const handleValidationErrors = function (req: Request, _res: Response, next: NextFunction) {
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		const errorMessages: Record<ValidationError['param'], string> = {};

		errors
			.array({ onlyFirstError: true })
			.forEach((e: ValidationError) => (errorMessages[e.param] = e.msg));

		return next({ title: 'Bad request', status: 400, errors: errorMessages });
	}
	return next();
};
