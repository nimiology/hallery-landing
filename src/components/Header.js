// src/components/Header.js
import React from "react";
import "./Header.css"; // Add any header-specific styles here

const Header = () => (
  <div className="left-content">
    <header>
      <h1>Hallery</h1>
      <h2>Where Creativity Connects</h2>
      <div className="download-buttons">
        <a href="https://apps.apple.com/us/app/hallery/id6689505680" target="_blank" rel="noopener noreferrer">
          <img src="../assets/App_Store_(iOS)-Badge-Logo.wine.svg" alt="Download on the App Store" className="download-badge" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=art.hallery.hallery" target="_blank" rel="noopener noreferrer">
          <img src="../assets/Google_Play-Badge-Logo.wine.svg" alt="Get it on Google Play" className="download-badge" />
        </a>
      </div>
    </header>
  </div>
);

export default Header;
