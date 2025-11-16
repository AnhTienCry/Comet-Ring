import { Router } from 'express';
import { getDashboardOverview } from '../controllers/overviewController';

const router = Router();

router.get('/dashboard', getDashboardOverview);

export default router;

