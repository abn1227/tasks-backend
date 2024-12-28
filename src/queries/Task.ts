import { TaskRepo } from '@/repositories/Task';

export class GetTaskQuery {
	constructor(public id: string) {}
}

export class ListTasksQuery {
	constructor(
		public userId: string,
		public readonly completed?: boolean,
	) {}
}

export class TaskQueryHandlers {
	private taskRepo: TaskRepo;

	constructor() {
		this.taskRepo = new TaskRepo();
	}

	async get(query: GetTaskQuery) {
		return this.taskRepo.findById(query.id);
	}

	async list(query: ListTasksQuery) {
		return this.taskRepo.list({
			userId: query.userId,
			completed: query.completed,
		});
	}
}
