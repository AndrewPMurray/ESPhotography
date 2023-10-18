import { SequelizeMethod } from 'sequelize/types/utils';
import { db } from './index';
import { Dialect } from 'sequelize';

const { username, password, database, host } = db;

type DevConfiguration = {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: Dialect;
	seederStorage: string;
};

type ProductionConfiguration = {
	use_env_variable: string;
	dialect: Dialect;
	seederStorage: string;
	dialectOptions: {
		ssl: {
			require: boolean;
			rejectUnauthorized: boolean;
		};
	};
};

export const developmentConfig: DevConfiguration = {
	username,
	password,
	database,
	host,
	dialect: 'postgres',
	seederStorage: 'sequelize',
};

export const productionConfig: ProductionConfiguration = {
	use_env_variable: 'DATABASE_URL',
	dialect: 'postgres',
	seederStorage: 'sequelize',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
};
