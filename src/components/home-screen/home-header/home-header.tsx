import React, { useEffect, useState } from 'react';
import { mainBg, mainBgMobile } from '../../../assets/images';
import { ArrowIcon } from '../../../assets/icons';
import './styles.css';

const HomeHeader = () => {
  const [bgImage, setBgImage] = useState(mainBg);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBgImage(mainBgMobile);
        setIsMobile(true);
      } else {
        setBgImage(mainBg);
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="home-header" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="home-header-content">
        {isMobile ? <span> +19725561596</span> : <span>Phone: +19725561596</span>}
        {isMobile ? <span>admin@bristar.studio</span> : <span>Email: admin@bristar.studio</span>}
        {!isMobile && (
          <button className="home-header-button">
            Download <ArrowIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
