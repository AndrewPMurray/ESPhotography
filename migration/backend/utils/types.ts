export type CustomError = Error & {
	title?: string;
	errors?: (string | { message: string })[];
	status?: number;
};
