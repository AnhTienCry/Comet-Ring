import { Schema, model, type Document, type Model } from 'mongoose';

export interface CollectionDocument extends Document {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  thumbnail: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<CollectionDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    thumbnail: { type: String, required: true },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export const Collection: Model<CollectionDocument> = model<CollectionDocument>(
  'Collection',
  collectionSchema
);

export default Collection;

