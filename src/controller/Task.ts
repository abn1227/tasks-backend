import { Request, Response } from 'express';

import {
	CreateTaskCommand,
	DeleteTaskCommand,
	TaskCommandHandlers,
	UpdateTaskCommand,
} from '@/commands/Task';
import { logger } from '@/logging/Logger';
import { GetTaskQuery, ListTasksQuery, TaskQueryHandlers } from '@/queries/Task';

export class TaskController {
	private commandHandlers: TaskCommandHandlers;
	private queryHandlers: TaskQueryHandlers;

	constructor() {
		this.commandHandlers = new TaskCommandHandlers();
	}

	create = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const command = new CreateTaskCommand({
				title: req.body.title,
				description: req.body.description,
				userId: req.user.id,
			});

			const task = await this.commandHandlers.create(command);

			return res.status(201).json(task);
		} catch (error) {
			logger.error('Error creating task', error);

			if (error instanceof Error) return res.status(400).json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	update = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const command = new UpdateTaskCommand(req.params.id, {
				title: req.body.title,
				description: req.body.description,
				completed: req.body.completed,
			});

			const task = await this.commandHandlers.update(command);

			return res.status(201).json(task);
		} catch (error) {
			logger.error('Error creating task', error);

			if (error instanceof Error)
				return res
					.status(error.message === 'Task not found' ? 404 : 400)
					.json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	delete = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const command = new DeleteTaskCommand(req.params.id);

			await this.commandHandlers.delete(command);

			return res.status(200).json({ message: 'Task deleted successfully' });
		} catch (error) {
			logger.error('Error deleting task', error);

			if (error instanceof Error)
				return res
					.status(error.message === 'Task not found' ? 404 : 400)
					.json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	list = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const query = new ListTasksQuery(req.user.id, req.query.completed === 'true');

			const tasks = await this.queryHandlers.list(query);

			return res.status(200).json(tasks);
		} catch (error) {
			logger.error('Error listing tasks', error);

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	getTaskById = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const query = new GetTaskQuery(req.params.id);

			const task = await this.queryHandlers.get(query);

			return res.status(200).json(task);
		} catch (error) {
			logger.error('Error getting task by id', error);

			return res.status(500).json({ message: 'Internal server error' });
		}
	};
}
