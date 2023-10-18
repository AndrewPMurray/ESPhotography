import type { dbType, jwtConfigType, seederType, s3ConfigType } from './types';

export const environment: string = process.env.NODE_ENV ?? 'development';

export const port: string = process.env.PORT ?? '5000';

export const db: dbType = {
	username: process.env.DB_USERNAME ?? 'DEFAULT_DB_USERNAME',
	password: process.env.DB_PASSWORD ?? 'DEFAULT_DB_PASSWORD',
	database: process.env.DB_DATABASE ?? 'DEFAULT_DB_DATABASE',
	host: process.env.DB_HOST ?? 'DEFAULT_DB_HOST',
};

export const jwtConfig: jwtConfigType = {
	secret: process.env.JWT_SECRET ?? 'NO_JWT_SECRET_IN_ENV',
	expiresIn: process.env.JWT_EXPIRES_IN ?? '16400',
};

export const seeder: seederType = {
	username: process.env.SEEDER_USERNAME ?? 'DEFAULT_USERNAME',
	password: process.env.SEEDER_PASSWORD ?? 'DEFAULT_PASSWORD',
	email: process.env.SEEDER_EMAIL ?? 'DEFAULT_EMAIL',
};

export const s3Config: s3ConfigType = {
	key: process.env.MINIO_KEY ?? 'NO_MINIO_KEY_IN_ENV',
	secret: process.env.MINIO_SECRET ?? 'NO_MINIO_SECRET_IN_ENV',
};
