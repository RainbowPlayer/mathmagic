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
    <div
      className="home-header"
      style={{
        position: 'relative',
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="home-header-content">
        {isMobile ? (
          <>
            <span>
              <a
                style={{ color: 'white', textDecoration: 'none' }}
                href="tel:+19725561596"
              >
                +19725561596
              </a>
            </span>
            <span>
              <a
                style={{ color: 'white', textDecoration: 'none' }}
                href="mailto:admin@bristar.studio"
              >
                admin@bristar.studio
              </a>
            </span>
          </>
        ) : (
          <>
            <span>
              Phone:{' '}
              <a
                style={{ color: 'white', textDecoration: 'none' }}
                href="tel:+19725561596"
              >
                +19725561596
              </a>
            </span>
            <span>
              Email:{' '}
              <a
                style={{ color: 'white', textDecoration: 'none' }}
                href="mailto:admin@bristar.studio"
              >
                admin@bristar.studio
              </a>
            </span>
          </>
        )}

        {!isMobile && (
          <button className="home-header-button">
            Download <ArrowIcon />
          </button>
        )}
      </div>

      {isMobile && (
        <button
          className="home-header-button"
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Download <ArrowIcon />
        </button>
      )}
    </div>
  );
};

export default HomeHeader;
