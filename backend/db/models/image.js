'use strict';
module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define(
		'Image',
		{
			title: DataTypes.STRING,
			url: DataTypes.STRING,
			galleryId: DataTypes.INTEGER,
			isHomepageImage: DataTypes.BOOLEAN,
		},
		{}
	);
	Image.associate = function (models) {
		Image.belongsTo(models.Gallery, { foreignKey: 'galleryId' });
	};
	return Image;
};
