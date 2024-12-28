import { Router } from 'express';
import { body } from 'express-validator';

import { AuthController } from '@/controller/Auth';

const router = Router();
const controller = new AuthController();

router.post(
	'/login',
	body('email').trim().isEmail(),
	body('password').trim().isLength({ min: 6 }),
	controller.login,
);

router.post(
	'/register',
	body('email').trim().isEmail(),
	body('password').trim().isLength({ min: 6 }),
	body('firstName').trim().isLength({ min: 2 }),
	body('lastName').trim().isLength({ min: 2 }),
	controller.register,
	controller.register,
);

export default router;
