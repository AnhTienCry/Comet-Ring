import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { UPLOADS_DIR } from '../config/paths';
import Product from '../models/Product';
import Collection from '../models/Collection';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, collection } = req.query;
    const filters: Record<string, unknown> = {};

    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }

    if (collection) {
      filters.collection = collection;
    }

    const products = await Product.find(filters).populate('collection', 'name slug thumbnail');
    res.json(products);
  } catch (error) {
    console.error('getProducts error', error);
    res.status(500).json({ message: 'Không thể lấy danh sách sản phẩm' });
  }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate('collection');

    if (!product) {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('getProductBySlug error', error);
    res.status(500).json({ message: 'Không thể lấy chi tiết sản phẩm' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fields are sent as multipart/form-data
    const body = req.body as Record<string, any>;

    const collectionSlug = body.collection as string || body.collectionSlug;
    if (!collectionSlug) {
      res.status(400).json({ message: 'collection is required' });
      return;
    }

    const collection = await Collection.findOne({ slug: collectionSlug });
    if (!collection) {
      res.status(400).json({ message: `Collection not found: ${collectionSlug}` });
      return;
    }

    const images: string[] = [];
  const files = (req as any).files as any[] | undefined;
    if (files && files.length > 0) {
      const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
      for (const f of files) {
        // Build public URL to the uploaded file
        const filename = path.basename(f.path || f.filename);
        const url = `${baseUrl}/uploads/${filename}`;
        images.push(url);
      }
    }

    const materials = body.materials ? (typeof body.materials === 'string' ? JSON.parse(body.materials) : body.materials) : [];
    const details = body.details ? (typeof body.details === 'string' ? JSON.parse(body.details) : body.details) : {};

    const productData = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: Number(body.price || 0),
      currency: body.currency || 'VND',
      collection: collection._id,
      category: body.category || 'other',
      materials,
      images,
      details,
      featured: body.featured === 'true' || body.featured === true
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('createProduct error', error);
    res.status(500).json({ message: 'Không thể tạo sản phẩm' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await Product.findById(id);
    if (!existing) {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      return;
    }

    const body = req.body as Record<string, any>;

    // handle new uploaded files
  const files = (req as any).files as any[] | undefined;
    if (files && files.length > 0) {
      const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
      for (const f of files) {
        const filename = path.basename(f.path || f.filename);
        const url = `${baseUrl}/uploads/${filename}`;
        existing.images.push(url);
      }
    }

    if (body.name) existing.name = body.name;
    if (body.slug) existing.slug = body.slug;
    if (body.description) existing.description = body.description;
    if (body.price) existing.price = Number(body.price);
    if (body.currency) existing.currency = body.currency;
    if (body.category) existing.category = body.category;
    if (body.materials) existing.materials = typeof body.materials === 'string' ? JSON.parse(body.materials) : body.materials;
    if (body.details) existing.details = typeof body.details === 'string' ? JSON.parse(body.details) : body.details;
    if (body.featured !== undefined) existing.featured = body.featured === 'true' || body.featured === true;

    await existing.save();
    res.json(existing);
  } catch (error) {
    console.error('updateProduct error', error);
    res.status(500).json({ message: 'Không thể cập nhật sản phẩm' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      return;
    }

    // delete local image files that are stored under /uploads
    for (const img of product.images || []) {
      try {
        const url = new URL(img);
        const filename = path.basename(url.pathname);
        const filePath = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        // ignore non-url images or errors
      }
    }

    await product.deleteOne();
    res.json({ message: 'Sản phẩm đã bị xóa' });
  } catch (error) {
    console.error('deleteProduct error', error);
    res.status(500).json({ message: 'Không thể xóa sản phẩm' });
  }
};

