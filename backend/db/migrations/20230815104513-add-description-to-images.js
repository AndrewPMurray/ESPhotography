'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('Images', 'description', {
				type: Sequelize.TEXT,
			}),
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([queryInterface.removeColumn('Images', 'description')]);
	},
};
