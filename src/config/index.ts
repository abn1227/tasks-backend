import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
	jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '24h',
	mongodb: {
		url: process.env.MONGODB_URL || 'mongodb://root:rootpassword@localhost:27017/tasks?authSource=admin',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
