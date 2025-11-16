import { useEffect, useState, type JSX } from 'react';
import { Link } from 'react-router-dom';
import type { Collection, Product } from '../../types/catalog';
import { fetchCollections, fetchProducts } from '../../services/api';

const HomePage = (): JSX.Element => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const [collectionsData, productsData] = await Promise.all([
          fetchCollections(),
          fetchProducts({ featured: true })
        ]);

        setCollections(collectionsData as Collection[]);
        setProducts(productsData as Product[]);
      } catch (error) {
        console.warn('Không thể tải dữ liệu trang chủ, sử dụng dữ liệu dự phòng nếu có.', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-background" />
        <div className="container hero-content">
          <div className="hero-text">
            <span className="pill">Bộ sưu tập mới</span>
            <h1>Stardust Collection</h1>
            <p>
              Khám phá những thiết kế tinh xảo lấy cảm hứng từ vẻ đẹp huyền bí của vũ trụ. Mỗi món trang sức là một
              câu chuyện về ánh sáng và niềm đam mê bất tận.
            </p>
            <div className="hero-actions">
              <Link to="/collections" className="primary-button">
                Khám phá ngay
              </Link>
              <Link to="/about" className="ghost-button">
                Câu chuyện thương hiệu
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card__image" />
            <div className="hero-card__info">
              <div>
                <span className="badge">Giới hạn</span>
              </div>
              <h3>Nhẫn Comet Tinh Xảo</h3>
              <p>Chiếc nhẫn tái hiện khoảnh khắc sao băng vụt sáng trên nền trời đêm.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page featured-section">
        <div className="container">
          <h2 className="section-heading">Bộ Sưu Tập Nổi Bật</h2>
          <p className="section-subtitle">
            Mỗi bộ sưu tập là một câu chuyện, một hành trình đến những vì sao. Lắng nghe tiếng thì thầm của vũ trụ
            qua những thiết kế tinh xảo.
          </p>
          <div className="collection-grid">
            {(loading ? (Array.from({ length: 3 }) as (Collection | undefined)[]) : collections.slice(0, 3)).map((collection: Collection | undefined, index: number) => (
              <article className="collection-card" key={collection?._id ?? index}>
                <div className="collection-card__image" />
                <div className="collection-card__body">
                  <h3>{collection?.name ?? 'Đang tải...'}</h3>
                  <p>{collection?.description ?? 'Đang tải dữ liệu...'}</p>
                  <Link to={`/collections/${collection?.slug ?? ''}`}>Khám phá</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page bestseller-section">
        <div className="container">
          <div className="section-heading-group">
            <h2 className="section-heading">Kiệt Tác Bán Chạy</h2>
            <p className="section-subtitle">
              Những thiết kế được yêu thích nhất, mang trong mình vẻ đẹp vượt thời gian và sự tinh tế trong từng
              đường nét.
            </p>
          </div>
          <div className="products-grid">
            {(loading ? (Array.from({ length: 4 }) as (Product | undefined)[]) : products.slice(0, 4)).map((product: Product | undefined, index: number) => (
              <article className="product-card" key={product?._id ?? index}>
                <div className="product-card__image" />
                <div className="product-card__content">
                  <h3>{product?.name ?? 'Đang tải...'}</h3>
                  <span className="product-card__price">
                    {product ? product.price.toLocaleString('vi-VN') : ''} {product?.currency ?? 'VND'}
                  </span>
                  <Link to={`/product/${product?.slug ?? ''}`} className="ghost-button ghost-button--sm">
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-story page">
        <div className="container brand-story__grid">
          <div className="brand-story__text">
            <span className="pill">Câu chuyện thương hiệu</span>
            <h2>Comet Ring: Nơi nghệ thuật gặp vũ trụ</h2>
            <p>
              Lấy cảm hứng từ vũ trụ, mỗi thiết kế của Comet Ring là một vì sao lấp lánh. Chúng tôi tin rằng trang sức
              không chỉ là một món phụ kiện, mà là một lời hứa, một kỷ niệm, một biểu tượng của những khoảnh khắc quý
              giá nhất trong cuộc đời.
            </p>
            <Link to="/about" className="primary-button">
              Khám phá câu chuyện
            </Link>
          </div>
          <div className="brand-story__image" />
        </div>
      </section>

      <section className="newsletter-section page">
        <div className="container newsletter-card">
          <div>
            <h2>Đăng Ký Nhận Tin</h2>
            <p>Nhận thông tin độc quyền về các bộ sưu tập mới và ưu đãi đặc biệt từ Comet Ring.</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Địa chỉ email của bạn" />
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

