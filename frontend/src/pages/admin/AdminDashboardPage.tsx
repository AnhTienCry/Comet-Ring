import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import ProductForm from './ProductForm';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import type { DashboardOverview, Product } from '../../types/catalog';

const AdminDashboardPage = (): ReactElement => {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [recentOrders] = useState<
    Array<{ id: string; customer: string; date: string; total: number; status: string }>
  >([
    { id: '#CMT1205', customer: 'Lila Chen', date: '2024-07-20', total: 1250, status: 'Hoàn thành' },
    { id: '#CMT1204', customer: 'Marcus Reyes', date: '2024-07-19', total: 875.5, status: 'Đã gửi' },
    { id: '#CMT1203', customer: 'Anya Petrova', date: '2024-07-19', total: 2300, status: 'Đang xử lý' },
    { id: '#CMT1202', customer: 'Kenji Tanaka', date: '2024-07-18', total: 450, status: 'Đã hủy' }
  ]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchOverview = async (): Promise<void> => {
      try {
        const [overviewRes, productsRes] = await Promise.all([
          api.get<DashboardOverview>('/overview/dashboard'),
          api.get<Product[]>('/products', { params: { featured: true } })
        ]);
        setOverview(overviewRes.data);
        setFeaturedProducts(productsRes.data.slice(0, 3));
      } catch (error) {
        console.warn('Không thể tải dữ liệu dashboard, sử dụng dữ liệu dự phòng nếu có.', error);
      }
    };

    void fetchOverview();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-page">
      {showProductForm && <ProductForm onClose={() => setShowProductForm(false)} />}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <span className="material-symbols-outlined">diamond</span>
          <span>Comet Ring</span>
        </div>
        <div className="admin-sidebar__user">
          <div className="admin-sidebar__user-avatar">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="admin-sidebar__user-info">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
        <nav className="admin-sidebar__nav">
          <a className="is-active">
            <span className="material-symbols-outlined">dashboard</span>
            Tổng quan
          </a>
          <a onClick={() => setShowProductForm(true)}>
            <span className="material-symbols-outlined">inventory_2</span>
            Quản lý sản phẩm
          </a>
          <a>
            <span className="material-symbols-outlined">receipt_long</span>
            Quản lý đơn hàng
          </a>
          <a>
            <span className="material-symbols-outlined">group</span>
            Quản lý khách hàng
          </a>
          <a>
            <span className="material-symbols-outlined">settings</span>
            Cài đặt
          </a>
        </nav>
        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          Đăng xuất
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-content__header">
          <div>
            <h1>Tổng Quan Bảng Điều Khiển</h1>
            <p>Xem các số liệu chính và hoạt động gần đây của Comet Ring.</p>
          </div>
          <button className="primary-button" onClick={() => setShowProductForm(true)}>
            <span className="material-symbols-outlined">add</span>
            Thêm Sản Phẩm Mới
          </button>
        </header>

        <section className="admin-metrics">
          <article>
            <span>Tổng doanh thu</span>
            <strong>${overview?.stats.totalRevenue.toLocaleString() ?? '—'}</strong>
            <small>+{overview?.stats.revenueGrowth ?? 0}% so với tháng trước</small>
          </article>
          <article>
            <span>Đơn hàng mới</span>
            <strong>{overview?.stats.newOrders ?? '—'}</strong>
            <small>+{overview?.stats.ordersGrowth ?? 0}% so với tháng trước</small>
          </article>
          <article>
            <span>Khách hàng mới</span>
            <strong>{overview?.stats.newCustomers ?? '—'}</strong>
            <small>+{overview?.stats.customersGrowth ?? 0}% so với tháng trước</small>
          </article>
        </section>

        <section className="admin-chart card">
          <div className="admin-chart__header">
            <div>
              <h2>Thống Kê Doanh Thu</h2>
              <span>30 ngày qua · +{overview?.stats.revenueGrowth ?? 0}%</span>
            </div>
            <select>
              <option>Tháng này</option>
              <option>Quý này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="admin-chart__canvas">
            {(overview?.charts.revenue ?? []).map((value, index) => (
              <div className="admin-chart__bar" key={index}>
                <div style={{ height: `${value}%` }} />
                <span>Tuần {index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-lists">
          <div className="card admin-orders">
            <div className="admin-orders__header">
              <h2>Đơn Hàng Gần Đây</h2>
              <button className="ghost-button ghost-button--sm">Xem tất cả</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Khách hàng</th>
                  <th>Ngày</th>
                  <th>Tổng cộng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge status-${order.status.replace(/\s/g, '').toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card admin-products">
            <div className="admin-orders__header">
              <h2>Sản Phẩm Nổi Bật</h2>
            </div>
            <ul>
              {featuredProducts.map((product) => (
                <li key={product._id}>
                  <div className="admin-products__thumb" />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.currency ?? 'VND'}</span>
                  </div>
                  <span>{product.price.toLocaleString('vi-VN')}đ</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage;



