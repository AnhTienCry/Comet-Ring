import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, type JSX } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../shared/Logo';

const Header = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isCheckout = useMemo(() => location.pathname.startsWith('/checkout'), [location.pathname]);
  const isAdmin = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
  };

  if (isAdmin) {
    return null; // Don't show header on admin pages
  }

  return (
    <header className={`site-header ${isCheckout ? 'site-header--compact' : ''}`}>
      <div className="container site-header__inner">
        <Logo />
        <nav className="site-nav">
          <NavLink to="/" end>
            Bộ sưu tập
          </NavLink>
          <NavLink to="/collections">Sản phẩm mới</NavLink>
          <NavLink to="/about">Về Comet Ring</NavLink>
          <NavLink to="/contact">Liên hệ</NavLink>
        </nav>
        <div className="site-actions">
          <button className="icon-button" aria-label="Search">
            <span className="material-symbols-outlined">search</span>
          </button>
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="icon-button" aria-label="Admin">
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                </NavLink>
              )}
              <div className="user-menu">
                <button className="icon-button" aria-label="Account">
                  <span className="material-symbols-outlined">person</span>
                </button>
                <div className="user-menu__dropdown">
                  <div className="user-menu__info">
                    <strong>{user?.name}</strong>
                    <span>{user?.email}</span>
                  </div>
                  <button onClick={handleLogout} className="user-menu__logout">
                    <span className="material-symbols-outlined">logout</span>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NavLink to="/login" className="icon-button" aria-label="Login">
              <span className="material-symbols-outlined">person</span>
            </NavLink>
          )}
          <NavLink to="/checkout" className="icon-button" aria-label="Cart">
            <span className="material-symbols-outlined">shopping_bag</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

