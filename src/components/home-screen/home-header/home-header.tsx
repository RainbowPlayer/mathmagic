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

  function detectApple() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
  }
  function detectAndroid() {
    return /(android)/i.test(navigator.userAgent)
  }
  function detectWindows() {
    return /(Win)/i.test(navigator.userAgent)
  }

  function Download() {
    if (detectApple()) {
        window.open('https://apps.apple.com/app/apple-store/id6467421035?pt=126580370&ct=mmlanding&mt=8')
    } else if (detectAndroid()) {
        window.open('https://play.google.com/store/apps/details?id=com.Bristar.MathMagic&referrer=utm_source%3Dmmlanding')
    } else if (detectWindows()) {
        document.location = 'https://ugs3experiment.bristar.studio/builds/mathmagic.exe'
    } else {
        let siteRef = 'https://bristar.studio/en/games/heroes-of-math-and-magic'
        window.open(siteRef + '?utm_source=mmlanding')
    }
  }

  return (
    <div className="home-header" style={{ backgroundImage: `url(${bgImage})` }}>
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
          <button className="home-header-button" onClick={() => Download()}>
            Download <ArrowIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
