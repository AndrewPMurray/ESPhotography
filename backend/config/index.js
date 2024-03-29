module.exports = {
	environment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	db: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
	},
	jwtConfig: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
	seeder: {
		username: process.env.SEEDER_USERNAME,
		password: process.env.SEEDER_PASSWORD,
		email: process.env.SEEDER_EMAIL,
	},
	s3Config: {
		key: process.env.MINIO_KEY,
		secret: process.env.MINIO_SECRET,
	},
};
