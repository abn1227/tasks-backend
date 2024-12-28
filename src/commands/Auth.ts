import { UserRepo } from '@/repositories/User';
import { AuthService } from '@/services/authService';
import { AuthResponse } from '@/types/auth';

export class LoginCommand {
	constructor(
		public email: string,
		public password: string,
	) {}
}
export class RegisterCommand {
	constructor(
		public email: string,
		public password: string,
		public firstName: string,
		public lastName: string,
	) {}
}

export class AuthCommandHandlers {
	private userRepo: UserRepo;
	private authService: AuthService;

	constructor() {
		this.userRepo = new UserRepo();
		this.authService = new AuthService();
	}

	async login(command: LoginCommand): Promise<AuthResponse> {
		const user = await this.userRepo.findByEmail(command.email);

		if (!user) throw new Error('User not found');

		const isValidPassword = await this.authService.validatePassword(user, command.password);

		if (!isValidPassword) throw new Error('Invalid password');

		const token = this.authService.generateToken({
			userId: user.id,
			email: user.email,
		});

		return {
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			token,
		};
	}

	async register(command: RegisterCommand): Promise<AuthResponse> {
		const existingUser = await this.userRepo.findByEmail(command.email);

		if (existingUser) throw new Error('User already exists');

		const hashedPassword = await this.authService.hashPassword(command.password);

		const user = await this.userRepo.create({
			email: command.email,
			password: hashedPassword,
			firstName: command.firstName,
			lastName: command.lastName,
		});

		const token = this.authService.generateToken({
			userId: user.id,
			email: user.email,
		});

		return {
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			token,
		};
	}
}
