import env from '../config/env';
import connectToDatabase from '../config/db';
import Collection from '../models/Collection';
import Product from '../models/Product';
import { seedCollections, seedProducts } from './sample-data';

const run = async (): Promise<void> => {
  try {
    await connectToDatabase();

    if (seedCollections.length === 0 && seedProducts.length === 0) {
      console.log('Không có dữ liệu seed. Hãy thêm dữ liệu thật vào `src/data/sample-data.ts`.');
      return;
    }

    await Collection.deleteMany({});
    await Product.deleteMany({});

    const createdCollections = await Collection.insertMany(
      seedCollections.map((collection) => ({
        ...collection,
        featured: collection.featured ?? false,
        tags: collection.tags ?? []
      }))
    );

    const collectionMap = new Map(createdCollections.map((collection) => [collection.slug, collection._id]));

    const preparedProducts = seedProducts.map((product) => {
      const collectionId = collectionMap.get(product.collectionSlug);

      if (!collectionId) {
        throw new Error(`Không tìm thấy bộ sưu tập với slug: ${product.collectionSlug}`);
      }

      const { collectionSlug, ...rest } = product;

      return {
        ...rest,
        collection: collectionId,
        currency: rest.currency ?? 'VND',
        materials: rest.materials ?? [],
        images: rest.images ?? [],
        details: rest.details ?? {},
        featured: rest.featured ?? false,
        price: Number(rest.price)
      };
    });

    if (preparedProducts.length > 0) {
      await Product.insertMany(preparedProducts);
    }

    console.log('🌌 Seeded Comet Ring database successfully');
  } catch (error) {
    console.error('Failed to seed database', error);
    process.exitCode = 1;
  } finally {
    await Collection.db.close();
  }
};

void run().then(() => {
  console.log(`Environment: ${env.nodeEnv}`);
});

