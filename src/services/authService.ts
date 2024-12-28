import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '@/config';
import { IUser } from '@/models/User';
import { TokenPayload } from '@/types/auth';
export class AuthService {
	generateToken(payload: TokenPayload): string {
		return jwt.sign(payload, config.jwtSecret, {
			expiresIn: config.jwtExpirationTime,
		});
	}

	verifyToken(token: string): TokenPayload {
		return jwt.verify(token, config.jwtSecret) as TokenPayload;
	}

	extractTokenFromHeader(header: string | undefined): string | null {
		if (!header) return null;

		const [type, token] = header.split(' ');

		if (type.toLowerCase() !== 'bearer') return null;

		return token;
	}

	async validatePassword(user: IUser, password: string): Promise<boolean> {
		return compare(password, user.password);
	}

	async hashPassword(password: string): Promise<string> {
		return hash(password, 10);
	}
}
