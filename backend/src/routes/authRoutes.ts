import { Router } from 'express';
import { register, login, verifyToken } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticate, verifyToken);

export default router;

