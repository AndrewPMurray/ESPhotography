import { Client } from 'minio';
import multer from 'multer';
import { s3Config } from './config';

const minioApiHost = 'minio.domainofaka.app';
const bucketName = 'esphotography';
const accessKey = s3Config.key;
const secretKey = s3Config.secret;

const s3 = new Client({
	endPoint: minioApiHost,
	useSSL: true,
	accessKey: accessKey,
	secretKey: secretKey,
});

export const isMinioOnline = () => {
	return s3.bucketExists(bucketName, (err, exists) => {
		if (err) {
			return console.log('Error connecting to bucket...', err);
		}
		if (exists) {
			return console.log('Success! S3 bucket is online!');
		} else return console.log('No bucket found');
	});
};

export const singlePublicFileUpload = async (file: Express.Multer.File) => {
	const { originalname, buffer } = file;
	const path = require('path');
	const Key = new Date().getTime().toString() + path.extname(originalname);
	try {
		await s3.putObject(bucketName, Key, buffer);
		return `https://${minioApiHost}/${bucketName}/${Key}`;
	} catch (e) {
		console.log(e);
	}
};

export const deleteSingleFile = (key: string) => {
	s3.removeObjects(bucketName, [key], (err) => {
		if (err) console.log('error deleting image', err);
		else console.log('success! Image deleted');
	});
};

const storage = multer.memoryStorage();

export const singleMulterUpload = (nameOfKey: string) =>
	multer({ storage: storage }).single(nameOfKey);
