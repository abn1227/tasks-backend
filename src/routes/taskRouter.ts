import { Router } from 'express';
import { body, query } from 'express-validator';

import { TaskController } from '@/controller/Task';
import { AuthValidation } from '@/middlewares/authValidation';

const router = Router();
const controller = new TaskController();
const authValidation = new AuthValidation();

router.post(
	'/',
	authValidation.authenticate,
	body('title').trim().isLength({ min: 2 }),
	body('description').trim().isLength({ min: 2 }),
	controller.create,
);

router.put(
	'/:id',
	authValidation.authenticate,
	body('title').trim().optional().isLength({ min: 2 }),
	body('description').optional().trim().isLength({ min: 2 }),
	body('completed').optional().isBoolean(),
	controller.update,
);

router.delete('/:id', authValidation.authenticate, controller.delete);

router.get('/', authValidation.authenticate, query('completed').optional().isBoolean(), controller.list);

router.get('/:id', authValidation.authenticate, controller.getTaskById);

export default router;
