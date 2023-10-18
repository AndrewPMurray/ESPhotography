import { Sequelize } from 'sequelize';
import { developmentConfig, productionConfig } from '../../config/database.js';

const env = process.env.NODE_ENV || 'development';

const sequelizeConnection =
	env === 'production'
		? new Sequelize(process.env[productionConfig.use_env_variable] ?? '', productionConfig)
		: new Sequelize(
				developmentConfig.database,
				developmentConfig.username,
				developmentConfig.password,
				developmentConfig
		  );

export default sequelizeConnection;
