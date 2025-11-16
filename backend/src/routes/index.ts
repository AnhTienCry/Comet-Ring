import { Router } from 'express';
import productRoutes from './productRoutes';
import collectionRoutes from './collectionRoutes';
import overviewRoutes from './overviewRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/collections', collectionRoutes);
router.use('/overview', overviewRoutes);

export default router;

