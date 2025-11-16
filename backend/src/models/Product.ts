import { Schema, model, type Document, type Model, Types } from 'mongoose';

export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  collection: Types.ObjectId;
  category: string;
  materials: string[];
  images: string[];
  details: Record<string, string | number>;
  featured: boolean;
}

export type ProductDocument = Document<unknown, {}, Product> & Product & {
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'VND' },
    collection: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
    category: { type: String, required: true },
    materials: { type: [String], default: [] },
    images: { type: [String], default: [] },
    details: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {}
    },
    featured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export const Product: Model<Product> = model<Product>('Product', productSchema);

export default Product;

