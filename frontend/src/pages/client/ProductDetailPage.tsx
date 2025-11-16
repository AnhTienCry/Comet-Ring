import { useEffect, useMemo, useState, type JSX } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../../types/catalog';
import { fetchProductBySlug, fetchProducts } from '../../services/api';

const ProductDetailPage = (): JSX.Element => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      if (!slug) return;
      try {
        setLoading(true);
        const [productData, productsData] = await Promise.all([
          fetchProductBySlug(slug),
          fetchProducts({ featured: true })
        ]);

        const normalizedProduct = productData as Product;
        const normalizedRelated = (productsData as Product[]).filter((item) => item.slug !== slug).slice(0, 4);

        setProduct(normalizedProduct);
        setSelectedMaterial(normalizedProduct.materials?.[0] ?? '');
        setRelatedProducts(normalizedRelated);
      } catch (error) {
        console.warn('Không thể tải chi tiết sản phẩm từ API.', error);
        // If API fails, keep product as null and relatedProducts empty.
        setProduct(null);
        setSelectedMaterial('');
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [slug]);

  const detailEntries = useMemo(() => {
    if (!product?.details) return [];
    return Object.entries(product.details);
  }, [product]);

  if (!product && !loading) {
    return (
      <div className="page">
        <div className="container">
          <p>Không tìm thấy sản phẩm.</p>
          <Link to="/collections" className="primary-button">
            Quay lại bộ sưu tập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail__gallery">
            <div
              className="product-detail__main-image"
              style={{ backgroundImage: `url(${product?.images?.[0] ?? ''})` }}
            />
            <div className="product-detail__thumbnails">
              {(product?.images ?? (Array.from({ length: 4 }) as (string | undefined)[])).map((image: string | undefined, index: number) => (
                <div className="product-detail__thumb" key={image ?? index}>
                  <div
                    className="product-detail__thumb-inner"
                    style={{ backgroundImage: `url(${image ?? ''})` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-detail__info">
            <div>
              <Link to="/collections" className="ghost-button ghost-button--sm">
                Bộ sưu tập: {typeof product?.collection === 'string' ? product.collection : product?.collection?.name}
              </Link>
              <h1>{product?.name ?? 'Đang tải...'}</h1>
              <p>{product?.description ?? 'Thông tin sản phẩm đang được cập nhật.'}</p>
            </div>
            <div className="product-detail__options">
              <div className="product-detail__price">
                {product ? product.price.toLocaleString('vi-VN') : '—'} {product?.currency ?? 'VND'}
              </div>
              <div className="product-detail__materials">
                <span>Chất liệu</span>
                  <div className="product-detail__material-options">
                  {(product?.materials ?? []).map((material: string) => (
                    <button
                      key={material}
                      type="button"
                      className={material === selectedMaterial ? 'is-active' : ''}
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
              <div className="product-detail__size">
                <span>Kích cỡ</span>
                <select>
                  <option>Chọn kích cỡ</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
              <div className="product-detail__actions">
                <button className="primary-button">Thêm vào giỏ hàng</button>
                <button className="ghost-button">Mua ngay</button>
              </div>
            </div>
            <div className="product-detail__specs">
              <h3>Thông tin chi tiết</h3>
                <dl>
                {detailEntries.map(([label, value]: [string, string | number]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <section className="product-detail__related">
          <div className="section-heading-group">
            <h2 className="section-heading">Gợi ý phối hợp</h2>
            <p className="section-subtitle">
              Hoàn thiện phong cách của bạn với những thiết kế được lựa chọn đặc biệt để tỏa sáng cùng nhau.
            </p>
          </div>
            <div className="products-grid">
            {(loading ? (Array.from({ length: 4 }) as (Product | undefined)[]) : relatedProducts).map((item: Product | undefined, index: number) => (
              <article className="product-card" key={item?._id ?? index}>
                <div className="product-card__image" />
                <div className="product-card__content">
                  <h3>{item?.name ?? 'Đang tải...'}</h3>
                  <span className="product-card__price">
                    {item ? item.price.toLocaleString('vi-VN') : '—'} {item?.currency ?? 'VND'}
                  </span>
                  <Link to={`/product/${item?.slug ?? ''}`} className="ghost-button ghost-button--sm">
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;

