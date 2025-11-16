import type { Request, Response } from 'express';
import Collection from '../models/Collection';
import Product from '../models/Product';

export const getCollections = async (_req: Request, res: Response): Promise<void> => {
  try {
    const collections = await Collection.find().sort({ featured: -1, createdAt: -1 });
    res.json(collections);
  } catch (error) {
    console.error('getCollections error', error);
    res.status(500).json({ message: 'Không thể lấy danh sách bộ sưu tập' });
  }
};

export const getCollectionBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const collection = await Collection.findOne({ slug });

    if (!collection) {
      res.status(404).json({ message: 'Không tìm thấy bộ sưu tập' });
      return;
    }

    const products = await Product.find({ collection: collection._id });

    res.json({
      collection,
      products
    });
  } catch (error) {
    console.error('getCollectionBySlug error', error);
    res.status(500).json({ message: 'Không thể lấy chi tiết bộ sưu tập' });
  }
};

