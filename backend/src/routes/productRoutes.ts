import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { UPLOADS_DIR } from '../config/paths';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// ensure uploads path
const uploadsPath = UPLOADS_DIR;

// Setup multer storage to backend/uploads
const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: (err: Error | null, destination: string) => void) => {
    cb(null, uploadsPath);
  },
  filename: (_req: any, file: any, cb: (err: Error | null, filename: string) => void) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, unique);
  }
});

const upload = multer({ storage });

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Create product (multipart/form-data) with optional images[] files
// Protected routes (admin only)
router.post('/', authenticate, requireAdmin, upload.array('images', 8), createProduct);

// Update product by id (multipart/form-data) with optional images[] files
router.put('/:id', authenticate, requireAdmin, upload.array('images', 8), updateProduct);

// Delete product
router.delete('/:id', authenticate, requireAdmin, deleteProduct);

export default router;

