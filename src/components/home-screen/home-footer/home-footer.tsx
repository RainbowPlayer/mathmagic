import React from 'react';
import './styles.css';
import {
  JavaScriptIcon,
  AppleIcon,
  MacIcon,
  AndroidIcon,
  WindowsIcon,
} from '../../../assets/icons';

const HomeFooter = () => {
  return (
    <div className="home-footer-container">
      <div className="home-footer-left">
        <h2 className="home-footer-title">
          We bring math to life - making it simple, fun, and truly educational!
        </h2>

        <div className="home-footer-icons-row">
          <div className="home-footer-icon-block">
            <JavaScriptIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">Web</span>
          </div>

          <div className="home-footer-icon-block">
            <AppleIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">iOS</span>
          </div>

          <div className="home-footer-icon-block">
            <MacIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">macOS</span>
          </div>

          <div className="home-footer-icon-block">
            <AndroidIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">Android</span>
          </div>

          <div className="home-footer-icon-block">
            <WindowsIcon className="home-footer-icon" />
            <span className="home-footer-icon-label">Windows</span>
          </div>
        </div>
      </div>

      <div className="home-footer-right">
        <input
          type="text"
          placeholder="Name"
          className="home-footer-input"
        />
        <input
          type="email"
          placeholder="Email"
          className="home-footer-input"
        />
        <input
          type="text"
          placeholder="Phone"
          className="home-footer-input"
        />

        <button className="home-footer-button">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default HomeFooter;
