'use strict';
module.exports = (sequelize, DataTypes) => {
	const Gallery = sequelize.define(
		'Gallery',
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			keyImageURL: DataTypes.STRING,
		},
		{}
	);
	Gallery.associate = function (models) {
		Gallery.hasMany(models.Image, { as: 'images', foreignKey: 'galleryId' });
	};
	return Gallery;
};
