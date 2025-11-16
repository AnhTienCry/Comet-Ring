import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import type { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <footer className="site-footer">
      <div className="container site-footer__content">
        <div className="site-footer__brand">
          <Logo />
          <p>Khắc họa vũ trụ trong từng món trang sức. Comet Ring đồng hành cùng bạn trong mọi khoảnh khắc.</p>
        </div>
        <div className="site-footer__columns">
          <div>
            <h4>Cửa hàng</h4>
            <Link to="/collections">Sản phẩm mới</Link>
            <Link to="/collections">Nhẫn</Link>
            <Link to="/collections">Vòng cổ</Link>
            <Link to="/collections">Khuyên tai</Link>
          </div>
          <div>
            <h4>Về Chúng Tôi</h4>
            <Link to="/about">Câu chuyện</Link>
            <Link to="/about">Chế tác</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/terms">Điều khoản</Link>
          </div>
          <div>
            <h4>Theo dõi</h4>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Comet Ring. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


