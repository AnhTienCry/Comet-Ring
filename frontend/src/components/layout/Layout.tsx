import Header from './Header';
import Footer from './Footer';
import type { JSX, PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className="app-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

