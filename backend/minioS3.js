const Minio = require('minio');
const multer = require('multer');
const { s3Config } = require('./config');

const minioApiHost = 'minio.domainofaka.app';
const bucketName = 'esphotography';
const accessKey = s3Config.key;
const secretKey = s3Config.secret;

const s3 = new Minio.Client({
	endPoint: minioApiHost,
	useSSL: true,
	accessKey,
	secretKey,
});

const isMinioOnline = () => {
	return s3.bucketExists(bucketName, (err, exists) => {
		if (err) {
			return console.log('Error connecting to bucket...', err);
		}
		if (exists) {
			return console.log('Success! S3 bucket is online!');
		} else return console.log('No bucket found');
	});
};

const singlePublicFileUpload = async (file) => {
	const { originalname, buffer } = await file;
	const path = require('path');
	const Key = new Date().getTime().toString() + path.extname(originalname);
	try {
		await s3.putObject(bucketName, Key, buffer);
		return `https://${minioApiHost}/${bucketName}/${Key}`;
	} catch (e) {
		console.log(e);
	}
};

const deleteSingleFile = (key) => {
	s3.removeObject(bucketName, key, (err) => {
		if (err) console.log('error deleting image', err);
		else console.log('success! Image deleted');
	});
};

const storage = multer.memoryStorage({
	destination: function (req, file, callback) {
		callback(null, '');
	},
});

const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);

module.exports = {
	s3,
	isMinioOnline,
	singlePublicFileUpload,
	singleMulterUpload,
	deleteSingleFile,
};
