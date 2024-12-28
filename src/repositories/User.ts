import { IUser, User } from '@/models/User';

export class UserRepo {
	async create(data: Partial<IUser>): Promise<IUser> {
		const user = new User(data);

		return user.save();
	}

	async findById(id: string): Promise<IUser | null> {
		return User.findById(id);
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return User.findOne({ email });
	}

	async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
		return User.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<boolean> {
		return !!User.findByIdAndDelete(id);
	}
}
