import { ITask, Task } from '@/models/Task';

export class TaskRepo {
	async create(data: Partial<ITask>): Promise<ITask> {
		const task = new Task(data);

		return task.save();
	}

	async findById(id: string): Promise<ITask | null> {
		return Task.findById(id);
	}

	async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
		return Task.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<boolean> {
		return !!Task.findByIdAndDelete(id);
	}

	async list(filters: Partial<ITask>): Promise<ITask[]> {
		const filterBy: {
			userId?: string;
			completed?: boolean;
		} = {};

		if (filters.userId) filterBy.userId = filters.userId;
		if (filters.completed !== undefined) filterBy.completed = filters.completed;

		return Task.find(filterBy);
	}
}
