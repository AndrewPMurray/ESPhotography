import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.get('/', (_req: Request, res: Response) => {
	res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
	console.log(`Server is live at http://localhost:${port}`);
});
