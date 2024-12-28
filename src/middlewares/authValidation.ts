import { Request, Response, NextFunction } from 'express';

import { logger } from '@/logging/Logger';
import { UserRepo } from '@/repositories/User';
import { AuthService } from '@/services/authService';

export class AuthValidation {
	private authService: AuthService;
	private userRepo: UserRepo;

	constructor() {
		this.authService = new AuthService();
		this.userRepo = new UserRepo();
	}

	authenticate = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token = this.authService.extractTokenFromHeader(req.headers.authorization);

			if (!token) return res.status(401).json({ message: 'No token provided' });

			const payload = this.authService.verifyToken(token);
			const user = await this.userRepo.findById(payload.userId);

			if (!user) return res.status(401).json({ message: 'User not found' });

			req.user = { id: user.id, email: user.email };

			next();
		} catch (error) {
			logger.error('Error authenticating user', error);

			return res.status(401).json({ message: 'Invalid token' });
		}
	};
}

declare module 'express-serve-static-core' {
	interface Request {
		user?: {
			id: string;
			email: string;
		};
	}
}
