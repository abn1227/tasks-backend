import { CreateTaskDto, UpdateTaskDto } from '@/dtos/Task';
import { ITask } from '@/models/Task';
import { TaskRepo } from '@/repositories/Task';

export class CreateTaskCommand {
	constructor(public data: CreateTaskDto) {}
}

export class UpdateTaskCommand {
	constructor(
		public id: string,
		public data: UpdateTaskDto,
	) {}
}

export class DeleteTaskCommand {
	constructor(public id: string) {}
}

export class TaskCommandHandlers {
	private taskRepo: TaskRepo;

	constructor() {
		this.taskRepo = new TaskRepo();
	}

	async create(command: CreateTaskCommand): Promise<ITask> {
		return this.taskRepo.create(command.data);
	}

	async update(command: UpdateTaskCommand): Promise<ITask> {
		const { title, description, completed } = command.data;
		const task = await this.taskRepo.findById(command.id);

		if (!task) throw new Error('Task not found');

		if (title) task.title = title;
		if (description) task.description = description;
		if (completed !== undefined) task.completed = completed;

		this.taskRepo.update(command.id, task);

		return task;
	}

	async delete(command: DeleteTaskCommand): Promise<boolean> {
		const { id } = command;

		const task = await this.taskRepo.findById(id);

		if (!task) throw new Error('Task not found');

		return this.taskRepo.delete(command.id);
	}
}
