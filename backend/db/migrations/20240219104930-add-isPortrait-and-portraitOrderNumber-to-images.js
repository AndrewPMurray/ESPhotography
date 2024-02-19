'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('Images', 'isPortrait', {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			}),
			queryInterface.addColumn('Images', 'portraitOrderNumber', {
				type: Sequelize.INTEGER,
				allowNull: true,
			}),
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('Images', 'isPortrait'),
			queryInterface.removeColumn('Images', 'portraitOrderNumber'),
		]);
	},
};
