import React from 'react';
import './Header.css';

const Header = ({ onToggleDarkMode, isDarkMode, onShowFavorites, showFavorites }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">Book Finder</h1>
        <nav className="nav">
          <button
            className={`nav-button ${!showFavorites ? 'active' : ''}`}
            onClick={() => onShowFavorites(false)}
          >
            Home
          </button>
          <button
            className={`nav-button ${showFavorites ? 'active' : ''}`}
            onClick={() => onShowFavorites(true)}
          >
            Favorites
          </button>
          <button className="theme-toggle" onClick={onToggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
