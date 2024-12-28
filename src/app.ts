import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { config } from './config';
import { connection } from './config/database';
import { logger } from './logging/Logger';
import authRoutes from './routes/authRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const bootstrap = async () => {
	try {
		await connection();

		app.use('/api/auth', authRoutes);

		app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
	} catch (error) {
		logger.error('Unable to initialize server:', error);
	}
};

bootstrap();
