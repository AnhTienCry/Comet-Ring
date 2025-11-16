export interface SeedCollection {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  thumbnail: string;
  tags?: string[];
  featured?: boolean;
}

export interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency?: string;
  collectionSlug: string;
  category: string;
  materials?: string[];
  images?: string[];
  details?: Record<string, string | number>;
  featured?: boolean;
}

/**
 * Thêm dữ liệu thật vào hai mảng dưới đây trước khi chạy script `npm run seed`.
 * - Đảm bảo `collectionSlug` của sản phẩm khớp với `slug` của bộ sưu tập tương ứng.
 * - Bạn có thể chuyển đổi các giá trị mặc định theo nhu cầu thực tế.
 */
export const seedCollections: SeedCollection[] = [];

export const seedProducts: SeedProduct[] = [];

