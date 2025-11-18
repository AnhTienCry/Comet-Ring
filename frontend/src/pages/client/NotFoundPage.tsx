import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';

const NotFoundPage = (): ReactElement => {
  return (
    <div className="page not-found-page">
      <div className="container not-found-page__content">
        <span className="not-found-page__code">404</span>
        <h1>Không tìm thấy trang</h1>
        <p>Có vẻ như bạn đã lạc vào khoảng không vũ trụ. Hãy quay lại để tiếp tục hành trình cùng Comet Ring.</p>
        <Link to="/" className="primary-button">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

