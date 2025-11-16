import { useMemo, type JSX } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/catalog';

// No mock products by default. Keep an empty cart until user adds items.
const fallbackCart: Array<Product & { quantity: number }> = [];

const CheckoutPage = (): JSX.Element => {
  const cartItems = useMemo(() => fallbackCart, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout-page page">
      <div className="container checkout-layout">
        <div className="checkout-form">
          <div className="checkout-header">
            <h1>Thanh toán</h1>
            <span>
              Đã có tài khoản? <Link to="/account">Đăng nhập</Link>
            </span>
          </div>
          <form className="checkout-form__grid">
            <section>
              <h2>Thông tin giao hàng</h2>
              <div className="form-grid">
                <label>
                  Email
                  <input type="email" placeholder="Địa chỉ email" required />
                </label>
                <label>
                  Họ
                  <input type="text" placeholder="Nhập họ của bạn" required />
                </label>
                <label>
                  Tên
                  <input type="text" placeholder="Nhập tên của bạn" required />
                </label>
                <label className="form-grid--full">
                  Địa chỉ
                  <input type="text" placeholder="Số nhà, tên đường" required />
                </label>
                <label className="form-grid--full">
                  Thành phố
                  <input type="text" placeholder="Thành phố / Tỉnh" required />
                </label>
              </div>
            </section>

            <section>
              <h2>Thông tin thanh toán</h2>
              <div className="payment-method">
                <label className="payment-method__option is-active">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Thẻ tín dụng</span>
                  <div className="payment-method__icons">
                    <span className="material-symbols-outlined">credit_card</span>
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </label>
              </div>
              <div className="form-grid">
                <label className="form-grid--full">
                  Số thẻ
                  <input type="text" placeholder="•••• •••• •••• ••••" required />
                </label>
                <label>
                  Ngày hết hạn
                  <input type="text" placeholder="MM / YY" required />
                </label>
                <label>
                  CVC
                  <input type="text" placeholder="•••" required />
                </label>
              </div>
            </section>

            <div className="checkout-actions">
              <Link to="/collections" className="ghost-button ghost-button--sm">
                Quay lại
              </Link>
              <button type="submit" className="primary-button">
                Hoàn tất thanh toán
              </button>
            </div>
          </form>
        </div>

        <aside className="checkout-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <ul className="checkout-summary__items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="checkout-summary__image" />
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.currency ?? 'VND'}</span>
                </div>
                <strong>{item.price.toLocaleString('vi-VN')}đ</strong>
              </li>
            ))}
          </ul>
          <div className="checkout-summary__coupon">
            <input type="text" placeholder="Mã giảm giá" />
            <button type="button" className="ghost-button ghost-button--sm">
              Áp dụng
            </button>
          </div>
          <dl className="checkout-summary__totals">
            <div>
              <dt>Tạm tính</dt>
              <dd>{subtotal.toLocaleString('vi-VN')}đ</dd>
            </div>
            <div>
              <dt>Phí vận chuyển</dt>
              <dd>Miễn phí</dd>
            </div>
            <div className="checkout-summary__grand">
              <dt>Tổng cộng</dt>
              <dd>{subtotal.toLocaleString('vi-VN')}đ</dd>
            </div>
          </dl>
          <div className="checkout-summary__security">
            <span className="material-symbols-outlined">lock</span>
            <p>Thanh toán an toàn 100%</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;



