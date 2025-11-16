import type { Request, Response } from 'express';
import Product from '../models/Product';
import Collection from '../models/Collection';

export const getDashboardOverview = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [totalProducts, featuredProducts, totalCollections] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ featured: true }),
      Collection.countDocuments()
    ]);

    const stats = {
      totalRevenue: 55890,
      revenueGrowth: 12.5,
      newOrders: 125,
      ordersGrowth: 8.2,
      newCustomers: 42,
      customersGrowth: 5.1
    };

    const weeklyRevenue = [4800, 6200, 5800, 7600, 8400, 8900, 9700];

    res.json({
      stats,
      counts: {
        totalProducts,
        totalCollections,
        featuredProducts
      },
      charts: {
        revenue: weeklyRevenue
      }
    });
  } catch (error) {
    console.error('getDashboardOverview error', error);
    res.status(500).json({ message: 'Không thể lấy dữ liệu tổng quan' });
  }
};

