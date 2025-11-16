import type { JSX } from "react";

import type { ReactElement } from 'react';

const Logo = (): ReactElement => {
  return (
    <div className="site-logo">
      <span className="site-logo__icon">✶</span>
      <div className="site-logo__text">
        <span className="site-logo__brand">Comet Ring</span>
        <span className="site-logo__tagline">Stardust Atelier</span>
      </div>
    </div>
  );
};

export default Logo;



