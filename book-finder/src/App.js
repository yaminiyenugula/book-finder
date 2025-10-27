import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('bookFinderFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('bookFinderTheme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('bookFinderFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('bookFinderTheme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('bookFinderTheme', 'light');
    }
  };

  // Search books using Google Books API
  const searchBooks = async (query) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (book) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === book.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  // View book details
  const viewBookDetails = (book) => {
    setSelectedBook(book);
  };

  // Close book details modal
  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        onShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />

      <main className="main-content">
        {!showFavorites && (
          <>
            <SearchBar onSearch={searchBooks} isLoading={isLoading} />
            <BookList
              books={books}
              onViewDetails={viewBookDetails}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
              isLoading={isLoading}
              error={error}
            />
          </>
        )}

        {showFavorites && (
          <Favorites
            favorites={favorites}
            onViewDetails={viewBookDetails}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Book Finder. Built with React.</p>
      </footer>

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={closeBookDetails}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.some(fav => fav.id === selectedBook.id)}
        />
      )}
    </div>
  );
}

export default App;
