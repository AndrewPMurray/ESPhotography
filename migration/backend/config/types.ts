export type dbType = {
	username: string;
	password: string;
	database: string;
	host: string;
};

export type jwtConfigType = {
	secret: string;
	expiresIn: string;
};

export type seederType = {
	username: string;
	password: string;
	email: string;
};

export type s3ConfigType = {
	key: string;
	secret: string;
};
