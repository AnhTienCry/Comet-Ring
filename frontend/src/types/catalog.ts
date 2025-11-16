export interface Collection {
  _id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  thumbnail: string;
  tags: string[];
  featured: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  collection: Collection | string;
  category: string;
  materials: string[];
  images: string[];
  details: Record<string, string | number>;
  featured: boolean;
}

export interface CollectionWithProducts {
  collection: Collection;
  products: Product[];
}

export interface DashboardOverview {
  stats: {
    totalRevenue: number;
    revenueGrowth: number;
    newOrders: number;
    ordersGrowth: number;
    newCustomers: number;
    customersGrowth: number;
  };
  counts: {
    totalProducts: number;
    totalCollections: number;
    featuredProducts: number;
  };
  charts: {
    revenue: number[];
  };
}

