'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			// 	queryInterface.addColumn('Galleries', 'orderNumber', {
			// 		type: Sequelize.INTEGER,
			// 		allowNull: false,
			// 		defaultValue: 0,
			// 	}),
			// 	queryInterface.addColumn('Images', 'orderNumber', {
			// 		type: Sequelize.INTEGER,
			// 		allowNull: false,
			// 		defaultValue: 0,
			// 	}),
			// 	queryInterface.addColumn('Images', 'homepageOrderNumber', {
			// 		type: Sequelize.INTEGER,
			// 		allowNull: true,
			// 	}),
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			// 	queryInterface.removeColumn('Galleries', 'orderNumber'),
			// 	queryInterface.removeColumn('Images', 'orderNumber'),
			// 	queryInterface.removeColumn('homepageOrderNumber', 'orderNumber'),
		]);
	},
};
