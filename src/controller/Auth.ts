import { Request, Response } from 'express';

import { AuthCommandHandlers, LoginCommand, RegisterCommand } from '@/commands/Auth';
import { logger } from '@/logging/Logger';

export class AuthController {
	private authCommandHandlers: AuthCommandHandlers;

	constructor() {
		this.authCommandHandlers = new AuthCommandHandlers();
	}

	login = async (req: Request, res: Response) => {
		try {
			const command = new LoginCommand(req.body.email, req.body.password);
			const response = await this.authCommandHandlers.login(command);

			res.status(200).json(response);
		} catch (error) {
			logger.error('Error logging in:', error);

			if (error instanceof Error) {
				return res
					.status(error.message === 'User not found' ? 404 : 400)
					.json({ message: error.message });
			}

			res.status(500).json({ message: 'Internal server error' });
		}
	};

	register = async (req: Request, res: Response) => {
		try {
			const command = new RegisterCommand(
				req.body.email,
				req.body.password,
				req.body.firstName,
				req.body.lastName,
			);

			const response = await this.authCommandHandlers.register(command);

			res.status(200).json(response);
		} catch (error) {
			logger.error('Error registering user:', error);

			if (error instanceof Error) {
				return res
					.status(error.message === 'User already exists' ? 409 : 400)
					.json({ message: error.message });
			}

			res.status(500).json({ message: 'Internal server error' });
		}
	};
}
