import mongoose from 'mongoose';

import { config } from '@/config';
import { logger } from '@/logging/Logger';

export const connection = async (): Promise<void> => {
	try {
		await mongoose.connect(config.mongodb.url);
		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.info('Error connecting to MongoDB', error);
		throw error;
	}
};
