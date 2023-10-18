'use strict';
const bcrypt = require('bcryptjs');
const config = require('../../config');
const { email, username, password } = config.seeder;

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					email,
					username,
					hashedPassword: bcrypt.hashSync(password),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: [username] },
			},
			{}
		);
	},
};
