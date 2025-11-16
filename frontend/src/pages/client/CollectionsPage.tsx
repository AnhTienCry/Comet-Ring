import { useEffect, useMemo, useState, type ChangeEvent, type JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import type { Collection, Product } from '../../types/catalog';
import { mockCollections, mockProducts } from '../../data/mockData';
import { fetchCollections, fetchProducts } from '../../services/api';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Rings', value: 'ring' },
  { label: 'Necklaces', value: 'necklace' },
  { label: 'Earrings', value: 'earring' },
  { label: 'Bracelets', value: 'bracelet' }
];

const CollectionsPage = (): JSX.Element => {
  const { slug } = useParams();
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const [collectionsData, productsData] = await Promise.all([fetchCollections(), fetchProducts()]);

        setCollections(collectionsData as Collection[]);
        setProducts(productsData as Product[]);
      } catch (error) {
        console.warn('Không thể tải dữ liệu bộ sưu tập, sử dụng dữ liệu dự phòng nếu có.', error);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  useEffect(() => {
    if (!slug) return;
    const collection = collections.find((item) => item.slug === slug);
    if (collection) {
      setActiveFilter('all');
    }
  }, [slug, collections]);

  const filteredProducts = useMemo(() => {
    let items = products;
    if (slug) {
      items = items.filter((product) => {
        if (typeof product.collection === 'string') return product.collection === slug;
        return product.collection.slug === slug;
      });
    }
    if (activeFilter !== 'all') {
      items = items.filter((product) => product.category === activeFilter);
    }
    return items;
  }, [products, slug, activeFilter]);

  return (
    <div className="collections-page">
      <section className="collections-hero">
        <div className="container collections-hero__content">
          <div className="collections-hero__text">
            <span className="pill">The Comet Universe</span>
            <h1>Khám Phá Bộ Sưu Tập</h1>
            <p>
              Vẻ đẹp của những vì sao được lưu giữ trong từng thiết kế. Chọn bộ sưu tập yêu thích của bạn và để Comet
              Ring đồng hành trong những khoảnh khắc rực rỡ nhất.
            </p>
          </div>
          <div className="collections-hero__stats">
            <div>
              <span>Tổng Bộ Sưu Tập</span>
              <strong>{collections.length}</strong>
            </div>
            <div>
              <span>Sản Phẩm</span>
              <strong>{products.length}</strong>
            </div>
            <div>
              <span>Sản Phẩm Nổi Bật</span>
              <strong>{products.filter((item) => item.featured).length}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="page collections-content">
        <div className="container">
          <div className="collections-filter">
            <div className="collections-filter__tabs">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`collections-filter__tab ${activeFilter === option.value ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <select
              className="collections-sort"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const value = event.target.value;
                if (value === 'newest') {
                  setProducts((prev) => [...prev].sort((a, b) => (a._id > b._id ? -1 : 1)));
                } else if (value === 'price-desc') {
                  setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
                } else if (value === 'price-asc') {
                  setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
                }
              }}
            >
              <option value="newest">Sắp xếp: Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>

          <div className="collections-grid">
            {(loading ? (Array.from({ length: 6 }) as (Product | undefined)[]) : filteredProducts).map((product: Product | undefined, index: number) => (
              <article className="collection-product-card" key={product?._id ?? index}>
                <div
                  className="collection-product-card__image"
                  style={{ backgroundImage: `url(${product?.images?.[0] ?? ''})` }}
                />
                <div className="collection-product-card__body">
                  <h3>{product?.name ?? 'Đang tải...'}</h3>
                  <p>{product?.description ?? 'Thông tin sản phẩm sẽ hiển thị tại đây.'}</p>
                  <div className="collection-product-card__meta">
                    <span>
                      {product ? product.price.toLocaleString('vi-VN') : '—'} {product?.currency ?? 'VND'}
                    </span>
                    <Link to={`/product/${product?.slug ?? ''}`}>Xem bộ sưu tập</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="collections-pagination">
            <button disabled>‹</button>
            <button className="is-active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;

