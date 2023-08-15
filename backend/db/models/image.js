'use strict';
module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define(
		'Image',
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			url: DataTypes.STRING,
			galleryId: DataTypes.INTEGER,
			isHomepageImage: DataTypes.BOOLEAN,
			orderNumber: DataTypes.INTEGER,
			homepageOrderNumber: DataTypes.INTEGER,
		},
		{}
	);
	Image.associate = function (models) {
		Image.belongsTo(models.Gallery, { foreignKey: 'galleryId' });
	};
	return Image;
};
